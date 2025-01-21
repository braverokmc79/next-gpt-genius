"use client";
import React, { useState } from "react";

const Chat: React.FC = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<{ text: string; user: string }[]>([]);

  const handleSubmit=(e:React.FormEvent)=>{
    e.preventDefault();
    setMessages([...messages, { text, user: "user" }]);
    setText("");
  }

  return (
        <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
            <div>
                <h2 className="text-5xl">messages</h2>                
            </div>

            <form onSubmit={handleSubmit} className="max-w-4xl pt-12">
                <div className="join w-full">
                    <input type="text" placeholder="GeniusGPT 메시지 보내기..."
                        className="input input-bordered join-item w-full"
                        value={text} required  onChange={(e)=>setText(e.target.value)}  />
                    <button className="btn btn-primary join-item" type="submit">
                        질문하기
                    </button>
                </div>
            </form>
        </div>
  );
};

export default Chat;
