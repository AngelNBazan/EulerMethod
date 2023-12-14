import yf from 'yahoo-finance2'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {

	const { ticker } = req.query
	const results = await yf.chart(ticker as string, { period1: "2020-01-01" })
	console.log(results);

	res.status(200).json(results)
}
