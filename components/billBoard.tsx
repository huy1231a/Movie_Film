import React, { useCallback } from 'react'

import useBillboard from '@/hooks/userBillBoard'

const Billboard: React.FC = () => {
  const { data } = useBillboard()

  return (
    <div className='relative h-[56.25vw]'>
      <video
        poster={data?.thumbnailUrl}
        className='w-full h-[56.25vw] object-cover brightness-[60%] transition duration-500'
        autoPlay
        muted
        loop
        src={data?.videoUrl}></video>
    </div>
  )
}
export default Billboard
