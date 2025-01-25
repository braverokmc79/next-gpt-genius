import { fetchOrGenerateTokens } from '@/actions/token/tokenActions';
import { UserProfile } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server';
//import { currentUser } from '@clerk/nextjs/server';
import React from 'react'


const PorfilePage:React.FC = async() => {
//  const user = await currentUser();
  const authResult = await auth();
  const userId = authResult.userId as string;
  const currentTokens=await fetchOrGenerateTokens(userId);

  return (
    <div className='flex   flex-col items-center'>
      <h2 className="w-full mb-8 ml-8 text-xl font-extrabold">
            Token Amount: {currentTokens}
      </h2>
      <div className="flex justify-center">
        <UserProfile routing="hash"  />
       </div> 
    </div>
  )
}

export default PorfilePage;