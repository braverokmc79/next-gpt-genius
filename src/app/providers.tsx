"use client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast';


interface ProvidersProps{
  children:React.ReactNode
}


const Providers:React.FC<ProvidersProps> = ({children}) => {
  const [queryClient] =useState(()=>{
    return new QueryClient({
      defaultOptions: {
        queries: {
          //데이터를 캐싱한 후 1분 동안 동일한 쿼리에 대해 다시 요청하지 않음.
          staleTime: 60*1000, // 데이터 유효 시간: 1분
        },
      },
    })
  });


  return (
    <QueryClientProvider client={queryClient}>
       <Toaster position='top-center'  /> 
        {children}
      <ReactQueryDevtools  initialIsOpen={false} />      
    </QueryClientProvider>
  )
}

export default Providers;