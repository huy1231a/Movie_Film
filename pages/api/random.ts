import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    console.log('hi')

    return res.status(405).end()
  }

  try {
    // await serverAuth(req, res)
    console.log('vao day dc ko')

    const moviesCount = await prismadb.movie.count()
    const randomIndex = Math.floor(Math.random() * moviesCount)

    const randomMovies = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    })

    console.log('movies', randomMovies)

    return res.status(200).json(randomMovies[0])
  } catch (error) {
    console.log('movies')
    console.log('error', error)

    return res.status(500).end()
  }
}
