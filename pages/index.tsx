import BillBoard from '@/components/billBoard'
import { Metadata } from 'next'
import Navbar from '@/components/navbar'
import useCurrentUser from '@/hooks/userCurrentUser'
import { NextPageContext } from 'next'
import { getSession, signOut } from 'next-auth/react'
import MoviesList from '@/components/moviesList'
import useMoviesList from '@/hooks/useMoviesList'
import { useEffect } from 'react'

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default function Home() {
  const { data: user } = useCurrentUser()
  const { data: movies = [] } = useMoviesList()

  return (
    <>
      <Navbar username={user && user.name} />
      <BillBoard />
      <div className='pb-40'>
        <MoviesList title='Trending Now' data={movies} />
      </div>
    </>
  )
}
