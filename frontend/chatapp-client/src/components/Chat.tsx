import React, { useEffect ,useRef} from 'react'
import { SendHorizontal } from 'lucide-react';
import { useState } from 'react';
const Chat = () => {
const wsRef = useRef<WebSocket | null>(null);
  const [message,setMessage]=useState("");
  const [messages,setMessages]=useState<string[]>([]);
  const [connection,setConnection]=useState(false);
    useEffect(()=>{
      if (wsRef.current) return;
        wsRef.current= new WebSocket("ws://localhost:8080");
        wsRef.current.onopen=()=>{
            console.log("connected")
            setConnection(true);
        }
        wsRef.current.onmessage=(e)=>{
            setMessages((prev) => [...prev, e.data]);
            console.log(e.data);  
        }
        wsRef.current.onclose=()=>{
            console.log("disconnected")
            setConnection(false);
        } 
    },[]) 

    const sendMessage=()=>{
        if(!wsRef.current) return;
        wsRef.current.send(message);
        setMessage("");
    }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className='absolute top-3 right-3'>
            <p>{connection?"Connected":"Disconnected"}</p>
        </div>
        <div className='p-4 space-y-4'>
          <div className='flex flex-col h-[400px]  gap-2 border overflow-y-scroll overflow-y-hidden border-gray-300 rounded p-2'>
          {
            messages.map((m,i)=>{
              return (
                <div className="border rounded p-2"key={i}>
                  <p >{m}</p>
                </div>
              )
            })
          }
          </div>
      <div className="flex items-center gap-2 bg-white p-4 rounded-xl shadow-md w-full max-w-md">

        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
                     value={message}
                     onChange={(e)=>setMessage(e.target.value)}
        />

        <button
          className="flex items-center justify-center gap-1 
                     bg-blue-500 hover:bg-blue-600 
                     text-white px-4 py-2 rounded-lg 
                     transition"
          onClick={sendMessage}
        >
          <SendHorizontal size={18} />
        </button>

      </div>
             </div>
    </div>
  )
}

export default Chat
