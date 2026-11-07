const STORAGE_KEY = 'cangchum-progress-v1';
const initialCode = 'main() {\n    \n}';
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const escapeHtml = (value = '') => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const normalizeOutput = (value = '') => String(value).replace(/\r\n/g, '\n').replace(/\n+$/, '');

let lessons = [];
let activeProblem = null;
let activeLesson = 1;
let currentView = 'dashboard';
let difficultyFilter = 'all';
let progress = loadProgress();
let saveTimer;
let busy = false;

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return { problems: saved.problems || {}, activity: Array.isArray(saved.activity) ? saved.activity : [] };
  } catch {
    return { problems: {}, activity: [] };
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function allProblems() {
  return lessons.flatMap((lesson) => lesson.problems.map((problem) => ({ ...problem, lessonId: lesson.id, lessonTitle: lesson.title })));
}

function problemState(problemId) {
  return progress.problems[problemId] || { completed: false, attempts: 0, review: false, savedCode: '', bestSuccessfulSubmission: null, lastSubmittedCode: '', lastAttemptAt: null };
}

function stats() {
  const problems = allProblems();
  const byDifficulty = Object.fromEntries(['Easy', 'Medium', 'Hard'].map((difficulty) => {
    const group = problems.filter((problem) => problem.difficulty === difficulty);
    const completed = group.filter((problem) => problemState(problem.id).completed).length;
    return [difficulty, { total: group.length, completed }];
  }));
  const completed = problems.filter((problem) => problemState(problem.id).completed).length;
  const attempted = problems.reduce((sum, problem) => sum + problemState(problem.id).attempts, 0);
  const next = problems.find((problem) => !problemState(problem.id).completed) || problems[0];
  return { total: problems.length, completed, attempted, percent: problems.length ? Math.round(completed / problems.length * 100) : 0, byDifficulty, next };
}

function lessonProgress(lesson) {
  const completed = lesson.problems.filter((problem) => problemState(problem.id).completed).length;
  const attempts = lesson.problems.some((problem) => problemState(problem.id).attempts > 0);
  return { completed, total: lesson.problems.length, percent: Math.round(completed / lesson.problems.length * 100), attempts, done: completed === lesson.problems.length };
}

function statusFor(problem) {
  const state = problemState(problem.id);
  if (state.completed) return 'completed';
  if (state.attempts > 0) return 'attempted';
  return 'not-started';
}

function inlineMarkdown(value) {
  let text = escapeHtml(value);
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return text;
}

function splitTableRow(line) {
  return line.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim());
}

function renderMarkdown(markdown = '') {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let index = 0;
  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) { index += 1; continue; }
    if (line.trim().startsWith('```')) {
      index += 1;
      const code = [];
      while (index < lines.length && !lines[index].trim().startsWith('```')) code.push(lines[index++]);
      if (index < lines.length) index += 1;
      blocks.push(`<pre class="source-code"><code>${escapeHtml(code.join('\n'))}</code></pre>`);
      continue;
    }
    if (/^\|.*\|$/.test(line.trim())) {
      const rows = [];
      while (index < lines.length && /^\|.*\|$/.test(lines[index].trim())) rows.push(splitTableRow(lines[index++]));
      const dataRows = rows.filter((row) => !row.every((cell) => /^:?-{3,}:?$/.test(cell)));
      if (dataRows.length) {
        const [head, ...body] = dataRows;
        blocks.push(`<div class="table-scroll"><table><thead><tr>${head.map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join('')}</tr></thead><tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${inlineMarkdown(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
      }
      continue;
    }
    if (/^#{1,4}\s/.test(line)) {
      const level = Math.min(line.match(/^#+/)[0].length + 1, 4);
      const title = line.replace(/^#{1,4}\s+/, '');
      blocks.push(`<h${level}>${inlineMarkdown(title)}</h${level}>`);
      index += 1;
      continue;
    }
    if (/^\s*[-*]\s+/.test(line)) {
      const items = [];
      while (index < lines.length && /^\s*[-*]\s+/.test(lines[index])) items.push(`<li>${inlineMarkdown(lines[index++].replace(/^\s*[-*]\s+/, ''))}</li>`);
      blocks.push(`<ul>${items.join('')}</ul>`);
      continue;
    }
    if (/^>\s?/.test(line)) {
      blocks.push(`<blockquote>${inlineMarkdown(line.replace(/^>\s?/, ''))}</blockquote>`);
      index += 1;
      continue;
    }
    const paragraph = [line.trim()];
    index += 1;
    while (index < lines.length && lines[index].trim() && !/^```|^\||^#{1,4}\s|^\s*[-*]\s+|^>\s?/.test(lines[index])) paragraph.push(lines[index++].trim());
    blocks.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`);
  }
  return blocks.join('');
}

function problemMarkdown(problem) {
  let markdown = problem.sourceMarkdown;
  markdown = markdown.replace(/^\*\*Difficulty:\*\*[^\n]*\n*/m, '');
  const casesIndex = markdown.indexOf('**Test Cases**');
  const conceptsIndex = markdown.indexOf('**Concepts Practiced:**');
  if (casesIndex >= 0) {
    const concepts = conceptsIndex >= 0 ? markdown.slice(conceptsIndex) : '';
    markdown = `${markdown.slice(0, casesIndex).trim()}\n\n${concepts}`;
  }
  return markdown.replace(/(?:^|\n)---\s*$/, '').trim();
}

function setView(view) {
  currentView = view;
  document.body.classList.remove('workspace-open');
  $('#dashboard').hidden = view !== 'dashboard';
  $('#curriculum').hidden = view !== 'curriculum';
  $('#workspace-view').hidden = true;
  $$('.app-nav [data-view-link]').forEach((link) => {
    link.classList.toggle('is-active', link.dataset.viewLink === view);
    if (link.dataset.viewLink === view) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  history.replaceState(null, '', `#${view}`);
  renderAll();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function goToWorkspace(problemId) {
  const problem = allProblems().find((item) => item.id === problemId);
  if (!problem) return;
  activeProblem = problem;
  activeLesson = problem.lessonId;
  currentView = 'workspace';
  document.body.classList.add('workspace-open');
  $$('.app-nav [data-view-link]').forEach((link) => {
    const active = link.dataset.viewLink === 'curriculum';
    link.classList.toggle('is-active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  $('#dashboard').hidden = true;
  $('#curriculum').hidden = true;
  $('#workspace-view').hidden = false;
  history.replaceState(null, '', `#workspace/${problem.id}`);
  renderWorkspace();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function renderLessonNav() {
  $('#lesson-nav').innerHTML = lessons.map((lesson) => {
    const state = lessonProgress(lesson);
    const active = activeProblem?.lessonId === lesson.id || (!activeProblem && stats().next?.lessonId === lesson.id);
    const cls = ['lesson-nav__item', state.done ? 'is-done' : '', active ? 'is-current' : ''].filter(Boolean).join(' ');
    return `<button class="${cls}" type="button" data-open-lesson="${lesson.id}" aria-current="${active ? 'step' : 'false'}"><span class="lesson-nav__number">${state.done ? '<span aria-hidden="true">✓</span>' : String(lesson.id).padStart(2, '0')}</span><span class="lesson-nav__copy"><strong>${escapeHtml(lesson.title)}</strong><span>${state.completed}/${state.total} problems</span></span><span class="lesson-nav__chevron" aria-hidden="true">→</span></button>`;
  }).join('');
}

function renderDashboard() {
  const state = stats();
  $('#continue-button').textContent = state.completed === state.total ? 'Review problems' : 'Start next problem';
  $('#stat-completed').innerHTML = `${state.completed} <small>/ ${state.total}</small>`;
  $('#stat-completion-percent').textContent = `${state.percent}% course progress`;
  $('#stat-completion-fill').style.width = `${state.percent}%`;
  $('#stat-attempts').textContent = String(state.attempted);
  $('#stat-current-lesson').textContent = `Lesson ${state.next.lessonId}`;
  $('#stat-current-title').textContent = state.next.lessonTitle;
  $('#rail-progress-fill').style.width = `${state.percent}%`;
  $('#rail-progress-label').textContent = `${state.percent}% complete`;
  $('#difficulty-stats').innerHTML = ['Easy', 'Medium', 'Hard'].map((difficulty) => {
    const item = state.byDifficulty[difficulty];
    const percent = item.total ? Math.round(item.completed / item.total * 100) : 0;
    return `<div class="difficulty-row"><span class="difficulty-badge difficulty-badge--${difficulty.toLowerCase()}">${difficulty}</span><div class="difficulty-track"><span class="difficulty-track__fill difficulty-track__fill--${difficulty.toLowerCase()}" style="width:${percent}%"></span></div><span class="difficulty-count">${item.completed}<span> / ${item.total}</span></span></div>`;
  }).join('');
  const lesson = lessons[state.next.lessonId - 1];
  const lessonState = lessonProgress(lesson);
  const firstProblem = lesson.problems.find((problem) => !problemState(problem.id).completed) || lesson.problems[0];
  $('#next-card').innerHTML = `<div class="next-card__lesson"><span class="next-card__lesson-no">LESSON ${String(lesson.id).padStart(2, '0')}</span><span class="lesson-mini-progress">${lessonState.completed}/${lessonState.total} complete</span></div><div class="next-card__main"><span class="next-card__icon" aria-hidden="true">${String(lesson.id).padStart(2, '0')}</span><div><h3>${escapeHtml(lesson.title)}</h3><p>${escapeHtml(lesson.description)}</p><span class="next-card__problems">${lesson.problems.length} problems <span aria-hidden="true">·</span> 2 Easy <span aria-hidden="true">·</span> 2 Medium <span aria-hidden="true">·</span> 1 Hard</span></div></div><button class="btn btn--primary next-card__action" type="button" data-open-problem="${firstProblem.id}">Start lesson</button>`;
  const activity = progress.activity.slice(0, 5);
  $('#activity-count').textContent = activity.length ? `${progress.activity.length} ${progress.activity.length === 1 ? 'attempt' : 'attempts'}` : 'No attempts yet';
  $('#activity-list').innerHTML = activity.length ? activity.map((entry) => {
    const problem = allProblems().find((item) => item.id === entry.problemId);
    if (!problem) return '';
    return `<button class="activity-item" type="button" data-open-problem="${problem.id}"><span class="activity-item__icon ${entry.status === 'Accepted' ? 'is-accepted' : ''}" aria-hidden="true">${entry.status === 'Accepted' ? '✓' : '↻'}</span><span class="activity-item__problem"><strong>${escapeHtml(problem.title)}</strong><span>Lesson ${problem.lessonId} · ${escapeHtml(problem.lessonTitle)} · ${entry.mode === 'submit' ? 'Submitted' : 'Run'}</span></span><span class="activity-item__result ${entry.status === 'Accepted' ? 'is-accepted' : 'is-failed'}">${escapeHtml(entry.status)}</span><time>${formatDate(entry.attemptedAt)}</time><span class="activity-item__arrow" aria-hidden="true">→</span></button>`;
  }).join('') : '<div class="activity-empty"><span class="activity-empty__icon" aria-hidden="true">↗</span><div><strong>Your coding activity will appear here</strong><span>Run or submit a solution to keep a record of each attempt.</span></div></div>';
}

function renderCurriculum() {
  $('#lesson-overview-list').innerHTML = lessons.map((lesson) => {
    const state = lessonProgress(lesson);
    const expanded = activeLesson === lesson.id;
    const visibleProblems = lesson.problems.filter((problem) => {
      const status = statusFor(problem);
      const statusFilter = $('#status-filter').value;
      const matchesDifficulty = difficultyFilter === 'all' || problem.difficulty === difficultyFilter;
      const matchesStatus = statusFilter === 'all' || (statusFilter === 'review' ? problemState(problem.id).review : statusFilter === status);
      return matchesDifficulty && matchesStatus;
    });
    const content = visibleProblems.length ? visibleProblems.map((problem) => {
      const pState = problemState(problem.id);
      const status = statusFor(problem);
      return `<button class="problem-row" type="button" data-open-problem="${problem.id}"><span class="problem-row__number">${problem.id}</span><span class="problem-row__title"><strong>${escapeHtml(problem.title)}</strong><span>${escapeHtml(problem.description)}</span></span><span class="difficulty-badge difficulty-badge--${problem.difficulty.toLowerCase()}">${problem.difficulty}</span><span class="problem-row__state ${status === 'completed' ? 'is-complete' : ''}">${pState.review ? '<span class="review-star" aria-label="Marked for review">☆</span>' : ''}${status === 'completed' ? 'Completed' : status === 'attempted' ? 'Attempted' : 'Start'} <span aria-hidden="true">→</span></span></button>`;
    }).join('') : '<div class="filtered-empty">No problems match these filters in this lesson.</div>';
    return `<article class="lesson-card ${expanded ? 'is-expanded' : ''}"><button class="lesson-card__heading" type="button" data-toggle-lesson="${lesson.id}" aria-expanded="${expanded}"><span class="lesson-card__number">${String(lesson.id).padStart(2, '0')}</span><span class="lesson-card__name"><strong>${escapeHtml(lesson.title)}</strong><span>${escapeHtml(lesson.description)}</span></span><span class="lesson-card__progress"><span class="lesson-card__track"><span style="width:${state.percent}%"></span></span><span>${state.completed}/${state.total}</span></span><span class="lesson-card__chevron" aria-hidden="true">⌄</span></button><div class="lesson-card__problems" ${expanded ? '' : 'hidden'}>${content}</div></article>`;
  }).join('');
}

function renderAll() {
  if (!lessons.length) return;
  renderLessonNav();
  renderDashboard();
  renderCurriculum();
}

function renderWorkspace() {
  if (!activeProblem) return;
  const lesson = lessons[activeProblem.lessonId - 1];
  const pState = problemState(activeProblem.id);
  $('#workspace-breadcrumb').textContent = `Lesson ${lesson.id} · ${lesson.title}`;
  $('#problem-number').textContent = activeProblem.id;
  $('#problem-title').textContent = activeProblem.title;
  $('#problem-difficulty').textContent = activeProblem.difficulty;
  $('#problem-difficulty').className = `difficulty-badge difficulty-badge--${activeProblem.difficulty.toLowerCase()}`;
  $('#problem-status').textContent = pState.completed ? 'Completed' : pState.attempts ? 'Attempted' : '';
  $('#problem-status').className = `problem-status${pState.completed ? ' is-complete' : ''}`;
  $('#problem-source').innerHTML = renderMarkdown(problemMarkdown(activeProblem));
  $('#testcases-count').textContent = `${activeProblem.testCases.length} cases`;
  $('#testcases-list').innerHTML = activeProblem.testCases.map((test, index) => `<article class="testcase-item"><div class="testcase-item__head"><span>Test ${index + 1}</span><span>${escapeHtml(test.label)}</span></div><div class="testcase-item__columns"><div><span>Input</span><pre>${escapeHtml(test.input)}</pre></div><div><span>Expected output</span><pre>${escapeHtml(test.expectedOutput)}</pre></div></div></article>`).join('');
  const customInput = $('#custom-input');
  try { customInput.value = localStorage.getItem(`cangchum-custom-input:${activeProblem.id}`) || ''; }
  catch { customInput.value = ''; }
  $('#review-button').setAttribute('aria-pressed', String(Boolean(pState.review)));
  $('#review-button').classList.toggle('is-reviewing', Boolean(pState.review));
  $('#review-button').querySelector('[aria-hidden="true"]').textContent = pState.review ? '★' : '☆';
  const editor = $('#code-editor');
  editor.value = pState.savedCode || initialCode;
  highlightCode();
  $('#unsaved-dot').hidden = true;
  const index = allProblems().findIndex((problem) => problem.id === activeProblem.id);
  $('#problem-position').textContent = `Problem ${index + 1} of ${allProblems().length}`;
  $('#previous-problem').disabled = index === 0;
  $('#next-problem').disabled = index === allProblems().length - 1;
  $('#previous-problem').setAttribute('data-adjacent', allProblems()[index - 1]?.id || '');
  $('#next-problem').setAttribute('data-adjacent', allProblems()[index + 1]?.id || '');
  renderResultsEmpty();
  setSplitFromPreference();
}

function renderResultsEmpty() {
  $('#results-pane').innerHTML = '<div class="results-empty"><span class="results-empty__icon" aria-hidden="true">⌘</span><strong>Run your code to see results</strong><span>Sample run checks the example. Submit checks every listed test case.</span></div>';
}

function formatDate(dateValue) {
  if (!dateValue) return '';
  const date = new Date(dateValue);
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(date);
}

function highlightCode() {
  const textarea = $('#code-editor');
  if (!textarea) return;
  const source = textarea.value;
  const tokens = /\/\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:main|func|if|else|for|while|in|return|let|var|const|struct|class|enum|import|package|match|case|true|false|null|as|is|try|catch|finally|throw|this|super|public|private|static|mut|where|type|break|continue)\b|\b(?:Int(?:8|16|32|64)?|UInt(?:8|16|32|64)?|Float(?:16|32|64)?|Bool|String|Unit|Rune|Array|Option|Tuple|Any)\b|\b\d+(?:\.\d+)?\b|[{}()[\]]/g;
  const bracketOffset = findMatchingBracket(source, textarea.selectionStart);
  let html = '';
  let last = 0;
  for (const match of source.matchAll(tokens)) {
    const index = match.index;
    html += escapeHtml(source.slice(last, index));
    const token = match[0];
    const end = index + token.length;
    let className = token.startsWith('//') ? 'syntax-comment'
      : token.startsWith('"') || token.startsWith("'") ? 'syntax-string'
        : /^(?:\d)/.test(token) ? 'syntax-number'
          : /^[{}()[\]]$/.test(token) ? (index === bracketOffset || end - 1 === bracketOffset ? 'syntax-bracket syntax-bracket--match' : 'syntax-bracket')
            : /^(?:Int|UInt|Float|Bool|String|Unit|Rune|Array|Option|Tuple|Any)/.test(token) ? 'syntax-type' : 'syntax-keyword';
    html += `<span class="${className}">${escapeHtml(token)}</span>`;
    last = end;
  }
  html += escapeHtml(source.slice(last));
  if (source.endsWith('\n')) html += ' ';
  $('#highlighted-code').innerHTML = html || ' ';
  $('#line-numbers').innerHTML = Array.from({ length: Math.max(source.split('\n').length, 1) }, (_, index) => `<span>${index + 1}</span>`).join('');
  syncEditorScroll();
}

function findMatchingBracket(source, cursor) {
  const pairs = { '(': ')', '[': ']', '{': '}' };
  const reverse = { ')': '(', ']': '[', '}': '{' };
  let index = Math.max(0, Math.min(cursor, source.length));
  if (index === source.length || !'()[]{}'.includes(source[index])) index -= 1;
  if (index < 0 || !'()[]{}'.includes(source[index])) return -1;
  const current = source[index];
  if (pairs[current]) {
    let depth = 0;
    for (let i = index; i < source.length; i += 1) {
      if (source[i] === current) depth += 1;
      if (source[i] === pairs[current] && --depth === 0) return i;
    }
  } else {
    let depth = 0;
    for (let i = index; i >= 0; i -= 1) {
      if (source[i] === current) depth += 1;
      if (source[i] === reverse[current] && --depth === 0) return i;
    }
  }
  return -1;
}

function syncEditorScroll() {
  const textarea = $('#code-editor');
  $('#syntax-layer').style.transform = `translate(${-textarea.scrollLeft}px, ${-textarea.scrollTop}px)`;
  $('#line-numbers').style.transform = `translateY(${-textarea.scrollTop}px)`;
}

function saveCode() {
  if (!activeProblem) return;
  const id = activeProblem.id;
  progress.problems[id] = { ...problemState(id), savedCode: $('#code-editor').value };
  saveProgress();
  $('#unsaved-dot').hidden = false;
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => { $('#unsaved-dot').hidden = true; renderAll(); }, 650);
}

function setSplitFromPreference() {
  const split = localStorage.getItem('cangchum-split-width');
  $('#workspace-panels').style.setProperty('--problem-width', split || '44%');
}

function setRunnerLabel(status) {
  const label = $('#runtime-label');
  const pill = label.closest('.runtime-pill');
  if (status?.runnerAvailable) {
    label.textContent = status.compilerVersion ? `Runner ready · ${status.compilerVersion}` : 'Runner ready';
    pill.classList.add('is-ready');
  } else {
    label.textContent = 'Runner unavailable';
    pill.classList.remove('is-ready');
  }
  pill.setAttribute('aria-label', status?.runnerAvailable ? `Cangjie runner ready${status.compilerVersion ? `, ${status.compilerVersion}` : ''}` : status?.message || 'Cangjie runner unavailable');
}

async function checkRunner() {
  try {
    const response = await fetch('/api/health');
    const health = await response.json();
    setRunnerLabel(health);
  } catch {
    setRunnerLabel(null);
  }
}

function resultTemplate(result, mode) {
  const overall = result.status;
  const caseCount = result.results?.length || 0;
  const passed = result.results?.filter((item) => item.status === 'Passed').length || 0;
  const failed = caseCount - passed;
  if (result.errorCode === 'runner_unavailable') {
    return `<div class="runner-unavailable"><span class="runner-unavailable__icon" aria-hidden="true">!</span><div><strong>Code runner unavailable</strong><p>${escapeHtml(result.message || 'No isolated Cangjie runner is configured. No code was executed and no test results were recorded.')}</p></div></div>`;
  }
  if (result.errorCode === 'runner_busy') return `<div class="runner-unavailable"><span class="runner-unavailable__icon" aria-hidden="true">…</span><div><strong>Runner busy</strong><p>${escapeHtml(result.message || 'Try again in a moment.')}</p></div></div>`;
  if (result.errorCode === 'validation_error') return `<div class="result-banner result-banner--error"><strong>Cannot run code</strong><span>${escapeHtml(result.message || 'The code request could not be processed.')}</span></div>`;
  const bannerClass = ['Accepted', 'Sample Passed', 'Case Passed', 'Program Executed'].includes(overall) ? 'result-banner--accepted' : overall === 'Compilation Error' ? 'result-banner--compile' : overall === 'Runtime Error' || overall === 'Time Limit Exceeded' ? 'result-banner--error' : 'result-banner--wrong';
  const meta = mode === 'run' ? '<span>Custom input</span>' : caseCount ? `<span>${passed}/${caseCount} tests passed</span><span>${failed} failed</span>` : '';
  const body = (result.results || []).map((item, index) => {
    const okay = item.status === 'Passed' || item.status === 'Executed';
    const output = item.status === 'Failed'
      ? `<div><span>Expected</span><pre>${escapeHtml(item.expectedOutput)}</pre></div><div><span>Actual</span><pre>${escapeHtml(item.actualOutput)}</pre></div>`
      : item.actualOutput !== undefined
        ? `<div><span>stdout</span><pre>${escapeHtml(item.actualOutput)}</pre></div>${item.stderr ? `<div><span>stderr</span><pre>${escapeHtml(item.stderr)}</pre></div>` : ''}`
        : '';
    const message = item.message && item.message !== item.stderr ? `<pre class="result-error">${escapeHtml(item.message)}</pre>` : '';
    return `<article class="result-case ${okay ? 'is-passed' : 'is-failed'}"><div class="result-case__heading"><span class="result-case__check" aria-hidden="true">${okay ? '✓' : item.status === 'Compilation Error' ? '!' : '×'}</span><strong>${escapeHtml(item.label || `Test ${index + 1}`)}</strong><span>${escapeHtml(item.status)}</span></div>${message}${output ? `<div class="result-case__outputs">${output}</div>` : ''}</article>`;
  }).join('');
  return `<div class="result-summary"><div class="result-banner ${bannerClass}"><strong>${escapeHtml(overall)}</strong><div>${meta}</div></div>${result.message ? `<pre class="result-error">${escapeHtml(result.message)}</pre>` : ''}<div class="result-cases">${body}</div></div>`;
}

async function execute(mode) {
  if (!activeProblem || busy) return;
  const code = $('#code-editor').value;
  const payload = { problemId: activeProblem.id, code, mode };
  if (mode === 'run') payload.customInput = $('#custom-input').value;
  busy = true;
  $('#run-code').disabled = true;
  $('#submit-code').disabled = true;
  $('#results-pane').innerHTML = '<div class="execution-loading"><span class="loading-mark" aria-hidden="true"></span><strong>Checking code</strong><span>Sending it to the isolated Cangjie runner.</span></div>';
  try {
    const response = await fetch('/api/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    $('#results-pane').innerHTML = resultTemplate(result, mode);
    if (!result.errorCode && result.results?.length) {
      const state = problemState(activeProblem.id);
      const attemptedAt = new Date().toISOString();
      const entry = { problemId: activeProblem.id, status: result.status, mode, attemptedAt, passed: result.results.filter((item) => item.status === 'Passed').length, total: result.results.length };
      progress.problems[activeProblem.id] = { ...state, attempts: state.attempts + 1, lastSubmittedCode: code, lastAttemptAt: attemptedAt, completed: state.completed || (mode === 'submit' && result.status === 'Accepted'), bestSuccessfulSubmission: result.status === 'Accepted' && mode === 'submit' ? { code, attemptedAt } : state.bestSuccessfulSubmission };
      progress.activity.unshift(entry);
      progress.activity = progress.activity.slice(0, 40);
      saveProgress();
      $('#problem-status').textContent = progress.problems[activeProblem.id].completed ? 'Completed' : 'Attempted';
      $('#problem-status').classList.toggle('is-complete', progress.problems[activeProblem.id].completed);
      renderAll();
    }
  } catch (error) {
    $('#results-pane').innerHTML = resultTemplate({ errorCode: 'runner_unavailable', message: 'The local execution service could not be reached. Your code is saved, but it was not executed.' }, mode);
  } finally {
    busy = false;
    $('#run-code').disabled = false;
    $('#submit-code').disabled = false;
  }
}

function toggleReview() {
  if (!activeProblem) return;
  const state = problemState(activeProblem.id);
  progress.problems[activeProblem.id] = { ...state, review: !state.review };
  saveProgress();
  renderWorkspace();
  renderAll();
}

function handleEditorKeydown(event) {
  const editor = event.currentTarget;
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
    event.preventDefault();
    execute('sample');
    return;
  }
  if (event.key === 'Tab') {
    event.preventDefault();
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    editor.setRangeText('    ', start, end, 'end');
    editor.dispatchEvent(new Event('input', { bubbles: true }));
    return;
  }
  if (event.key === 'Enter') {
    const start = editor.selectionStart;
    const before = editor.value.slice(0, start);
    const currentLine = before.slice(before.lastIndexOf('\n') + 1);
    let indentation = currentLine.match(/^[ \t]*/)?.[0] || '';
    if (/\{\s*$/.test(currentLine)) indentation += '    ';
    event.preventDefault();
    editor.setRangeText(`\n${indentation}`, start, editor.selectionEnd, 'end');
    editor.dispatchEvent(new Event('input', { bubbles: true }));
  }
  if ((event.ctrlKey || event.metaKey) && event.key === 's') {
    event.preventDefault();
    saveCode();
  }
}

function bindEvents() {
  document.addEventListener('click', (event) => {
    const openProblem = event.target.closest('[data-open-problem]');
    if (openProblem) { goToWorkspace(openProblem.dataset.openProblem); return; }
    const openLesson = event.target.closest('[data-open-lesson]');
    if (openLesson) { activeLesson = Number(openLesson.dataset.openLesson); setView('curriculum'); return; }
    const toggleLesson = event.target.closest('[data-toggle-lesson]');
    if (toggleLesson) { activeLesson = activeLesson === Number(toggleLesson.dataset.toggleLesson) ? 0 : Number(toggleLesson.dataset.toggleLesson); renderCurriculum(); return; }
    const viewLink = event.target.closest('[data-view-link]');
    if (viewLink) { event.preventDefault(); setView(viewLink.dataset.viewLink); $('#mobile-menu').hidden = true; $('.menu-button').setAttribute('aria-expanded', 'false'); return; }
    const filter = event.target.closest('[data-filter-difficulty]');
    if (filter) { difficultyFilter = filter.dataset.filterDifficulty; $$('[data-filter-difficulty]').forEach((item) => { item.classList.toggle('is-selected', item === filter); item.setAttribute('aria-pressed', String(item === filter)); }); renderCurriculum(); return; }
    const adjacent = event.target.closest('[data-adjacent]');
    if (adjacent && adjacent.dataset.adjacent) { goToWorkspace(adjacent.dataset.adjacent); return; }
  });
  $('#continue-button').addEventListener('click', () => goToWorkspace(stats().next.id));
  $('#view-curriculum').addEventListener('click', () => { activeLesson = stats().next.lessonId; setView('curriculum'); });
  $('#back-to-course').addEventListener('click', () => { setView('curriculum'); activeLesson = activeProblem.lessonId; renderCurriculum(); });
  $('#review-button').addEventListener('click', toggleReview);
  $('#reset-code').addEventListener('click', () => { $('#code-editor').value = initialCode; highlightCode(); saveCode(); });
  $('#copy-code').addEventListener('click', async () => { try { await navigator.clipboard.writeText($('#code-editor').value); $('#copy-code').textContent = 'Copied'; setTimeout(() => { $('#copy-code').textContent = 'Copy'; }, 1200); } catch { $('#copy-code').textContent = 'Select code'; } });
  $('#run-code').addEventListener('click', () => execute('run'));
  $('#submit-code').addEventListener('click', () => execute('submit'));
  $('#code-editor').addEventListener('input', () => { highlightCode(); saveCode(); });
  $('#custom-input').addEventListener('input', () => {
    if (!activeProblem) return;
    try { localStorage.setItem(`cangchum-custom-input:${activeProblem.id}`, $('#custom-input').value); } catch {}
  });
  $('#code-editor').addEventListener('scroll', syncEditorScroll);
  $('#code-editor').addEventListener('click', highlightCode);
  $('#code-editor').addEventListener('keyup', highlightCode);
  $('#code-editor').addEventListener('keydown', handleEditorKeydown);
  $('#status-filter').addEventListener('change', renderCurriculum);
  $('.menu-button').addEventListener('click', (event) => { const button = event.currentTarget; const open = button.getAttribute('aria-expanded') !== 'true'; button.setAttribute('aria-expanded', String(open)); $('#mobile-menu').hidden = !open; });
  const grip = $('#resize-grip');
  let resizing = false;
  grip.addEventListener('pointerdown', (event) => { if (innerWidth < 880) return; resizing = true; grip.setPointerCapture(event.pointerId); document.body.classList.add('is-resizing'); });
  grip.addEventListener('pointermove', (event) => {
    if (!resizing) return;
    const rect = $('#workspace-panels').getBoundingClientRect();
    const percent = Math.max(33, Math.min(64, (event.clientX - rect.left) / rect.width * 100));
    $('#workspace-panels').style.setProperty('--problem-width', `${percent}%`);
    localStorage.setItem('cangchum-split-width', `${percent}%`);
    grip.setAttribute('aria-valuenow', String(Math.round(percent)));
  });
  grip.addEventListener('pointerup', () => { resizing = false; document.body.classList.remove('is-resizing'); });
  grip.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const current = Number.parseFloat(getComputedStyle($('#workspace-panels')).getPropertyValue('--problem-width')) || 44;
    const next = Math.max(33, Math.min(64, current + (event.key === 'ArrowRight' ? 2 : -2)));
    $('#workspace-panels').style.setProperty('--problem-width', `${next}%`);
    localStorage.setItem('cangchum-split-width', `${next}%`);
  });
  window.addEventListener('hashchange', () => {
    const route = location.hash.slice(1);
    if (route.startsWith('workspace/')) goToWorkspace(route.split('/')[1]);
    else if (route === 'curriculum') setView('curriculum');
    else if (route === 'dashboard' || !route) setView('dashboard');
  });
}

async function init() {
  const response = await fetch('/data/curriculum.json');
  if (!response.ok) throw new Error('Curriculum data could not be loaded.');
  const data = await response.json();
  lessons = data.lessons;
  bindEvents();
  const route = location.hash.slice(1);
  if (route.startsWith('workspace/')) {
    const target = allProblems().find((problem) => problem.id === route.split('/')[1]);
    if (target) goToWorkspace(target.id);
    else setView('dashboard');
  } else if (route === 'curriculum') setView('curriculum');
  else setView('dashboard');
  await checkRunner();
}

init().catch((error) => {
  document.querySelector('main').innerHTML = `<div class="load-error"><h1>CangChum could not load</h1><p>${escapeHtml(error.message)}</p><p>Start the local app from the project folder and refresh this page.</p></div>`;
});
