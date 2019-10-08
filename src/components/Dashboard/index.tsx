import React, { useState, useEffect } from 'react';
import { Container, Button, Slider, makeStyles } from '@material-ui/core';
import AlgoChart, { ActionBuffer } from '../AlgoChart';
import { bubbleSort, SortingAlgorithms } from './Algos';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    height: 'calc(100% - 128px)',
    paddingTop: '6em',
    padding: '3em',
    boxSizing: 'border-box'
  }
}));

export default function Dashboard() {
  const classes = useStyles({});
  // State for AlgoChart Props
  const [startingArray, setStartingArray] = useState();
  const [actionBuffer, setActionBuffer] = useState<ActionBuffer[] | undefined>();
  const [stepTime, setStepTime] = useState(600);

  // Key to remove chart from dom
  const [chartKey, setChartKey] = useState(0);

  // State to control size of Array and Algo used
  const [arrLength, setArrLength] = useState(10);
  const [selectedAlgo, setSelectedAlgo] = useState(() => bubbleSort);
  const [sortingArray, setSortingArray] = useState<number[]>();

  // Randomizes the values in array
  const randomizeArray = () => {
    let arr = [];
    for (let i = 0; i < arrLength; i++) {
      arr.push(Math.ceil(Math.random() * 10));
    }
    setSortingArray([...arr]);
    setStartingArray([...arr]);
    setActionBuffer(undefined);
    setChartKey(chartKey + 1);
  };

  // Calls Selected Sorting Algo, with Sorting Arary
  const sort = (sortingAlgo: SortingAlgorithms) => {
    if (sortingArray) {
      let result = sortingAlgo([...sortingArray]);
      setActionBuffer(result.actionBuffer);
    }
  };

  // Start sorting on mount
  useEffect(() => {
    randomizeArray();
  }, []);

  return (
    <Container className={classes.mainContainer}>
      <div>
        {startingArray && (
          <AlgoChart key={chartKey} startingArray={startingArray} actionBuffer={actionBuffer} stepTime={stepTime} />
        )}
        <Button onClick={() => randomizeArray()} color={'primary'}>
          Randomize Values
        </Button>
        <Button color={'primary'} onClick={() => sort(bubbleSort)}>
          Bubble Sort
        </Button>
        <Button color={'primary'}>Heap Sort</Button>
        <Button color={'primary'}>Quick Sort</Button>
        <Slider
          defaultValue={stepTime}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={100}
          marks
          min={100}
          max={1000}
          onChange={(e, v) => {
            if (typeof v === 'number') setStepTime(v);
          }}
        />
      </div>
    </Container>
  );
}
