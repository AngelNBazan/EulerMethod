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

const stockHistoricalData = async (ticker: string) => {
  const stockPriceDataJSON = await fetch(`https://eulermethod.vercel.app/api/stockChart/${ticker}`)
  const data = await stockPriceDataJSON.json()
  return data;

}
interface IChart {
  price: number,
  date: Date
}

export default function Ticker() {
  const router = useRouter()
  const { ticker } = router.query.ticker
  console.log(ticker);


  const [data, setData] = useState([] as IChart[])
  useEffect(() => {
    stockHistoricalData(ticker).then(res => setData(res))
  }, [])
  const dates = data.map((el) => el.date)
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
  };


  stockHistoricalData(ticker)
  return (
    <div className={`min-h-screen bg-neutral-950 text-neutral-100 font-mono sm:p-8`}>STOCK: {ticker}

    </div>
  )
}
