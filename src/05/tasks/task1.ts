import { readFile } from 'fs/promises';

const Task = async (inputFile: string, measureTiming: boolean = false) => {
  const data = await readFile(`${__dirname}/../../../input/05/${inputFile}`, {
    encoding: 'utf8',
  });

  const start = performance.now();
  const dataLines = data.split('\n');

  const pageSortEndIndex = dataLines.findIndex((dataLine) => dataLine === '');

  const pageRuleLines = dataLines
    .splice(0, pageSortEndIndex)
    .map((pageRule) => pageRule.split('|').map((val) => parseInt(val, 10)));
  dataLines.splice(0, 1);
  const updateLines = [...dataLines].map((dataLine) => dataLine.split(',').map((val) => parseInt(val, 10)));

  const reversePageRules: Record<number, number[]> = {};
  for (let i = 0; i < pageRuleLines.length; i += 1) {
    const [left, right] = pageRuleLines[i];
    if (reversePageRules[right] == null) {
      reversePageRules[right] = [];
    }
    reversePageRules[right].push(left);
  }

  const correctPages: number[][] = [];
  for (let i = 0; i < updateLines.length; i += 1) {
    const currentPage = updateLines[i];

    for (let j = 0; j < currentPage.length; j += 1) {
      const currentNumber = currentPage[j];

      const remainingPages = currentPage.slice(j + 1);
      if (reversePageRules[currentNumber] == null) {
        continue;
      }

      if (
        reversePageRules[currentNumber]
          .some(
            (page) => remainingPages.some((remaningPage) => remaningPage === page)
          )
      ) {
        break;
      }
      if (j === currentPage.length - 1) {
        correctPages.push(currentPage);
      }
    }
  }

  const middleNumbers = correctPages.map((page) => page[Math.floor(page.length / 2)])

  const result = middleNumbers.reduce((acc, middleNumber) => acc + middleNumber, 0)

  if (measureTiming) {
    const end = performance.now();
    const timeDiff = (end - start).toFixed(3);
    console.log(`Task 1 (${inputFile}) took ${timeDiff} milliseconds`);
  }

  return result;
};

export default Task;
