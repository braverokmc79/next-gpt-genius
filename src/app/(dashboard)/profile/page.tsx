import { UserProfile } from '@clerk/nextjs'
import React from 'react'

const PorfilePage:React.FC = () => {
  return (
    <div className='flex justify-center'>
        <UserProfile routing="hash"  />
    </div>
  )
}

export default PorfilePage;