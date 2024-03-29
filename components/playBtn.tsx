import React from 'react'
import { FaPlay } from 'react-icons/fa'
import { useRouter } from 'next/router'

interface PlayButtonProps {
  movieId: string
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter()
  return (
    <button
      onClick={() => router.push(`/watch/${movieId}`)}
      className='bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-sx lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transition cursor-pointer'>
      <FaPlay size={12} className='mr-2' />
      Play
    </button>
  )
}

export default PlayButton
