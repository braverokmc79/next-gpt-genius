"use server";
import prisma from "@/utils/db";
import { revalidatePath } from "next/cache";


interface TokenDTO{
    clerkId: string;
    tokens :number;
}


//1.토큰 조회 함수
export const fetchUserTokensByID = async (clerkId:string) => {
  const result = await prisma.token.findUnique({
    where: { clerkId },
  });
  return result?.tokens || null;
};




//2.토큰 생성 함수
export const generateUserTokensForID = async (clerkId:string) => {
  const result = await prisma.token.create({
    data: { clerkId },
  }) as TokenDTO;
  return result.tokens;
};




// 3. 토큰 조회 또는 생성 함수
export const fetchOrGenerateTokens = async (clerkId: string): Promise<number> => {
    const existingTokens = await fetchUserTokensByID(clerkId);
    if (existingTokens !== null) return existingTokens;
  
    return await generateUserTokensForID(clerkId);    
};

  

//4.토큰 차감 함수
export const subtractTokens = async (clerkId :string, tokens:number ) => {
    const result = await prisma.token.update({
      where: { clerkId },
      data: {
        tokens: {
          decrement: tokens,
        },
      },
    });
    revalidatePath('/profile'); // 프로필 페이지 토큰 정보 업데이트
    return result.tokens;
};

  
