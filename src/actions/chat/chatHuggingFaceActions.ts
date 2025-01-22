"use server";
import axios from "axios";

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

export const generateChatHuggingFaceResponse = async (chatMessages: { role: string; content: string }[]) => {
  try {
    // 최신 사용자 메시지 추출
    const userMessage = chatMessages
      .reverse() // 배열 역순 정렬
      .find((msg) => msg.role === "user")?.content || "안녕하세요!";

    console.log("HUGGINGFACE_API_KEY: ", process.env.HUGGINGFACE_API_KEY);
    console.log("Hugging Face API 요청: ", userMessage);

    // DialoGPT 모델 호출 (캐시 방지용 타임스탬프 추가)
    const userMessageWithTimestamp = `${userMessage} [timestamp: ${Date.now()}]`;
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
      { inputs: userMessageWithTimestamp },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
          "Cache-Control": "no-cache",
        },
      }
    );

    // 응답 처리
    //console.log("1.응답 처리: ", response);
    console.log("2.응답 텍스트: ", response.data[0]?.generated_text);

    return response.data[0]?.generated_text || "응답을 생성하지 못했습니다.";
  } catch (error) {
    console.error("generateChatResponse error:", error);
    return null;
  }
};
