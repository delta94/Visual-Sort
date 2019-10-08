import { ActionBuffer } from '../AlgoChart';

// Custom type
export type SortingAlgorithms = (
  arr: number[]
) => {
  dataSet: number[];
  actionBuffer: ActionBuffer[];
};

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

// Bubble sorts
export const bubbleSort = (arr: number[]) => {
  tempBuffer = [];
  let len = arr.length;

  for (let i = 0; i < len; i++) {
    for (let j = 0, end = len - i; j < end; j++) {
      if (lessThan(arr, j, j + 1)) {
        swap(arr, j, j + 1);
      }
    }
  }

  return { dataSet: arr, actionBuffer: tempBuffer };
};

// Selection sort!
export const selectionSort = (arr: number[]) => {
  tempBuffer = [];
  let len = arr.length;

  for (let i = 0; i < len - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < len; j++) {
      if (lessThan(arr, minIdx, j)) {
        minIdx = j;
      }
    }
    swap(arr, minIdx, i);
  }

  return { dataSet: arr, actionBuffer: tempBuffer };
};

// Insertion Sort!
export const insertionSort = (arr: number[]) => {
  tempBuffer = [];
  let len = arr.length;

  for (let i = 1; i < len; i++) {
    for (let j = i; j > 0 && lessThan(arr, j - 1, j); j--) {
      swap(arr, j - 1, j);
    }
  }

  return { dataSet: arr, actionBuffer: tempBuffer };
};
