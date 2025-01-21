"use client";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { generateChatResponse } from "@/actions/chat/chatActions";

// 메시지 타입 정의
type Message = { text: string; user: string };

const Chat: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  // useMutation 설정 (타입 명시)
  const { mutate, isPending, isError } = useMutation<string, Error, string, boolean>({
    mutationFn: (message: string) => generateChatResponse(message), // mutationFn 타입 지정
    onSuccess: (response: string) => {
      // 성공 시 메시지 업데이트
      setMessages((prev) => [...prev, { text: response, user: "bot" }]);
    },

    onError: (error: Error) => {
      console.log("에러 발생:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    // 유저 메시지 추가
    setMessages((prev) => [...prev, { text, user: "user" }]);
    mutate(text); // API 호출
    setText(""); // 입력 초기화
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
      <div>
        <h2 className="text-5xl">Messages</h2>

        <div className="pt-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg mb-2 ${
                message.user === "user"
                  ? "bg-blue-500 text-white text-right"
                  : "bg-gray-200 text-black"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl pt-12">
        <div className="join w-full">
          <input
            type="text"
            placeholder="GeniusGPT 메시지 보내기..."
            className="input input-bordered join-item w-full"
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
          />

          <button
            className="btn btn-primary join-item"
            type="submit"
            disabled={isPending} // 로딩 중일 때 버튼 비활성화
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
