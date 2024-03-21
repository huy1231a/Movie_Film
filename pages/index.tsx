import BillBoard from '@/components/billBoard'
import { Metadata } from 'next'
import Navbar from '@/components/navbar'
import useCurrentUser from '@/hooks/userCurrentUser'
import { NextPageContext } from 'next'
import { getSession, signOut } from 'next-auth/react'

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

export const metaData: Metadata = {
  title: {
    absolute: '',
    default: 'Movies.moe',
    template: 's',
  },
  description: '',
}

export default function Home() {
  const { data: user } = useCurrentUser()
  return (
    <>
      <Navbar username={user && user.name} />
      <BillBoard />
    </>
  )
}
