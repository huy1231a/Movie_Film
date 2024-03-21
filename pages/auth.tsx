import axios from 'axios'
import Button from '@/components/button'
import Input from '@/components/input'
import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'

const Auth = () => {
  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isValid, setIsValdid] = useState<string>('login')

  const toggleVariant = useCallback(() => {
    setIsValdid((currentValid) =>
      currentValid === 'login' ? 'register' : 'login'
    )
  }, [])

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        name,
        password,
      })
    } catch (error) {}
  }, [email, password, name])

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/profiles',
      })
    } catch (error) {
      console.log(error)
    }
  }, [email, password])

  return (
    <div className='relative h-full w-full  bg-[url("/images/hero.jpg")] bg-no-repeat bg-center bg-fixed bg-cover'>
      <div className='bg-black w-full h-full lg:bg-opacity-50'>
        <nav className='px-12 py-5 '>
          <Image src={'/images/logo.png'} alt='logo' width={250} height={250} />
        </nav>
        <div className='flex justify-center'>
          <div className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>
            <h2 className='text-white text-4xl mb-8 font-semibold'>
              {isValid === 'login' ? 'Sign in' : 'Register'}
            </h2>
            <div className='flex flex-col gap-4'>
              {isValid === 'register' && (
                <Input
                  id='name'
                  label='Name'
                  onChange={(e: any) => {
                    setName(e.target.value)
                  }}
                  value={name}
                  type='name'
                />
              )}
              <Input
                id='email'
                label='Email'
                onChange={(e: any) => {
                  setEmail(e.target.value)
                }}
                value={email}
                type='email'
              />
              <Input
                id='password'
                label='Password'
                onChange={(e: any) => {
                  setPassword(e.target.value)
                }}
                value={password}
                type='password'
              />
              <div className='mt-10'></div>
              <Button
                contend={`${isValid === 'login' ? 'Login' : 'Register'}`}
                bg='bg-red-600'
                bgHover='bg-red-700'
                textCl='text-white'
                onClick={isValid ? login : register}
              />
              {isValid === 'login' && (
                <>
                  <p className='text-center text-neutral-500'>OR</p>
                  <div className='flex flex-row items-center gap-4 justify-center'>
                    <div
                      onClick={() =>
                        signIn('google', { callbackUrl: '/profiles' })
                      }
                      className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'>
                      <FcGoogle size={32} />
                    </div>
                    <div
                      onClick={() =>
                        signIn('facebook', { callbackUrl: '/profiles' })
                      }
                      className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'>
                      <FaFacebook size={32} className='text-blue-600' />
                    </div>
                  </div>
                </>
              )}

              <p className='text-neutral-500 mt-12'>
                {isValid === 'login' ? 'First using Move.moe?' : 'Already'}
                <span
                  onClick={toggleVariant}
                  className='text-white ml-1 font-semibold hover:underline cursor-pointer'>
                  {isValid === 'login' ? 'Create account' : 'Login'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
