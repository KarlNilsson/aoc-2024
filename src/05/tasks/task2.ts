import { readFile } from 'fs/promises';

type PageRules = Record<number, number[]>;

const sortPageUpdate = (
  currentPage: number[],
  idx: number,
  reversePageRules: PageRules,
  tries: number = 0
): number[] => {
  const newPage = [...currentPage];
  for (let i = 0; i < currentPage.length; i += 1) {
    const currentNumber = currentPage[i];

    const remainingPages = currentPage.slice(i + 1);
    if (reversePageRules[currentNumber] == null) {
      continue;
    }

    const reversePageRule = reversePageRules[currentNumber]
    let failedNumber: number | undefined = undefined;

    reversePageRule
      .some((page) => remainingPages
        .some((remainingPage) => {
          if (page === remainingPage) {
            failedNumber = remainingPage;
            return true;
          }
          return false;
        }))

    if (failedNumber == null) {
      continue;
    } else {
      const failedNumberIdx = currentPage.findIndex((val) => val === failedNumber);
      newPage[i] = failedNumber;
      newPage[failedNumberIdx] = currentNumber;
      return sortPageUpdate(newPage, idx, reversePageRules, tries + 1);
    }

  }
  return tries > 0 ? currentPage : [];
}

const Task = async (inputFile: string, measureTiming: boolean = false) => {
  const data = await readFile(`${__dirname}/../../../input/05/${inputFile}`, {
    encoding: 'utf8',
  });
  const reversePageRules: PageRules = {};

  const start = performance.now();
  const dataLines = data.split('\n');

  const pageSortEndIndex = dataLines.findIndex((dataLine) => dataLine === '');

  const pageRuleLines = dataLines
    .splice(0, pageSortEndIndex)
    .map((pageRule) => pageRule.split('|').map((val) => parseInt(val, 10)));
  dataLines.splice(0, 1);
  const updateLines = [...dataLines]
    .map((dataLine) => dataLine.split(',').map((val) => parseInt(val, 10)));


  for (let i = 0; i < pageRuleLines.length; i += 1) {
    const [left, right] = pageRuleLines[i];
    if (reversePageRules[right] == null) {
      reversePageRules[right] = [];
    }
    reversePageRules[right].push(left);
  }

  const sortedPages: number[][] = []
  for (let i = 0; i < updateLines.length; i += 1) {
    sortedPages.push(sortPageUpdate(updateLines[i], i, reversePageRules));
  }

  const middleNumbers = sortedPages.filter((page) => page.length > 0)
    .map((page) => page[Math.floor(page.length / 2)])

  const result = middleNumbers.reduce((acc, middleNumber) => acc + middleNumber, 0)

  if (measureTiming) {
    const end = performance.now();
    const timeDiff = (end - start).toFixed(3);
    console.log(`Task 2 (${inputFile}) took ${timeDiff} milliseconds`);
  }
  return result;
};

export default Task;
