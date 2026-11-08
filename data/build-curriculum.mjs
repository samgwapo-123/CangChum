import { readFile, writeFile } from 'node:fs/promises';

const batches = [
  {
    file: 'Cangjie_CodeChum_Batch1_Lessons1-10.md',
    descriptions: [
      'Program structure, printing, and exact text output.',
      'Immutable values, typed constants, and fixed calculations.',
      'Mutable values, reassignment, and state changes.',
      'Primitive values, comparisons, and expressions.',
      'Function declarations, parameters, and reusable logic.',
      'Returning and using more than one result from a function.',
      'Conditional branches and decision-making.',
      'Repeated work with for and while loops.',
      'Stepped sequences and range boundaries.',
      'Array creation, traversal, and aggregate operations.'
    ]
  },
  {
    file: 'Cangjie_CodeChum_Batch2_Lessons11-20.md',
    descriptions: [
      'String indexing, ASCII bytes, Rune conversion, and character iteration.',
      'String trimming, case conversion, replacement, splitting, and inspection.',
      'Enum declarations, associated values, matching, and recursive evaluation.',
      'Overloaded functions and variadic array arguments.',
      'Match patterns, tuple matching, guards, and decision branches.',
      'HashMap insertion, lookup, updates, removal, and size.',
      'HashSet uniqueness, membership, removal, and set relationships.',
      'Ranges and iteration over arrays, maps, and sets.',
      'Custom Iterable and Iterator implementations.',
      'Variadic functions with trailing array parameters.'
    ]
  }
];

function fenceIndentedBlocks(markdown) {
  const lines = markdown.split('\n');
  const formatted = [];
  for (let index = 0; index < lines.length;) {
    if (!lines[index].startsWith('    ')) {
      formatted.push(lines[index++]);
      continue;
    }
    const code = [];
    while (index < lines.length && lines[index].startsWith('    ')) {
      code.push(lines[index++].slice(4));
    }
    formatted.push('```', ...code, '```');
  }
  return formatted.join('\n');
}

function parseDocument(source, batch) {
  source = source.replace(/\r\n/g, '\n');
  const topics = [...source.matchAll(/^# TOPIC (\d+): (.+)$/gm)];

  return topics.map((topic, topicIndex) => {
    const sectionStart = topic.index + topic[0].length;
    const sectionEnd = topics[topicIndex + 1]?.index ?? source.length;
    const section = source.slice(sectionStart, sectionEnd);
    const problemHeadings = [...section.matchAll(/^## (\d+)\.(\d+) (.+)$/gm)];
    const problems = problemHeadings.map((heading, problemIndex) => {
      const contentStart = heading.index + heading[0].length;
      const contentEnd = problemHeadings[problemIndex + 1]?.index ?? section.length;
      let markdown = section.slice(contentStart, contentEnd).trim();
      if (batch.file === 'Cangjie_CodeChum_Batch2_Lessons11-20.md') {
        const footerHeading = markdown.indexOf('## Batch 2 progress');
        if (footerHeading >= 0) {
          markdown = markdown.slice(0, footerHeading)
            .replace(/\n+$/, '')
            .replace(/\n-{3,}$/, '')
            .trimEnd();
        }
      }
      const valueAfter = (label) => {
        const match = markdown.match(new RegExp(
          `\\*\\*${label}:\\*\\*\\s*([\\s\\S]*?)(?=\\n\\*\\*[A-Z][^\\n]*?:\\*\\*|\\n\\*\\*Sample Input\\*\\*|$)`
        ));
        return match?.[1]?.trim() ?? '';
      };
      const sample = (label, nextLabel) => {
        const marker = `**${label}**`;
        const start = markdown.indexOf(marker);
        if (start < 0) return '';
        const next = markdown.indexOf(`**${nextLabel}**`, start + marker.length);
        const body = markdown.slice(start + marker.length, next < 0 ? undefined : next);
        const fenced = body.match(/```[^\n]*\n([\s\S]*?)\n```/);
        if (fenced) return fenced[1];
        return body.split('\n')
          .map((line) => line.startsWith('    ') ? line.slice(4) : line)
          .join('\n')
          .replace(/^\n+|\n+$/g, '');
      };

      const testsStart = markdown.indexOf('**Test Cases**');
      const conceptsStart = markdown.indexOf('**Concepts Practiced:**');
      let casesText = testsStart < 0 ? '' : markdown.slice(
        testsStart + '**Test Cases**'.length,
        conceptsStart < 0 ? undefined : conceptsStart
      );
      casesText = casesText
        .replace(/^\s*```[^\n]*\n/, '')
        .replace(/\n```\s*$/, '')
        .split('\n')
        .map((line) => line.startsWith('    ') ? line.slice(4) : line)
        .join('\n')
        .replace(/^\n+|\n+$/g, '');

      const caseHeadings = [...casesText.matchAll(/^# T(\d+)(?: \(([^)]+)\)| - (.+))?\s*$/gm)];
      const testCases = caseHeadings.map((test, caseIndex) => {
        const start = test.index + test[0].length;
        const end = caseHeadings[caseIndex + 1]?.index ?? casesText.length;
        const body = casesText.slice(start, end).replace(/^\n+/, '');
        const inputMarker = body.indexOf('IN:\n');
        const outputMarker = body.indexOf('\nOUT:\n');
        if (inputMarker < 0 || outputMarker < 0) {
          throw new Error(`Malformed test case ${heading[1]}.${heading[2]} T${test[1]} in ${batch.file}`);
        }
        return {
          number: Number(test[1]),
          label: (test[2] ?? test[3] ?? `Test ${test[1]}`).trim(),
          input: body.slice(inputMarker + 'IN:\n'.length, outputMarker).replace(/\n+$/, ''),
          expectedOutput: body.slice(outputMarker + '\nOUT:\n'.length).replace(/\n+$/, '')
        };
      });

      return {
        id: `${heading[1]}.${heading[2]}`,
        number: Number(heading[2]),
        title: heading[3].trim(),
        difficulty: markdown.match(/\*\*Difficulty:\*\*\s*(Easy|Medium|Hard)/)?.[1] ?? '',
        description: valueAfter('Description'),
        inputFormat: valueAfter('Input Format'),
        outputFormat: valueAfter('Output Format'),
        constraints: valueAfter('Constraints'),
        sampleInput: sample('Sample Input', 'Sample Output'),
        sampleOutput: sample('Sample Output', 'Test Cases'),
        testCases,
        concepts: markdown.match(/\*\*Concepts Practiced:\*\*\s*([\s\S]*?)(?:\n\n|$)/)?.[1]?.trim() ?? '',
        sourceMarkdown: batch.file === 'Cangjie_CodeChum_Batch2_Lessons11-20.md'
          ? fenceIndentedBlocks(markdown)
          : markdown
      };
    });

    const lessonNumber = Number(topic[1]);
    return {
      id: lessonNumber,
      title: topic[2].trim(),
      description: batch.descriptions[lessonNumber - (Number(topics[0][1]))] ?? '',
      problems
    };
  });
}

const lessonsByBatch = await Promise.all(batches.map(async (batch) => {
  const source = await readFile(new URL(`../${batch.file}`, import.meta.url), 'utf8');
  return parseDocument(source, batch);
}));
const lessons = lessonsByBatch.flat();
const problems = lessons.flatMap((lesson) => lesson.problems);
const ids = new Set();

if (lessons.length !== 20 || lessons.some((lesson) => lesson.problems.length !== 5)) {
  throw new Error(`Expected 20 lessons with 5 problems each; found ${lessons.length} lessons.`);
}
if (problems.length !== 100 || problems.some((problem) => ids.has(problem.id) || !ids.add(problem.id))) {
  throw new Error('Expected 100 problems with unique IDs.');
}
for (const lesson of lessons) {
  const counts = { Easy: 0, Medium: 0, Hard: 0 };
  for (const problem of lesson.problems) {
    if (!problem.title || !problem.difficulty || !problem.description || !problem.inputFormat || !problem.outputFormat
      || typeof problem.sampleInput !== 'string' || typeof problem.sampleOutput !== 'string' || problem.testCases.length < 5) {
      throw new Error(`Incomplete source data in problem ${problem.id}`);
    }
    counts[problem.difficulty] += 1;
    if (problem.testCases.some((test) => typeof test.input !== 'string' || typeof test.expectedOutput !== 'string')) {
      throw new Error(`Invalid input or expected output in problem ${problem.id}`);
    }
  }
  if (counts.Easy !== 2 || counts.Medium !== 2 || counts.Hard !== 1) {
    throw new Error(`Unexpected difficulty distribution in lesson ${lesson.id}: ${JSON.stringify(counts)}`);
  }
}

const testCaseCount = problems.reduce((total, problem) => total + problem.testCases.length, 0);
if (testCaseCount !== 520) throw new Error(`Expected 520 test cases; found ${testCaseCount}.`);

await writeFile(new URL('./curriculum.json', import.meta.url), `${JSON.stringify({
  source: batches[0].file,
  sourceFiles: batches.map((batch) => batch.file),
  lessons
}, null, 2)}\n`);
console.log(`Prepared ${lessons.length} lessons, ${problems.length} problems, and ${testCaseCount} source test cases.`);
