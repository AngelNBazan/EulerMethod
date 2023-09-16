import React from 'react'
//Plotting Library
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);
import { Line } from 'react-chartjs-2';

//Chart Config Options
const options = {
  scales: {
    x: {
      grid: {
        color: 'rgba(245,245,245,0.05)',  // Set grid color
      },
      ticks: {
        color: '#f5f5f5',  // Set ticks color
          font: {
          family: "'JetBrains Mono', monospace",
        }
      }
    },
    y: {
      grid: {
        color: 'rgba(245,245,245,0.05)',  // Set grid color
      },
      ticks: {
        color: '#f5f5f5',  // Set ticks color
          font: {
          family: "'JetBrains Mono', monospace",
        }
      }
    },
  },
    plugins:{
      legend:{
        labels:{
	  color: '#e5e5e5',
          font: {
            family: "'JetBrains Mono', monospace",
          }
        }
      },
      tooltip:{
	  color: '#e5e5e5',
          bodyFont: {
            family: "'JetBrains Mono', monospace",
          },
        titleFont:{
            family: "'JetBrains Mono', monospace",
        }
      }
    }
};

interface DEChartProps {
  yValues: number[];
  exactData?: number[];
  stepSize: string;
}

export default function DEChart({yValues, exactData, stepSize}:DEChartProps) {
  let data = {
    labels: yValues.map((_, index) => (index * parseFloat(stepSize)).toFixed(2)),  // Adjust the number of decimal places as needed
    datasets: [
      {
        label: 'yN Values',
        data: yValues,
        fill: false,
        backgroundColor: '#1f70ff',
        borderColor: '#0050e6',
      },
      {
        label: 'Exact Values',
        data: exactData,
        fill:false,
        backgroundColor: '#ee5396',
        borderColor: '#e3176f',
      }
    ],
  };

  return (
    <Line data={data} options={options}/>
  )
}
