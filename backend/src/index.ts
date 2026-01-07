import {WebSocketServer} from "ws";

const wss=new WebSocketServer({port:8080});

let userCount=0;
wss.on("connection",(socket)=>{
    userCount++;
    console.log("user connected",userCount);
    let socketId="user"+Math.random()
    socket.onmessage=(e)=>{
        console.log("message",e.data)
        setTimeout(()=>{
            wss.clients.forEach((client)=>{
                client.send(e.data+"from"+socketId);
            })

        },1000)
    }
})

