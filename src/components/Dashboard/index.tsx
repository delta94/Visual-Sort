import React, { useState, useEffect } from 'react';
import { Container, Button } from '@material-ui/core';
import AlgoChart, { ActionBuffer } from '../AlgoChart';
import { bubbleSort } from './Algos';

export default function Dashboard() {
  const [sortingArray, setSortingArray] = useState();
  const [actionBuffer, setActionBuffer] = useState<ActionBuffer[]>();
  const [arrLength, setArrLength] = useState(5);
  const [chartKey, setChartKey] = useState(0);

  // On mount randomize and sort
  useEffect(() => {
    randomizeArray();
  }, []);

  // Randomizes the values in array
  const randomizeArray = () => {
    let arr = [];
    for (let i = 0; i < arrLength; i++) {
      arr.push(Math.ceil(Math.random() * 10));
    }
    let result = bubbleSort([...arr]);
    setSortingArray(arr);
    setActionBuffer(result.actionBuffer);
    setChartKey(chartKey + 1);
  };

  return (
    <Container>
      {sortingArray && actionBuffer && (
        <AlgoChart key={chartKey} sortingArray={sortingArray} actionBuffer={actionBuffer} stepTime={400} />
      )}
      <Button onClick={() => randomizeArray()}> Randomize Array </Button>
      Dashbord for sorting
    </Container>
  );
}
