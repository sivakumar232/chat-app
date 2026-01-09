import { useEffect, useState } from 'react'
import ChatScreen from './components/ChatScreen'
import { Join } from './components/JoinScreen';
import {connect,sendMessage} from "./services/socketService"
import type { ChatMessage } from './types/type';

function App() {
  const [isConnected,setIsconnected]=useState(false);
  const [isJoined,setIsjoined]=useState(false);
  const [message,setMessage]=useState("");
  const [messages,setMessages]=useState<ChatMessage[]>([]);
  const [username,setUsername]=useState("");
  const [currentroom,setcurrentRoom]=useState("global");
  useEffect(()=>{
    const socket=connect(
      (data)=> setMessages((prev)=>[...prev,data]),
      (status)=> setIsconnected(status)
    );
    return ()=>{
      socket.close();
    };  
  },[])

 const handlejoin = (name: string,room: string) => {
  setUsername(name);
  sendMessage({event:"room:join",payload:{roomId:room,username:name}});
  setcurrentRoom(room);
  setIsjoined(true);
};

  const handlesend=(text:string)=>{
    sendMessage({event:"room:message",payload:{roomId:currentroom,text}});
  }

  return (
    <div className='bg-yellow-50 min-h-screen'>
      {
        isConnected?<div className='p-4 postion-absolute text-green-600 max-w-[200px] top-2 left-2'> ● Connected</div>:<div className='p-3 text-red-600 max-w-[200px] postion-absolute '>○ Disconnected</div>
      }
      {isJoined?<ChatScreen messages={messages} onSend={handlesend}/>:<Join onJoin={handlejoin}/>}
    </div>
  )
};

export default App
