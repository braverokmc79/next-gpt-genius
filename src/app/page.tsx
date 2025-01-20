import Link from 'next/link'
import React from 'react'
import {SignedOut,  SignInButton,SignedIn} from '@clerk/nextjs'

const HomePage:React.FC = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
        <div className='hero-content text-center'>
            <div className='max-w-md'>
                <h1 className='text-6xl font-bold text-primary'>GPTGenius</h1>
                <p className='py-6 text-lg leading-loose'>
                GPTGenius: GPTGenius는 당신의 AI 언어 동반자입니다.
                OpenAI 기술로 구동되며, 대화, 콘텐츠 제작 등을 한층 더 풍부하게 만들어 드립니다!
                </p>
                 {/* <Link href='/chat' className='btn btn-secondary'>
                    <SignInButton    />
                </Link> 
                 */}
                <SignedOut>
                  <SignInButton>
                    <span  className='btn btn-secondary'>시작하기</span> 
                  </SignInButton>

                </SignedOut>
                
                <SignedIn>                 
                  <Link href='/chat' className='btn btn-primary'>
                      채팅 시작
                  </Link>                   
                </SignedIn>


            </div>
        </div>     
    </div>
  )

}

export default HomePage;