import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8080 });
let allsockets = [];
wss.on("connection", (socket) => {
    allsockets.push(socket);
    let socketId = "user" + Math.random();
    socket.onmessage = (e) => {
        console.log("message", e.data);
        setTimeout(() => {
            allsockets.forEach((s) => {
                s.send(e.data);
            });
        }, 1000);
    };
});
//# sourceMappingURL=index.js.map