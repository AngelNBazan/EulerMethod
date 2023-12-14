import { useState } from "react"
import { JetBrains_Mono } from "next/font/google"
import Head from "next/head"
import * as math from "mathjs"
import UserInput from "~/components/UserInput";
import DEChart from "~/components/DEChart";
import DETable from "~/components/DETable";
import UserInputFunction from "~/components/UserInputFunction";

const globalFont = JetBrains_Mono({ subsets: ['latin'] })
export default function Home() {
  const [mathStr, setmathStr] = useState("4-t+2y")
  const [y0, sety0] = useState("1")
  const [numSteps, setnumSteps] = useState("10")
  const [stepSize, setstepSize] = useState("0.1")
  const [yValues, setyValues] = useState<number[]>([])
  const [exactFunc, setExactFunc] = useState("-7/4+(1/2)t+(11/4)e^(2t)")
  const [exactData, setExactData] = useState<number[]>([])


  const handleMath = () => {
    setyValues(eulerMethod(mathStr, numSteps, stepSize, y0));
    if (exactFunc) {
      console.log("EXACT FUNT");
      setExactData(getExactData(exactFunc, numSteps, stepSize))
    }
    else
      setExactData([])
  }
  const errorData = percentErrorDiff(yValues, exactData)

  return (
    <>
      <Head>
        <title>Euler Method</title>
        <meta name="description" content="Euler's Method App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`min-h-screen bg-neutral-950 text-neutral-100 font-mono sm:p-8`}>
        <h1 className="text-xl sm:text-3xl text-center font-semibold p-8 sm:p-0 sm:pb-4">Differenital Equation: Euler's Method</h1>
        {yValues.length > 1 && <DEChart yValues={yValues} exactData={exactData} stepSize={stepSize} />}

        <div className="flex items-center justify-evenly sm:p-4">
          {/* Inputs from user */}
          <UserInput labelTitle={"Step Size: "} value={stepSize} setValue={setstepSize} />
          <UserInput labelTitle={"Y0: "} value={y0} setValue={sety0} />
          <UserInput labelTitle={"N Steps: "} value={numSteps} setValue={setnumSteps} />
        </div>
        <div className="flex items-center justify-evenly sm:p-4">
          <UserInputFunction labelTitle={"dy/dt: "} value={mathStr} setValue={setmathStr} />
          <UserInputFunction labelTitle={"Exact dy/dx: "} value={exactFunc} setValue={setExactFunc} />
        </div>
        <div className="flex items-center justify-center my-4 sm:mb-8">
          <button className="border border-neutral-100 w-1/2 h-10 px-2" onClick={handleMath}>Evaluate</button>
        </div>
        <div className="overflow-x-scroll w-full">
          {(yValues.length > 1) &&
            <DETable yValues={yValues} errorData={errorData} exactData={exactData} stepSize={stepSize} />
          }
        </div>
      </main>
      <footer className={`bg-neutral-950 text-neutral-50 ${globalFont.className} border-t text-center border-neutral-100 p-2 text-xs`} >
        Created by Angel Bazan
      </footer>
    </>
  );
}

function getExactData(mathStr: string, numSteps: string, stepSize: string) {
  const arr: number[] = [];
  for (let i = 0; i < parseFloat(numSteps) + 1; i++) {
    arr.push(formatFloat(math.evaluate(mathStr, { t: i * parseFloat(stepSize) })))
  }
  return arr;
}

function eulerMethod(mathStr: string, numSteps: string, stepSize: string, y0: string): number[] {
  let yN: number = parseFloat(y0);
  let f0: number;
  const arr: number[] = [];
  arr.push(parseFloat(y0));
  for (let i = 0; i < parseFloat(numSteps); i++) {
    f0 = parseFloat(math.evaluate(mathStr, { y: yN, t: ((parseFloat(stepSize)) * i) }))
    yN = parseFloat(math.evaluate("yN+f0*t", { yN: yN, f0: f0, t: stepSize }))
    arr.push(formatFloat(yN));
  }
  return arr;
}

function percentErrorDiff(eulerData: number[], exactData: number[]) {
  let arr = [];
  for (let i = 0; i < eulerData.length; i++) {
    arr.push((eulerData[i]! - exactData[i]!) / eulerData[i]!)
  }
  return arr;
}
//Fix any float point errors, upto 6 decimal places
function formatFloat(value: number, decimalPlaces = 6) {
  return parseFloat(value.toFixed(decimalPlaces));
}
