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
      {isJoined?<ChatScreen/>:<Join/>}
    </div>
  )
};

export default App
