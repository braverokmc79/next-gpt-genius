import { UserButton } from '@clerk/nextjs';
import { auth, currentUser } from '@clerk/nextjs/server';
import React from 'react'

const MemberProfile:React.FC = async() => {
  const user=await currentUser();
  const {userId} =await auth();
  console.log(":유저 아이디 " ,userId);

  return (
    <div className="px-4 flex items-center gap-2">
      <UserButton />
      <p>
        {user?.emailAddresses[0].emailAddress}
      </p>
    </div>
  )
}

export default MemberProfile;
