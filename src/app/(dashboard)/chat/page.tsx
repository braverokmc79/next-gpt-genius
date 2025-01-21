import Chat from '@/components/Chat';
import React from 'react'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';


const ChatPage:React.FC = () => {
  const queryClient =new QueryClient();
  
  return (
    //1.dehydrate QueryClient의 상태를 직렬화(Serialize)*
    //2.변환된 데이터를 HydrationBoundary의 state 속성을 통해 클라이언트에 주입.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Chat  />
    </HydrationBoundary>
  )


}

export default ChatPage;