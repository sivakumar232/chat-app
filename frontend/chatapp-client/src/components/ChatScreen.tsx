import React, { useState } from 'react'
import MessageList from './MessageList';

interface ChatProps {messages:any[],onSend:(text:string)=>void}
const Chat = ({ messages, onSend }: ChatProps) => {
  const [input, setInput] = useState("");
  const handlesend =()=>{
    onSend(input);
    setInput("");
  }
  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto  border-4 border-black bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
      
      {/* Messages Area */}
      <div className="bg-[#F0F0F0] p-4 overflow-y-auto min-h-[400px]">
        <MessageList messages={messages}/>
      </div>

      {/* Input Area */}
      <div className="border-t-4 border-black p-4 bg-white flex gap-3">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border-4 border-black p-3 font-bold outline-none focus:bg-yellow-50"
        />
        <button onClick={handlesend} className="border-4 border-black bg-white px-6 font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:bg-black active:text-white">
          Send
        </button>
      </div>

    </div>
  )
}

export default Chat