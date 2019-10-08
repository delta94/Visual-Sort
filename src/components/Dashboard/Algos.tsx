import { ActionBuffer } from '../AlgoChart';

let tempBuffer: ActionBuffer[] = [];

// Swap method!
const swap = (arr: number[], i: number, j: number) => {
  tempBuffer.push({ type: 'swap', i: i, j: j });
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

// Compares two numbers
const lessThan = (arr: number[], i: number, j: number) => {
  tempBuffer.push({ type: 'compare', i: i, j: j });
  return arr[i] - arr[j] > 0;
};

// Bubble sorts!
export const bubbleSort = (arr: number[]) => {
  tempBuffer = [];
  let len = arr.length;
  let end: number;

  for (let i = 0; i < len; i++) {
    for (let j = 0, end = len - i; j < end; j++) {
      if (lessThan(arr, j, j + 1)) {
        swap(arr, j, j + 1);
      }
    }
  }

  return { dataSet: arr, actionBuffer: tempBuffer };
};
