import yf from 'yahoo-finance2'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { ticker } = req.query
	const summaryQuotes = await yf.quoteSummary(ticker as string, { modules: ['summaryProfile'] })
	console.log(summaryQuotes);
	res.status(200).json(summaryQuotes.summaryProfile)
}
