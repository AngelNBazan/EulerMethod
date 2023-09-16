import React from 'react'

interface DETableProps{
  yValues:number[],
  exactData?:number[],
  errorData?:number[],
  stepSize:string,
}

//Fix any float point errors, upto 6 decimal places
function formatFloat(value:number, decimalPlaces = 6) {
  return parseFloat(value.toFixed(decimalPlaces));
}

export default function DETable({yValues, exactData, errorData, stepSize}:DETableProps) {
    return (
      <>
        {/* Table to display yN values */}
        <table className="border border-neutral-100 m-auto w-full">
          <thead>
            <tr className="border border-neutral-100">
              <th className="border-r border-neutral-100">Index (tn)</th>
              <th className='border-r border-neutral-100'>yN Value</th>
              {!Number.isNaN(errorData[0]) && (
                <>
                  <th className='border-r border-neutral-100'>Exact</th>
                  <th className='border-r border-neutral-100'>Error Difference (%)</th>
                </>)
              }
            </tr>
          </thead>
          <tbody className=''>
            {yValues.map((yValue, index) => (
              <tr key={index}>
                <td className="text-center border-neutral-100 border-r">{formatFloat(index * parseFloat(stepSize))}</td>
                <td className="border-r border-neutral-100 px-5">{yValue}</td>
                {!Number.isNaN(errorData[0]) &&(
                  <>
                    <td className="px-5 border-r border-neutral-100">{exactData[index]}</td> 
                    <td className="text-center">{(errorData[index] * 100).toFixed(2)}%</td> 
                  </>
                  )
                }
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
}
