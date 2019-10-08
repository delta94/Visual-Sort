import React, { useState, useEffect } from 'react';
import { Container, Button, Slider, makeStyles } from '@material-ui/core';
import AlgoChart, { ActionBuffer } from '../AlgoChart';
import { bubbleSort } from './Algos';
import { classes } from 'istanbul-lib-coverage';

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
  const [sortingArray, setSortingArray] = useState();
  const [actionBuffer, setActionBuffer] = useState<ActionBuffer[]>();
  const [arrLength, setArrLength] = useState(10);
  const [chartKey, setChartKey] = useState(0);
  const [stepTime, setStepTime] = useState(600);

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
    <Container className={classes.mainContainer}>
      <div>
        {sortingArray && actionBuffer && (
          <AlgoChart key={chartKey} sortingArray={sortingArray} actionBuffer={actionBuffer} stepTime={stepTime} />
        )}
        <Button onClick={() => randomizeArray()} color={'primary'}>
          Randomize Array
        </Button>
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
