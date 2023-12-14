import React, { useEffect } from 'react'
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
  fetch(`https://eulermethod.vercel.app/api/stockChart/${ticker}`)
}

export default function Ticker() {
  const router = useRouter()
  const ticker = (router.query.ticker);

  useEffect(() => {
  }, [])

  let data = {
  };

  stockHistoricalData(ticker as string)
  return (
    <div className={`min-h-screen bg-neutral-950 text-neutral-100 font-mono sm:p-8`}>STOCK: {ticker}</div>
  )
}
