import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
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
          family: "monospace",
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
          family: "monospace",
        }
      }
    },
  },
  plugins: {
    legend: {
      labels: {
        color: '#e5e5e5',
        font: {
          family: "monospace",
        }
      }
    },
    tooltip: {
      color: '#e5e5e5',
      bodyFont: {
        family: "monospace",
      },
      titleFont: {
        family: "monospace",
      }
    }
  }
};

interface IChart {
  price: number,
  date: Date,
}

export default function Ticker() {
  const router = useRouter()
  const { ticker, strike, exp, optiontype } = router.query

  console.log(ticker, strike, exp, optiontype);


  const [data, setData] = useState([] as IChart[])
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/api/stockChart/ticker?ticker=${ticker}&strike=${strike}&optiontype=${optiontype}&exp=${exp}`)
      const newData = await response.json()
      setData(newData)
    }
    fetchData()
  }, [])
  const dates = data.map((el) => el.date.toString().substring(0, 10));
  const prices = data.map((el) => el.price)
  let chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Date',
        data: prices,
        fill: false,
        backgroundColor: '#1f70ff',
        borderColor: '#0050e6',
      },
    ],
  }

  return (
    <Line data={chartData} options={options}></Line>
  )
};
