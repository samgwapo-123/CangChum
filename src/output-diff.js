const MAX_LCS_CELLS = 1_000_000;
const MAX_RENDERED_LINES = 4_000;

export function normalizeForJudge(value = '') {
  return String(value).replace(/\r\n/g, '\n').replace(/\n+$/, '');
}

function sequenceDiff(left, right, maxCells = MAX_LCS_CELLS) {
  let prefix = 0;
  while (prefix < left.length && prefix < right.length && left[prefix] === right[prefix]) prefix += 1;
  let suffix = 0;
  while (suffix < left.length - prefix && suffix < right.length - prefix && left[left.length - 1 - suffix] === right[right.length - 1 - suffix]) suffix += 1;

  const leftMiddle = left.slice(prefix, left.length - suffix);
  const rightMiddle = right.slice(prefix, right.length - suffix);
  const ops = Array.from({ length: prefix }, (_, index) => ({ type: 'equal', left: left[index], right: right[index], leftIndex: index, rightIndex: index }));

  if (leftMiddle.length * rightMiddle.length > maxCells) {
    for (let index = 0; index < leftMiddle.length; index += 1) ops.push({ type: 'delete', left: leftMiddle[index], right: null, leftIndex: prefix + index, rightIndex: null });
    for (let index = 0; index < rightMiddle.length; index += 1) ops.push({ type: 'insert', left: null, right: rightMiddle[index], leftIndex: null, rightIndex: prefix + index });
  } else {
    const rows = Array.from({ length: leftMiddle.length + 1 }, () => new Uint32Array(rightMiddle.length + 1));
    for (let i = leftMiddle.length - 1; i >= 0; i -= 1) {
      for (let j = rightMiddle.length - 1; j >= 0; j -= 1) {
        rows[i][j] = leftMiddle[i] === rightMiddle[j]
          ? rows[i + 1][j + 1] + 1
          : Math.max(rows[i + 1][j], rows[i][j + 1]);
      }
    }
    let i = 0;
    let j = 0;
    while (i < leftMiddle.length && j < rightMiddle.length) {
      if (leftMiddle[i] === rightMiddle[j]) {
        ops.push({ type: 'equal', left: leftMiddle[i], right: rightMiddle[j], leftIndex: prefix + i, rightIndex: prefix + j });
        i += 1;
        j += 1;
      } else if (rows[i + 1][j] >= rows[i][j + 1]) {
        ops.push({ type: 'delete', left: leftMiddle[i], right: null, leftIndex: prefix + i, rightIndex: null });
        i += 1;
      } else {
        ops.push({ type: 'insert', left: null, right: rightMiddle[j], leftIndex: null, rightIndex: prefix + j });
        j += 1;
      }
    }
    while (i < leftMiddle.length) {
      ops.push({ type: 'delete', left: leftMiddle[i], right: null, leftIndex: prefix + i, rightIndex: null });
      i += 1;
    }
    while (j < rightMiddle.length) {
      ops.push({ type: 'insert', left: null, right: rightMiddle[j], leftIndex: null, rightIndex: prefix + j });
      j += 1;
    }
  }

  for (let index = suffix; index > 0; index -= 1) {
    const leftIndex = left.length - index;
    const rightIndex = right.length - index;
    ops.push({ type: 'equal', left: left[leftIndex], right: right[rightIndex], leftIndex, rightIndex });
  }
  return ops;
}

function alignLines(actualLines, expectedLines) {
  const ops = sequenceDiff(actualLines, expectedLines);
  const aligned = [];
  let deletes = [];
  let inserts = [];
  const flush = () => {
    const paired = Math.min(deletes.length, inserts.length);
    for (let index = 0; index < paired; index += 1) {
      aligned.push({ actual: deletes[index].left, expected: inserts[index].right, actualIndex: deletes[index].leftIndex, expectedIndex: inserts[index].rightIndex, changed: true });
    }
    for (let index = paired; index < deletes.length; index += 1) {
      aligned.push({ actual: deletes[index].left, expected: null, actualIndex: deletes[index].leftIndex, expectedIndex: null, changed: true });
    }
    for (let index = paired; index < inserts.length; index += 1) {
      aligned.push({ actual: null, expected: inserts[index].right, actualIndex: null, expectedIndex: inserts[index].rightIndex, changed: true });
    }
    deletes = [];
    inserts = [];
  };
  for (const op of ops) {
    if (op.type === 'equal') {
      flush();
      aligned.push({ actual: op.left, expected: op.right, actualIndex: op.leftIndex, expectedIndex: op.rightIndex, changed: false });
    } else if (op.type === 'delete') deletes.push(op);
    else inserts.push(op);
  }
  flush();
  return { rows: aligned.slice(0, MAX_RENDERED_LINES), truncated: aligned.length > MAX_RENDERED_LINES };
}

function alignCharacters(actual, expected) {
  return sequenceDiff(Array.from(actual), Array.from(expected), 65_536);
}

export function diffOutputs(actualValue, expectedValue) {
  const actual = normalizeForJudge(actualValue);
  const expected = normalizeForJudge(expectedValue);
  if (actual === expected) return { equal: true, actual, expected, rows: [], truncated: false, firstDifference: null };

  const actualLines = actual.split('\n');
  const expectedLines = expected.split('\n');
  const { rows, truncated } = alignLines(actualLines, expectedLines);
  let firstDifference = null;
  for (const row of rows) {
    if (!row.changed) continue;
    if (row.actual === null || row.expected === null) {
      firstDifference = {
        line: (row.actualIndex ?? row.expectedIndex) + 1,
        column: 1,
        type: row.actual === null ? 'missing line' : 'extra line',
        actual: row.actual,
        expected: row.expected
      };
      break;
    }
    const charOps = alignCharacters(row.actual, row.expected);
    const firstChangeIndex = charOps.findIndex((op) => op.type !== 'equal');
    if (firstChangeIndex >= 0) {
      let endOfChange = firstChangeIndex;
      while (endOfChange < charOps.length && charOps[endOfChange].type !== 'equal') endOfChange += 1;
      const change = charOps.slice(firstChangeIndex, endOfChange);
      const actualChar = change.find((op) => op.type === 'delete')?.left ?? null;
      const expectedChar = change.find((op) => op.type === 'insert')?.right ?? null;
      const type = (actualChar !== null && /\s/u.test(actualChar)) || (expectedChar !== null && /\s/u.test(expectedChar)) ? 'spacing'
        : actualChar == null ? 'missing character' : expectedChar == null ? 'extra character'
          : actualChar.toLocaleLowerCase() === expectedChar.toLocaleLowerCase() ? 'capitalization'
            : /[^\p{L}\p{N}\s]/u.test(actualChar) || /[^\p{L}\p{N}\s]/u.test(expectedChar) ? 'punctuation' : 'text';
      firstDifference = {
        line: (row.actualIndex ?? row.expectedIndex) + 1,
        column: charOps.slice(0, firstChangeIndex).filter((op) => op.type !== 'insert').length + 1,
        type,
        actual: actualChar,
        expected: expectedChar
      };
      break;
    }
  }
  return { equal: false, actual, expected, rows, truncated, firstDifference };
}

export function diffCharacters(actual, expected) {
  return alignCharacters(actual, expected);
}

const escapeHtml = (value = '') => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');

function printableDifference(value) {
  if (value === null || value === undefined) return 'no corresponding character';
  if (value === ' ') return 'space';
  if (value === '\t') return 'tab';
  return `“${value}”`;
}

function renderDiffLine(value, lineNumber, side, kind, isWholeOutputEmpty = false) {
  const number = lineNumber === null ? '' : lineNumber + 1;
  if (value === null) return `<div class="diff-line diff-line--gap"><span class="diff-line-number" aria-hidden="true">${number}</span><code><span class="diff-line-gap-label">${side === 'actual' ? 'Missing line' : 'No corresponding line'}</span></code></div>`;
  if (value === '' && isWholeOutputEmpty) return `<div class="diff-line"><span class="diff-line-number" aria-hidden="true">${number}</span><code><span class="diff-empty">Empty output</span></code></div>`;
  const lineContent = value || '\u200b';
  return `<div class="diff-line"><span class="diff-line-number" aria-hidden="true">${number}</span><code><span class="${kind}">${escapeHtml(lineContent)}</span></code></div>`;
}

function renderDiffContent(row, side, isWholeOutputEmpty) {
  const content = row[side];
  const index = row[`${side}Index`];
  if (content === null) return renderDiffLine(null, null, side);
  if (content === '' && isWholeOutputEmpty) return renderDiffLine(content, index, side, 'diff-same', true);
  if (row.actual === null) return renderDiffLine(content, index, side, 'diff-missing');
  if (row.expected === null) return renderDiffLine(content, index, side, 'diff-extra');
  if (!row.changed) return renderDiffLine(content, index, side, 'diff-same', isWholeOutputEmpty);

  const ops = diffCharacters(row.actual, row.expected);
  let contentHtml = '';
  for (let cursor = 0; cursor < ops.length;) {
    const type = ops[cursor].type;
    let text = '';
    while (cursor < ops.length && ops[cursor].type === type) {
      const op = ops[cursor];
      if (side === 'actual' && op.left !== null) text += op.left;
      if (side === 'expected' && op.right !== null) text += op.right;
      cursor += 1;
    }
    if (!text) continue;
    const className = type === 'equal' ? 'diff-same' : side === 'actual' ? 'diff-extra' : 'diff-missing';
    contentHtml += `<span class="${className}">${escapeHtml(text)}</span>`;
  }
  return `<div class="diff-line"><span class="diff-line-number" aria-hidden="true">${index + 1}</span><code>${contentHtml || '\u200b'}</code></div>`;
}

export function renderOutputDiff(actualValue, expectedValue) {
  const diff = diffOutputs(actualValue, expectedValue);
  const first = diff.firstDifference;
  const summary = first
    ? `First difference: line ${first.line}, column ${first.column}. ${first.type[0].toUpperCase()}${first.type.slice(1)}; your output ${printableDifference(first.actual)}, expected ${printableDifference(first.expected)}.`
    : 'The outputs differ.';
  const renderSide = (side, title) => `<section class="diff-panel"><h4>${title}</h4><div class="diff-lines">${diff.rows.map((row) => renderDiffContent(row, side, diff[side] === '')).join('') || '<div class="diff-line"><span class="diff-line-number">1</span><code><span class="diff-empty">Empty output</span></code></div>'}</div></section>`;
  return `<div class="output-diff"><p class="diff-summary">${escapeHtml(summary)}</p><div class="diff-columns">${renderSide('actual', 'Your Output')}${renderSide('expected', 'Expected Output')}</div>${diff.truncated ? '<p class="diff-truncated">Comparison preview is limited to the first 4,000 aligned lines.</p>' : ''}<p class="diff-rules">Line endings and final newline are ignored by the judge; spaces, capitalization, and punctuation are significant.</p></div>`;
}
