"use client";

import React, { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { generateChatHuggingFaceResponse } from "@/actions/chat/chatHuggingFaceActions";

// 메시지 타입 정의
type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

const AI_TYPE = "DialoGPT-medium";

const Chat: React.FC = () => {
  const [text, setText] = useState<string>(""); // 입력 필드 상태
  const [messages, setMessages] = useState<Message[]>([]); // 메시지 목록 상태

  const messageListRef = useRef<HTMLDivElement | null>(null); // 메시지 리스트 DOM 참조

  // 메시지 추가 시 자동 스크롤 처리
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const { mutate, isPending, isError } = useMutation<string | null, Error, Message>({
    mutationFn: async (query) => {
      const response = await generateChatHuggingFaceResponse([...messages, query]);
      console.log("API Response: ", response);
      if (AI_TYPE === "DialoGPT-medium") return response || null;
      return response?.content || null;
    },
    onSuccess: (response) => {
      if (!response) {
        toast.error("Something went wrong...");
        return;
      }
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    },
    onError: (error) => {
      console.error("Error occurred:", error);
      toast.error("API 요청 중 오류가 발생했습니다.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const query: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, query]);
    mutate(query);
    setText("");
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
      {/* 메시지 목록 영역 */}
      <div ref={messageListRef} 
       className="overflow-y-auto flex-1 p-4"
       style={{ maxHeight: "calc(100vh - 12rem)" }} // 동적으로 높이 설정
     >
      
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg mb-2 ${
              message.role === "user"
                ? "bg-blue-500 text-white text-right"
                : "bg-gray-200 text-black"
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>

      {/* 입력 폼 영역 */}
      <form onSubmit={handleSubmit} className="max-w-4xl pt-4">
        <div className="join w-full">
          <input
            type="text"
            placeholder="메시지 입력..."
            className="input input-bordered join-item w-full"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <button
            type="submit"
            className="btn btn-primary join-item"
            disabled={isPending}
          >
            {isPending ? "전송 중..." : "보내기"}
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
