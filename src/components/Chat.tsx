"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { generateChatResponse } from "@/actions/chat/chatActions";
import toast from "react-hot-toast";

// 메시지 타입 정의
type Message = {
  role: "user" | "assistant" | "system"; // 메시지 역할을 나타냄
  content: string; // 메시지 내용
};

const Chat: React.FC = () => {
  // 입력 필드의 값을 관리하기 위한 상태
  const [text, setText] = useState<string>("");

  // 대화 메시지 배열을 관리하기 위한 상태
  const [messages, setMessages] = useState<Message[]>([]);

  // `useMutation`을 사용하여 API 호출 로직 정의
  const { mutate, isPending, isError } = useMutation<string | null, Error, Message>({
    mutationFn: async (query) => {
      // `generateChatResponse` 함수 호출
      const response = await generateChatResponse([...messages, query]);
      return response?.content || null; // 응답 내용 반환
    },
    onSuccess: (response) => {
      // API 호출 성공 시 처리
      if (!response) {
        toast.error("Something went wrong..."); // 오류 알림 표시
        return;
      }
      // assistant의 응답을 메시지 배열에 추가
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    },
    onError: (error) => {
      // API 호출 중 오류 발생 시 처리
      console.error("Error occurred:", error);
      toast.error("API 요청 중 오류가 발생했습니다."); // 오류 알림 표시
    },
  });

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출 기본 동작 방지
    if (!text.trim()) return; // 공백 입력 방지

    const query: Message = { role: "user", content: text }; // 유저 메시지 생성
    setMessages((prev) => [...prev, query]); // 메시지 배열에 유저 메시지 추가
    mutate(query); // API 호출
    setText(""); // 입력 필드 초기화
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
      {/* 메시지 목록 영역 */}
      <div>
        <h2 className="text-5xl">Messages</h2>
        <div className="pt-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg mb-2 ${
                message.role === "user"
                  ? "bg-blue-500 text-white text-right" // 유저 메시지는 오른쪽 정렬
                  : "bg-gray-200 text-black" // assistant 메시지는 왼쪽 정렬
              }`}
            >
              {message.content}
            </div>
          ))}
        </div>
      </div>

      {/* 입력 폼 영역 */}
      <form onSubmit={handleSubmit} className="max-w-4xl pt-12">
        <div className="join w-full">
          <input
            type="text"
            placeholder="GeniusGPT 메시지 보내기..." // 입력 필드 안내 문구
            className="input input-bordered join-item w-full" // Tailwind CSS 스타일 클래스
            value={text} // 입력 값 바인딩
            required // 입력 필수 지정
            onChange={(e) => setText(e.target.value)} // 입력 값 변경 핸들러
          />
          <button
            className="btn btn-primary join-item" // Tailwind CSS 버튼 스타일
            type="submit"
            disabled={isPending} // API 요청 중 버튼 비활성화
          >
            {isPending ? "질문 중..." : "질문하기"} 
          </button>
        </div>
      </form>

      {/* 에러 메시지 표시 */}
      {isError && (
        <div className="text-red-500 mt-4">
          <p>에러가 발생했습니다. 다시 시도해 주세요.</p>
        </div>
      )}
    </div>
  );
};

export default Chat;
