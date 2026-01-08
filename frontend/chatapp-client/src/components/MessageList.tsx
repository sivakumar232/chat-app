import React from 'react'

const MessageList = ({ messages }: { messages: any[] }) => {


  return (
    <div className="flex flex-col gap-4 p-4 overflow-y-auto max-h-[500px]">
      {messages.map((msg) => (
        <div 
          key={msg.id}
          className={`max-w-[80%] p-3 border-4 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
            msg.self 
              ? "self-end bg-[#00FF94] text-black" 
              : "self-start bg-white text-black"
          }`}
        >
          <div className="text-xs uppercase mb-1 underline">{msg.sender}</div>
          <p>{msg.text}</p>
        </div>
      ))}
    </div>
  )
}

export default MessageList