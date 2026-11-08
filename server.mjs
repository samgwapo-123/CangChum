import { createServer } from 'node:http';
import { spawn, spawnSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { extname, relative, resolve, sep } from 'node:path';
import { randomUUID } from 'node:crypto';

const ROOT = process.cwd();
const PORT = Number(process.env.PORT || 4173);
const RUNNER_IMAGE = process.env.CANGJIE_RUNNER_IMAGE || '';
const MAX_CODE_LENGTH = 50_000;
const MAX_INPUT_LENGTH = 50_000;
const MAX_REQUEST_BYTES = 100_000;
const MAX_OUTPUT_BYTES = 256_000;
const RUN_TIMEOUT_MS = 8_000;
const MAX_CASES = 10;
const MAX_CONCURRENT_RUNS = 2;
let curriculum;
let activeRuns = 0;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8'
};
const publicFiles = new Set([
  'index.html', 'src/app.js', 'src/output-diff.js', 'src/styles.css', 'data/curriculum.json',
  'assets/system.css', 'assets/system.js', 'assets/ui/cards.css', 'assets/ui/base.css', 'assets/ui/ui.js',
  'assets/motion/motion.css', 'assets/motion/motion.js', 'assets/backgrounds/backgrounds.css', 'assets/backgrounds/backgrounds.js',
  'assets/layout/layout.css', 'assets/layout/layout.js', 'assets/icons/icon.css'
]);

function runVersion(command, args, timeout = 2500) {
  const result = spawnSync(command, args, { encoding: 'utf8', windowsHide: true, timeout });
  if (result.error || result.status !== 0) return null;
  return `${result.stdout || ''}${result.stderr || ''}`.trim().split('\n')[0] || null;
}

function runnerHealth() {
  const dockerVersion = runVersion('docker', ['--version']);
  if (!dockerVersion) return { runnerAvailable: false, compilerInstalled: false, compilerVersion: null, message: 'Docker is not available. Code stays saved; no program has been executed.' };
  if (!RUNNER_IMAGE) return { runnerAvailable: false, compilerInstalled: false, compilerVersion: null, message: 'No isolated runner image is configured. Set CANGJIE_RUNNER_IMAGE to a local image containing the Cangjie compiler and runtime.' };
  const daemon = spawnSync('docker', ['info', '--format', '{{.ServerVersion}}'], { encoding: 'utf8', windowsHide: true, timeout: 3000 });
  if (daemon.error || daemon.status !== 0) return { runnerAvailable: false, compilerInstalled: false, compilerVersion: null, message: 'Docker is installed, but its container service is not running.' };
  const image = spawnSync('docker', ['image', 'inspect', '--format', '{{.Id}}', RUNNER_IMAGE], { encoding: 'utf8', windowsHide: true, timeout: 3000 });
  if (image.error || image.status !== 0) return { runnerAvailable: false, compilerInstalled: false, compilerVersion: null, message: `The configured runner image “${RUNNER_IMAGE}” is not available locally. Build or load it before running code.` };
  const compilerProbe = [
    'run', '--rm', '--network=none', '--read-only', '--cpus=1', '--memory=512m', '--pids-limit=32',
    '--user=65534:65534', '--cap-drop=ALL', '--security-opt=no-new-privileges',
    '--tmpfs=/tmp:rw,nosuid,nodev,noexec,size=16m', RUNNER_IMAGE, 'cjc', '--version'
  ];
  // Docker Desktop's Resource Saver can put the Linux VM to sleep when idle.
  // The first container start then wakes the VM, which can exceed the normal
  // probe budget, so retry once with a cold-start allowance before reporting
  // the compiler as missing.
  let compilerVersion = runVersion('docker', compilerProbe, 8_000);
  if (!compilerVersion) compilerVersion = runVersion('docker', compilerProbe, 25_000);
  if (!compilerVersion) return { runnerAvailable: false, compilerInstalled: false, compilerVersion: null, message: `The Cangjie compiler is not accessible in the configured runner image “${RUNNER_IMAGE}”. If Docker Desktop was idle, it may still be waking up; try again in a moment.` };
  return { runnerAvailable: true, compilerInstalled: true, compilerVersion, runnerImage: RUNNER_IMAGE, message: '' };
}

function sendJson(response, statusCode, value) {
  const body = JSON.stringify(value);
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  });
  response.end(body);
}

async function readJson(request) {
  let size = 0;
  const chunks = [];
  for await (const chunk of request) {
    size += chunk.length;
    if (size > MAX_REQUEST_BYTES) throw Object.assign(new Error('Request is too large.'), { statusCode: 413 });
    chunks.push(chunk);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); }
  catch { throw Object.assign(new Error('Request body must be valid JSON.'), { statusCode: 400 }); }
}

function compareOutput(actual, expected) {
  return String(actual).replace(/\r\n/g, '\n').replace(/\n+$/, '') === String(expected).replace(/\r\n/g, '\n').replace(/\n+$/, '');
}

function killContainer(id) {
  if (!id) return;
  const child = spawn('docker', ['kill', id], { stdio: 'ignore', windowsHide: true });
  const timeout = setTimeout(() => child.kill(), 2000);
  child.on('close', () => clearTimeout(timeout));
  child.on('error', () => clearTimeout(timeout));
}

function runInContainer(sourceDirectory, input, cidPath, marker) {
  return new Promise((resolvePromise) => {
    const containerCommand = 'cjc /input/main.cj -o /work/main >/work/compiler.log 2>&1; code=$?; if [ "$code" -ne 0 ]; then cat /work/compiler.log >&2; exit 86; fi; printf "' + marker + '"; /work/main';
    const args = [
      'run', '--rm', '--interactive', '--network=none', '--read-only', '--cpus=1', '--memory=512m', '--pids-limit=32',
      '--user=65534:65534', '--cap-drop=ALL', '--security-opt=no-new-privileges', '--stop-timeout=0',
      '--ulimit=cpu=8:8', '--ulimit=fsize=4194304:4194304', '--tmpfs=/work:rw,nosuid,nodev,exec,size=32m',
      '--tmpfs=/tmp:rw,nosuid,nodev,noexec,size=16m', `--cidfile=${cidPath}`,
      '--mount', `type=bind,source=${sourceDirectory},target=/input,readonly`, RUNNER_IMAGE,
      '/bin/sh', '-c', containerCommand
    ];
    const dockerEnv = { PATH: process.env.PATH || '' };
    for (const key of ['DOCKER_HOST', 'DOCKER_CONTEXT', 'DOCKER_TLS_VERIFY', 'DOCKER_CERT_PATH']) if (process.env[key]) dockerEnv[key] = process.env[key];
    const child = spawn('docker', args, { stdio: ['pipe', 'pipe', 'pipe'], windowsHide: true, env: dockerEnv });
    let stdout = '';
    let stderr = '';
    let outputBytes = 0;
    let settled = false;
    let timedOut = false;
    let outputLimited = false;
    let timer;
    const finish = (value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolvePromise(value);
    };
    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');
    const addOutput = (current, chunk) => {
      outputBytes += Buffer.byteLength(chunk);
      if (outputBytes > MAX_OUTPUT_BYTES) {
        outputLimited = true;
        child.kill();
        void readFile(cidPath, 'utf8').then((id) => killContainer(id.trim())).catch(() => {});
        return current;
      }
      return current + chunk;
    };
    child.stdout.on('data', (chunk) => { stdout = addOutput(stdout, chunk); });
    child.stderr.on('data', (chunk) => { stderr = addOutput(stderr, chunk); });
    timer = setTimeout(async () => {
      timedOut = true;
      child.kill();
      let containerId = '';
      try { containerId = (await readFile(cidPath, 'utf8')).trim(); } catch { /* Docker may still be creating the container. */ }
      killContainer(containerId);
    }, RUN_TIMEOUT_MS);
    child.on('error', (error) => {
      if (error.code === 'ENOENT') finish({ kind: 'unavailable', message: 'Docker could not be started. No code was executed.' });
      else finish({ kind: 'runner-error', message: `Docker could not start an isolated run: ${error.message}` });
    });
    child.on('close', (exitCode) => {
      if (timedOut) { finish({ kind: 'timeout' }); return; }
      if (outputLimited) { finish({ kind: 'output-limit' }); return; }
      const compiledAt = stdout.indexOf(marker);
      if (exitCode === 86 && compiledAt < 0) { finish({ kind: 'compile-error', message: stderr.trim() || 'Compilation failed without a diagnostic.', stderr: stderr.trim() }); return; }
      if (compiledAt < 0) { finish({ kind: 'runner-error', message: stderr.trim() || `The isolated runner exited with code ${exitCode ?? 'unknown'}.` }); return; }
      const actual = stdout.slice(compiledAt + marker.length);
      if (exitCode !== 0) { finish({ kind: 'runtime-error', message: stderr.trim() || `Program exited with code ${exitCode}.`, actual, stderr: stderr.trim() }); return; }
      finish({ kind: 'finished', actual, stderr: stderr.trim() });
    });
    child.stdin.on('error', () => {});
    child.stdin.end(input);
  });
}

async function executeTests({ problem, code, tests }) {
  const tempRoot = await mkdtemp(resolve(tmpdir(), 'cangchum-run-'));
  const inputDirectory = resolve(tempRoot, 'input');
  await mkdir(inputDirectory, { recursive: true });
  const inputDir = resolve(inputDirectory, '..');
  await writeFile(resolve(inputDir, 'main.cj'), code, 'utf8');
  const results = [];
  try {
    for (const [index, test] of tests.entries()) {
      const cidPath = resolve(tempRoot, `container-${randomUUID()}.cid`);
      const execution = await runInContainer(inputDir, test.input, cidPath, `__CJ_COMPILED_${randomUUID()}__`);
      if (execution.kind === 'unavailable') return { errorCode: 'runner_unavailable', message: execution.message };
      if (execution.kind === 'runner-error') return { errorCode: 'runner_error', message: execution.message };
      if (execution.kind === 'timeout') {
        results.push({ label: test.label, status: 'Time Limit Exceeded', input: test.input, expectedOutput: test.expectedOutput, actualOutput: '' });
        break;
      }
      if (execution.kind === 'output-limit') {
        results.push({ label: test.label, status: 'Output Limit Exceeded', message: `Program output exceeded ${MAX_OUTPUT_BYTES.toLocaleString()} bytes.`, input: test.input, expectedOutput: test.expectedOutput, actualOutput: '' });
        break;
      }
      if (execution.kind === 'compile-error') {
        results.push({ label: test.label, status: 'Compilation Error', message: execution.message, stderr: execution.stderr, input: test.input, expectedOutput: test.expectedOutput, actualOutput: '' });
        break;
      }
      if (execution.kind === 'runtime-error') {
        results.push({ label: test.label, status: 'Runtime Error', message: execution.message, stderr: execution.stderr, input: test.input, expectedOutput: test.expectedOutput, actualOutput: execution.actual || '' });
        break;
      }
      const passed = compareOutput(execution.actual, test.expectedOutput);
      results.push({ label: test.label || `Test ${index + 1}`, status: passed ? 'Passed' : 'Failed', input: test.input, expectedOutput: test.expectedOutput, actualOutput: execution.actual });
    }
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
  const failure = results.find((result) => result.status !== 'Passed');
  const status = !failure ? 'All Passed' : failure.status === 'Failed' ? 'Wrong Answer' : failure.status;
  return { status, results };
}

async function executeCustomInput({ code, input }) {
  const tempRoot = await mkdtemp(resolve(tmpdir(), 'cangchum-run-'));
  const inputDirectory = resolve(tempRoot, 'input');
  await mkdir(inputDirectory, { recursive: true });
  await writeFile(resolve(tempRoot, 'main.cj'), code, 'utf8');
  try {
    const cidPath = resolve(tempRoot, `container-${randomUUID()}.cid`);
    const execution = await runInContainer(tempRoot, input, cidPath, `__CJ_COMPILED_${randomUUID()}__`);
    if (execution.kind === 'unavailable') return { errorCode: 'runner_unavailable', message: execution.message };
    if (execution.kind === 'runner-error') return { errorCode: 'runner_error', message: execution.message };
    if (execution.kind === 'timeout') return { status: 'Time Limit Exceeded', results: [{ label: 'Custom run', status: 'Time Limit Exceeded', input, actualOutput: '', stderr: '' }] };
    if (execution.kind === 'output-limit') return { status: 'Output Limit Exceeded', results: [{ label: 'Custom run', status: 'Output Limit Exceeded', input, actualOutput: '', stderr: '' }] };
    if (execution.kind === 'compile-error') return { status: 'Compilation Error', results: [{ label: 'Custom run', status: 'Compilation Error', input, actualOutput: '', stderr: execution.stderr, message: execution.message }] };
    if (execution.kind === 'runtime-error') return { status: 'Runtime Error', results: [{ label: 'Custom run', status: 'Runtime Error', input, actualOutput: execution.actual || '', stderr: execution.stderr, message: execution.message }] };
    return { status: 'Program Executed', results: [{ label: 'Custom run', status: 'Executed', input, actualOutput: execution.actual, stderr: execution.stderr }] };
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
}

async function handleRun(request, response) {
  const expectedOrigin = `http://127.0.0.1:${PORT}`;
  if (request.headers.origin && request.headers.origin !== expectedOrigin && request.headers.origin !== `http://localhost:${PORT}`) {
    sendJson(response, 403, { errorCode: 'validation_error', message: 'Cross-origin code execution requests are not allowed.' }); return;
  }
  if (!String(request.headers['content-type'] || '').toLowerCase().startsWith('application/json')) {
    sendJson(response, 415, { errorCode: 'validation_error', message: 'Code requests must use application/json.' }); return;
  }
  let input;
  try { input = await readJson(request); }
  catch (error) { sendJson(response, error.statusCode || 400, { errorCode: 'validation_error', message: error.message }); return; }
  const problem = curriculum.lessons.flatMap((lesson) => lesson.problems).find((item) => item.id === input.problemId);
  if (!problem) { sendJson(response, 404, { errorCode: 'validation_error', message: 'That problem is not in the curriculum.' }); return; }
  if (typeof input.code !== 'string' || !input.code.trim() || input.code.length > MAX_CODE_LENGTH) {
    sendJson(response, 400, { errorCode: 'validation_error', message: `Code must contain between 1 and ${MAX_CODE_LENGTH.toLocaleString()} characters.` }); return;
  }
  const customInput = input.customInput === undefined ? '' : input.customInput;
  if (input.mode === 'run' && (typeof customInput !== 'string' || customInput.length > MAX_INPUT_LENGTH)) {
    sendJson(response, 400, { errorCode: 'validation_error', message: `Custom input must be text no longer than ${MAX_INPUT_LENGTH.toLocaleString()} characters.` }); return;
  }
  if (!['run', 'submit'].includes(input.mode)) { sendJson(response, 400, { errorCode: 'validation_error', message: 'Choose Run code or Submit.' }); return; }
  const health = runnerHealth();
  if (!health.runnerAvailable) { sendJson(response, 503, { errorCode: 'runner_unavailable', message: health.message }); return; }
  if (activeRuns >= MAX_CONCURRENT_RUNS) { sendJson(response, 429, { errorCode: 'runner_busy', message: 'The isolated runner is busy. Try again in a moment.' }); return; }
  activeRuns += 1;
  let result;
  try {
    if (input.mode === 'run') result = await executeCustomInput({ code: input.code, input: customInput });
    else if (problem.testCases.length > MAX_CASES) {
      sendJson(response, 400, { errorCode: 'validation_error', message: `This submission exceeds the ${MAX_CASES}-case suite limit.` });
      return;
    } else result = await executeTests({ problem, code: input.code, tests: problem.testCases });
  }
  finally { activeRuns -= 1; }
  if (result.errorCode) { sendJson(response, 503, result); return; }
  const status = input.mode === 'submit' ? (result.status === 'All Passed' ? 'Accepted' : result.status) : result.status;
  sendJson(response, 200, { ...result, status });
}

async function serveStatic(request, response, pathname) {
  let decoded;
  try { decoded = decodeURIComponent(pathname); }
  catch { response.writeHead(400).end('Bad request'); return; }
  const target = decoded === '/' ? resolve(ROOT, 'index.html') : resolve(ROOT, `.${decoded}`);
  const rel = relative(ROOT, target);
  if (rel === '..' || rel.startsWith(`..${sep}`) || resolve(target) !== target || !publicFiles.has(rel.replaceAll('\\', '/'))) { response.writeHead(404).end('Not found'); return; }
  try {
    const content = await readFile(target);
    response.writeHead(200, {
      'Content-Type': mimeTypes[extname(target).toLowerCase()] || 'application/octet-stream',
      'Content-Length': content.length,
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'no-referrer',
      'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'"
    });
    response.end(content);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8', 'X-Content-Type-Options': 'nosniff' }).end('Not found');
  }
}

curriculum = JSON.parse(await readFile(resolve(ROOT, 'data/curriculum.json'), 'utf8'));
const server = createServer(async (request, response) => {
  const url = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);
  if (request.method === 'GET' && url.pathname === '/api/health') { sendJson(response, 200, runnerHealth()); return; }
  if (request.method === 'POST' && url.pathname === '/api/run') { await handleRun(request, response); return; }
  if (request.method === 'GET' || request.method === 'HEAD') {
    if (request.method === 'HEAD') { response.writeHead(405).end(); return; }
    await serveStatic(request, response, url.pathname);
    return;
  }
  response.writeHead(405, { Allow: 'GET, POST' }).end('Method not allowed');
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`CangChum is available at http://127.0.0.1:${PORT}`);
  const health = runnerHealth();
  console.log(health.runnerAvailable ? `Isolated Cangjie runner ready (${health.compilerVersion}).` : health.message);
});
