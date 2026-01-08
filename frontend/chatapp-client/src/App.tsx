import { useEffect, useState } from 'react'
import ChatScreen from './components/ChatScreen'
import { Join } from './components/JoinScreen';
import {connect,sendMessage} from "./services/socketService"
function App() {
  const [isConnected,setIsconnected]=useState(false);
  const [isJoined,setIsjoined]=useState(false);
  const [message,setMessage]=useState("");
  const [messages,setMessages]=useState<string[]>([]);
  const [username,setUsername]=useState("");

  useEffect(()=>{
    const socket=connect();
    return ()=>{
      socket.close();
    };  
  },[])
  
  return (
    <div className='bg-yellow-50 min-h-screen'>
      {
        isConnected?<div className='p-4 postion-absolute text-green-600 max-w-[200px] top-2 left-2'>Connected</div>:<div className='p-3 text-red-600 max-w-[200px] postion-absolute '>Not Connected</div>
      }
      {isJoined?<ChatScreen/>:<Join/>}
    </div>
  )
};

export default App
