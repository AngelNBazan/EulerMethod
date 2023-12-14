import yf from 'yahoo-finance2'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { ticker } = req.query
	const results = await yf.quote(ticker!);

	res.status(200).json(results)
}
