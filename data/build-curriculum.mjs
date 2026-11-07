import { readFile, writeFile } from 'node:fs/promises';

const source = (await readFile(new URL('../Cangjie_CodeChum_Batch1_Lessons1-10.md', import.meta.url), 'utf8')).replace(/\r\n/g, '\n');
const topicDescriptions = [
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
];

const topics = [...source.matchAll(/^# TOPIC (\d+): (.+)$/gm)];
const lessons = topics.map((topic, index) => {
  const start = topic.index + topic[0].length;
  const end = topics[index + 1]?.index ?? source.length;
  const section = source.slice(start, end);
  const problems = [...section.matchAll(/^## (\d+)\.(\d+) (.+)$/gm)].map((match, problemIndex, matches) => {
    const contentStart = match.index + match[0].length;
    const contentEnd = matches[problemIndex + 1]?.index ?? section.length;
    const markdown = section.slice(contentStart, contentEnd).trim();
    const valueAfter = (label) => {
      const match = markdown.match(new RegExp(`\\*\\*${label}:\\*\\*\\s*([\\s\\S]*?)(?=\\n\\*\\*[A-Z][^\\n]*?:\\*\\*|\\n\\*\\*Sample Input\\*\\*|$)`));
      return match?.[1]?.trim() ?? '';
    };
    const fencedAfter = (label) => {
      const at = markdown.indexOf(`**${label}**`);
      if (at < 0) return '';
      return markdown.slice(at).match(/```[^\n]*\n([\s\S]*?)\n```/)?.[1] ?? '';
    };
    const casesAt = markdown.indexOf('**Test Cases**');
    const conceptsAt = markdown.indexOf('**Concepts Practiced:**');
    const casesText = casesAt < 0 ? '' : markdown.slice(casesAt + '**Test Cases**'.length, conceptsAt < 0 ? undefined : conceptsAt).replace(/^\s*```[^\n]*\n/, '').replace(/\n```\s*$/, '').trim();
    const caseHeaders = [...casesText.matchAll(/^# T(\d+)(?: \(([^)]+)\)| - (.+))\nIN:\n([\s\S]*?)\nOUT:\n/gm)];
    const cases = caseHeaders.map((test, caseIndex) => {
      const outputStart = test.index + test[0].length;
      const outputEnd = caseHeaders[caseIndex + 1]?.index ?? casesText.length;
      return {
        number: Number(test[1]),
        label: (test[2] ?? test[3]).trim(),
        input: test[4].replace(/\n$/, ''),
        expectedOutput: casesText.slice(outputStart, outputEnd).replace(/\n+$/, '')
      };
    });
    const num = Number(match[1]);
    return {
      id: `${num}.${match[2]}`,
      number: Number(match[2]),
      title: match[3].trim(),
      difficulty: markdown.match(/\*\*Difficulty:\*\*\s*(Easy|Medium|Hard)/)?.[1] ?? '',
      description: valueAfter('Description'),
      inputFormat: valueAfter('Input Format'),
      outputFormat: valueAfter('Output Format'),
      constraints: valueAfter('Constraints'),
      sampleInput: fencedAfter('Sample Input'),
      sampleOutput: fencedAfter('Sample Output'),
      testCases: cases,
      concepts: markdown.match(/\*\*Concepts Practiced:\*\*\s*([^\n]*)/)?.[1]?.trim() ?? '',
      sourceMarkdown: markdown
    };
  });
  return {
    id: Number(topic[1]),
    title: topic[2].trim(),
    description: topicDescriptions[Number(topic[1]) - 1],
    problems
  };
});

  if (lessons.length !== 10 || lessons.some((lesson) => lesson.problems.length !== 5)) {
  throw new Error(`Expected 10 lessons with 5 problems each; found ${lessons.length} lessons.`);
}
for (const lesson of lessons) {
  const counts = { Easy: 0, Medium: 0, Hard: 0 };
  for (const problem of lesson.problems) {
    if (!problem.difficulty || !problem.title || !problem.description || !problem.inputFormat || !problem.outputFormat || !problem.sampleInput || !problem.sampleOutput || !problem.testCases.length) {
      throw new Error(`Incomplete source data in problem ${problem.id}`);
    }
    counts[problem.difficulty] += 1;
  }
  if (counts.Easy !== 2 || counts.Medium !== 2 || counts.Hard !== 1) {
    throw new Error(`Unexpected difficulty distribution in lesson ${lesson.id}: ${JSON.stringify(counts)}`);
  }
}

await writeFile(new URL('./curriculum.json', import.meta.url), `${JSON.stringify({
  source: 'Cangjie_CodeChum_Batch1_Lessons1-10.md',
  lessons
}, null, 2)}\n`);
console.log(`Prepared ${lessons.length} lessons and ${lessons.reduce((sum, lesson) => sum + lesson.problems.length, 0)} problems; preserved ${lessons.reduce((sum, lesson) => sum + lesson.problems.reduce((n, problem) => n + problem.testCases.length, 0), 0)} source test cases.`);
