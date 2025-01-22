"use server";
// 서버 사이드 코드로 실행됨을 명시

import OpenAI from "openai";

// OpenAI 라이브러리를 사용하여 GPT 모델과 상호작용

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // 환경 변수에서 OpenAI API 키를 가져옴
});

// 입력 메시지 형식을 정의하는 인터페이스
interface GenerateChatResponseParams {
  role: "system" | "user" | "assistant"; // 메시지 역할: 시스템, 사용자, 또는 어시스턴트
  content: string; // 메시지 내용
}

// GPT-3.5 모델을 사용하여 채팅 응답을 생성하는 함수
export const generateChatResponse = async (chatMessages: GenerateChatResponseParams[]) => {
  try {
    // OpenAI API를 호출하여 채팅 완료 요청 생성
    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant" }, // 시스템 초기 메시지
        ...chatMessages, // 사용자가 제공한 메시지 배열 추가
      ],
      model: "gpt-3.5-turbo", // 사용할 GPT 모델 지정
      temperature: 0, // 생성 텍스트의 무작위성 조정 (0 = 결정론적)
    });

    // API 응답 출력 (디버깅 용도)
    console.log("API Response:", response);

    // 첫 번째 선택 항목의 메시지를 반환하거나 null 반환
    return response.choices[0].message || null;
  } catch (error) {
    // 오류 발생 시 로그 출력 및 null 반환
    console.error("generateChatResponse error:", error);
    return null;
  }
};
