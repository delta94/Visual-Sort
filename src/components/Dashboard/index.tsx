import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import AlgoChart, { ActionBuffer } from '../AlgoChart';

export default function Dashboard() {
  let tempBuffer: ActionBuffer[] = [];
  const [sortingArray, setSortingArray] = useState([1, 5, 8, 9, 2, 3, 6, 8, 3, 6]);
  const [actionBuffer, setActionBuffer] = useState<ActionBuffer[]>([]);

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
  const bubbleSort = (arr: number[]) => {
    let len = arr.length;
    let i: number;
    let j: number;
    let stop: number;

    for (i = 0; i < len; i++) {
      for (j = 0, stop = len - i; j < stop; j++) {
        if (lessThan(arr, j, j + 1)) {
          swap(arr, j, j + 1);
        }
      }
    }

    return { dataSet: arr, actionBuffer: tempBuffer };
  };

  const changeData = () => {
    let result = bubbleSort(sortingArray);
    setActionBuffer(result.actionBuffer);
  };

  useEffect(() => {
    setTimeout(() => {
      changeData();
    }, 1000);
  }, []);

  return (
    <Container>
      <AlgoChart sortingArray={sortingArray} actionBuffer={actionBuffer} />
      Dashbord for sorting
    </Container>
  );
}
