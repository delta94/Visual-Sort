import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Chart from 'chart.js';

const useStyles = makeStyles(theme => ({
  chartContainer: {
    display: 'flex'
  }
}));

export type ActionBuffer = {
  type: 'swap' | 'compare';
  i: number;
  j: number;
};

interface AlgoChartProps {
  sortingArray: number[];
  actionBuffer: ActionBuffer[];
  stepTime: number;
}

// Colors for bar chart
const BAR_COLOR = '#55bae7';

export default function AlgoChart(props: AlgoChartProps) {
  const classes = useStyles({});
  const analyticChartRef = useRef<HTMLCanvasElement>(null);
  const [chart, setChart] = useState<Chart>();
  const [chartData, setChartData] = useState<number[]>();
  const [actionBuffer, setActionBuffer] = useState<ActionBuffer[]>();
  const [stepTime, setStepTime] = useState(400);
  let running = true;

  // Component did mount, mount the Chart onto canvas
  useEffect(() => {
    // Setup the Chart
    let myChartRef;
    if (analyticChartRef.current) {
      myChartRef = analyticChartRef.current.getContext('2d');
    }

    // Labels and Data
    let sortingData = props.sortingArray;
    let sortingLabels: string[] = [];
    let barColors: string[] = [];
    sortingData.forEach(() => {
      sortingLabels.push('');
      barColors.push(BAR_COLOR);
    });

    // Create our chart
    let tempChart = new Chart(myChartRef as any, {
      type: 'bar',
      data: {
        //Bring in data
        labels: sortingLabels,
        datasets: [
          {
            label: 'Value',
            data: props.sortingArray,
            fill: false,
            lineTension: 0,
            borderColor: '#0b1736',
            backgroundColor: barColors
          }
        ]
      },
      options: {
        //Customize chart options
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });

    setChart(tempChart);

    // When dismounting destroy char
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, []);

  // Comsumes the action buffer, and comapres / swaps elements
  const consumeActionBuffer = (arr: number[], actionBuffer: ActionBuffer[]) => {
    const buffer = actionBuffer[0];
    let colors: string[] = [];
    arr.forEach(() => {
      colors.push(BAR_COLOR);
    });
    if (buffer.type === 'swap') {
      let temp = arr[buffer.i];
      arr[buffer.i] = arr[buffer.j];
      arr[buffer.j] = temp;
    } else if (actionBuffer[0].type === 'compare' && actionBuffer.length > 1) {
      colors[buffer.i] = 'green';
      colors[buffer.j] = 'green';
    }

    // Remove action from buffer
    actionBuffer.shift();
    return { arr: arr, colors: colors };
  };

  // Steps through the buffer actions
  let stepBuffer = async (dataArr: number[], actionBuffer: ActionBuffer[], i: number) => {
    if (chart && running) {
      // Use our action buffer to sort the temp array in slow time
      let result = consumeActionBuffer(dataArr, actionBuffer);
      // If we have a dataset, update it
      if (chart.data.datasets) {
        chart.data.datasets[0].data = result.arr;
        chart.data.datasets[0].backgroundColor = result.colors;
      }
      chart.update();

      // If buffer contains actions, do them till were empty!
      if (actionBuffer.length > 0) {
        await new Promise(() => {
          setTimeout(() => stepBuffer(dataArr, actionBuffer, i + 1), stepTime);
        });
      }
    }
  };

  // When action buffer changes, animate the sorting sequence
  useEffect(() => {
    if (actionBuffer && chartData) {
      stepBuffer(chartData, actionBuffer, 0);
    }
  }, [actionBuffer]);

  // Resets data if sorting array changes
  useEffect(() => {
    setActionBuffer(props.actionBuffer);
    setChartData(props.sortingArray);
  }, [props.sortingArray]);

  // Changes step time
  useEffect(() => {
    setStepTime(props.stepTime);
  }, [props.stepTime]);

  return (
    <div className={classes.chartContainer}>
      <canvas id="analyticChart" ref={analyticChartRef} />
    </div>
  );
}
