import serverAuth from '@/lib/serverAuth'
import prismadb from '@/lib/prismadb'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'GET') {
      return res.status(400).end()
    }

    await serverAuth(req, res)

    const getMovies = await prismadb.movie.findMany()

    return res.status(200).json(getMovies)
  } catch (error) {
    console.log(error)
    return res.status(500).json('error get')
  }
}
