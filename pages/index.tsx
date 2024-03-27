/* eslint-disable @next/next/no-img-element */
import BillBoard from '@/components/billBoard'
import Navbar from '@/components/navbar'
import useCurrentUser from '@/hooks/userCurrentUser'
import { Metadata, NextPageContext } from 'next'
import { getSession, signOut } from 'next-auth/react'
import MoviesList from '@/components/moviesList'
import useMovies from '@/hooks/useMovieList'
import useFavorites from '@/hooks/useFavorites'
import InfoModal from '@/components/infoModal'
import useInfoModalStore from '@/hooks/useInfoModal'
import Head from 'next/head'

export const metadata: Metadata = {
  title: 'Website Title',
  description: 'Website description',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/images/logo2.png',
        href: '/images/logo2.png',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/images/logo2.png',
        href: '/images/logo2.png',
      },
    ],
  },
}

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
  const { data: movies = [] } = useMovies()
  const { data: favorites = [] } = useFavorites()
  const { isOpen, closeModal } = useInfoModalStore()

  return (
    <>
      <Head>
        <title>Movie18.moe</title>
        <link rel='icon' href='/images/logo2.png' sizes='any' />
        <link rel='apple-touch-icon' href='/images/logo2.png' />
        <link rel='manifest' href='/images/logo2.png' />
        <metadata />
      </Head>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar username={user && user.name} />
      <BillBoard />
      <div className='pb-40'>
        <MoviesList title='Trending Now' data={movies} />
        <MoviesList title='My List' data={favorites} />
      </div>
    </>
  )
}
