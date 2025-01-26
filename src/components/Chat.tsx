"use client";

import React, { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
//import { generateChatHuggingFaceResponse } from "@/actions/chat/chatHuggingFaceActions";
import { generateChatResponse } from "@/actions/chat/chatActions";
import { useAuth } from "@clerk/nextjs";
import { fetchUserTokensByID, subtractTokens } from "@/actions/token/tokenActions";


// 메시지 타입 정의
type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

//const AI_TYPE = "DialoGPT-medium";

const Chat: React.FC = () => {
  const {userId} = useAuth();
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
    
    mutationFn: async (query: Message): Promise<string | null> => {
      if (!userId) {
          toast.error("사용자 정보를 확인할 수 없습니다.");
          return null; // undefined 대신 null 반환
      }
  
      try {
          const currentTokens = await fetchUserTokensByID(userId);
          if (!currentTokens) {
              toast.error("토큰 정보를 가져오지 못했습니다.");
              return null; // undefined 대신 null 반환
          }
  
          if (currentTokens < 200) {
              toast.error("현재 보유하고 있는 토큰값이 적습니다.");
              return null; // undefined 대신 null 반환
          }
  
          const responseData = await generateChatResponse([...messages, query]);
          if (!responseData) {
              toast.error("응답을 생성하지 못했습니다. 잠시 후 다시 시도해주세요.");
              console.error("Chat response generation failed.");
              return null; // undefined 대신 null 반환
          }
  
          const { message, tokens } = responseData;
          console.log("API Response && : ", tokens, message);
  
          const remainingTokens = await subtractTokens(userId, tokens);
          if (remainingTokens === null || remainingTokens === undefined) {
              toast.error("토큰 차감에 실패했습니다.");
              console.error("Token subtraction failed.");
              return null; // undefined 대신 null 반환
          }
  
          toast.success(`${remainingTokens} 토큰이 남았습니다.`);
          return message?.content || null; // 항상 null 또는 string 반환
      } catch (error) {
          console.error("Unexpected error in mutationFn:", error);
          toast.error("처리 중 문제가 발생했습니다.");
          return null; // undefined 대신 null 반환
      }
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
      
        {messages.map(({role,content }, index) => {
          const avatar =role =='user' ? '👤' : '🤖';

          return (<div
            key={index}
            className={`p-4 rounded-lg mb-2 ${
              role === "user"
                ? "bg-base-100 text-black text-right"
                : "bg-base-200 text-black"
            }`}
          >
            {role === "user" ? <><span className="mr-2">{avatar}</span> {content}</> : 
                        <>
                        <span className="mr-4">{avatar}</span> 
                        <p className="max-w-3xl">{content}</p>
                    </>            
            }
                
          </div>
          );
        })}

          {isPending ?<span className="loading"></span> :null}      
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
