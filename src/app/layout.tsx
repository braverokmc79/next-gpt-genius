import type { Metadata } from "next";
import { Geist,  Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignedIn,
  UserButton
} from '@clerk/nextjs'


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "700"], // 필요한 가중치 추가
});



export const metadata: Metadata = {
  title: "GPTGenius",
  description: `GPTGenius: GPTGenius는 당신의 AI 언어 동반자입니다.
    OpenAI 기술로 구동되며, 대화, 콘텐츠 제작 등을 한층 더 풍부하게 만들어 드립니다!`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="ko"> 
        <body className={`${geistSans.variable} ${notoSansKR.className} antialiased`}>
          <div className="flex justify-end">
          <SignedIn>
            <UserButton />
          </SignedIn>
          </div>
         {/* <SignedOut>
            <SignInButton />
           </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn> */}

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
