'use client'
import axios from 'axios'
import React, { useCallback, useMemo } from 'react'
import { FaCheck, FaPlus } from 'react-icons/fa'
import useCurrentUser from '@/hooks/userCurrentUser'
import useFavorites from '@/hooks/useFavorites'

interface FavoriteButtonProps {
  movieId: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites()

  const { data: currentUser, mutate } = useCurrentUser()

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || []

    return list.includes(movieId)
  }, [currentUser, movieId])

  console.log('isFa', isFavorite)

  const toggleFavorites = useCallback(async () => {
    if (!currentUser) {
      console.log('User is not signed in')
      return
    }

    let response

    const headers = {
      'Content-Type': 'application/json',
      // Add any other necessary headers here
    }

    if (isFavorite) {
      response = await axios.delete('/api/favorite', {
        data: { movieId },
        headers,
      })
    } else {
      response = await axios.post(
        '/api/favorite',
        {
          movieId,
        },
        {
          headers,
        }
      )
    }

    const updatedFavoriteIds = response?.data?.favoriteIds

    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    })
    mutateFavorites()
    console.log('muate', mutateFavorites())
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites])

  const Icon = isFavorite ? FaCheck : FaPlus

  return (
    <div
      onClick={toggleFavorites}
      className='cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300'>
      <Icon className='text-white group-hover/item:text-neutral-300 w-4 lg:w-6' />
    </div>
  )
}

export default FavoriteButton
