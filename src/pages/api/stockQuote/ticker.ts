import yf from 'yahoo-finance2'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { ticker, strike, optiontype, exp } = req.query

	const results = await getCalc(ticker, strike, exp, optiontype)
	res.status(200).json(results)
}


function blackScholes(s: number, k: number, t: number, v: number, r: number, ty: 'call' | 'put') {
	const d1 = (Math.log(s / k) + (r + v * v / 2) * t) / (v * Math.sqrt(t));
	const d2 = d1 - v * Math.sqrt(t);

	if (ty === 'call') {
		return s * stdNormCDF(d1) - k * Math.exp(-r * t) * stdNormCDF(d2);
	} else {
		return k * Math.exp(-r * t) * stdNormCDF(-d2) - s * stdNormCDF(-d1);
	}
}

// Standard normal cumulative distribution function
function stdNormCDF(x: number) {
	let probability = 0;

	if (x >= 8) {
		probability = 1;
	} else if (x <= -8) {
		probability = 0;
	} else {
		for (let i = 0; i < 100; i++) {
			probability += (Math.pow(x, 2 * i + 1) / doubleFactorial(2 * i + 1));
		}
		probability *= Math.pow(Math.E, -0.5 * Math.pow(x, 2));
		probability /= Math.sqrt(2 * Math.PI);
		probability += 0.5;
	}
	return probability;
}

// Double factorial function
function doubleFactorial(n: number) {
	let val = 1;
	for (let i = n; i > 1; i -= 2) {
		val *= i;
	}
	return val;
}

const getCalc = async (TICKER, STRIKE, EXP, OPTION_TYPE: 'call' | 'put') => {
	const results = await yf.chart(TICKER, { period1: "2020-01-01" })
	const price = await yf.quote(TICKER)
	const data = results.quotes
	let changeData: number[] = []
	let average = 0;
	for (let index = 0; index + 1 < data.length; index++) {
		const element = data[index + 1]!.close;
		const change = (((element - data[index].close) / data[index].close));

		average += change
		changeData.push(change)
	}
	average /= changeData.length
	let std = 0;
	for (let i = 0; i < changeData.length; i++) {
		std += Math.pow(changeData[i]! - average, 2);
	}
	std = Math.sqrt(std / (changeData.length));
	std = std * Math.sqrt(250);

	let calc = {
		ticker: TICKER,
		price: blackScholes(price!.regularMarketPrice, STRIKE, EXP / 365, std, 0.05, OPTION_TYPE),
		date: data[data.length - 1]?.date
	}

	return calc;
}
