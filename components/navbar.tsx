/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from 'react'
import NavbarItem from './navbarItem'
import { IoMdMenu } from 'react-icons/io'
import { BsSearch, BsBell } from 'react-icons/bs'
import MobileMenu from './mobileMenu'
import AccoutMenu from './accountMenu'
import { useRouter } from 'next/router'

interface NavbarProps {
  username: string
}
const TOP_OFFSET = 66

const Navbar: React.FC<NavbarProps> = ({ username }) => {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const [isAccount, setIsAccout] = useState(false)
  const [isBackGround, setIsBackGround] = useState(false)

  const toggleMobile = useCallback(() => {
    setIsMobile((current) => !current)
  }, [])

  const toggleAccoutImg = useCallback(() => {
    setIsAccout((current) => !current)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY)
      if (window.scrollY >= TOP_OFFSET) {
        setIsBackGround(true)
      } else {
        setIsBackGround(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav className='w-full fixed z-40'>
      <div
        className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${
          isBackGround ? 'bg-zinc-900 bg-opacity-90' : ''
        }`}>
        <img
          className='h-8 lg:h-10 cursor-pointer'
          src='/images/logo2.png'
          alt='logo'
          onClick={() => router.push('/')}
        />
        <div className='flex-row ml-8 gap-7 hidden lg:flex'>
          <NavbarItem label='Home' />
          <NavbarItem label='Series' />
          <NavbarItem label='Films' />
          <NavbarItem label='New & Popular' />
          <NavbarItem label='My List' />
          <NavbarItem label='Browser by languages' />
        </div>
        <div
          onClick={toggleMobile}
          className='lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative'>
          <IoMdMenu className='text-white transition' />
          <MobileMenu visible={isMobile} />
        </div>
        <div className='flex flex-row ml-auto gap-7 items-center'>
          <div className='text-gray-200 hover:text-gray-300 cursor-pointer'>
            <BsSearch />
          </div>
          <div className='text-gray-200 hover:text-gray-300 cursor-pointer'>
            <BsBell />
          </div>
          <div className='flex flex-row items-center gap-2 cursor-pointer relative'>
            <div
              className={`w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden ${
                isAccount
                  ? 'border-2 border-transparent group-hover:cursor-pointer border-white'
                  : ''
              }`}>
              <img
                src='/images/default-blue.png'
                alt=''
                onClick={toggleAccoutImg}
              />
              <AccoutMenu visible={isAccount} username={username} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
