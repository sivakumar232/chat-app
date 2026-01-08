import { WebSocketServer, WebSocket } from "ws";
import crypto from "crypto";
const wss = new WebSocketServer({ port: 8080 });
let userconnections = [];
wss.on("connection", (socket) => {
    socket.onmessage = (e) => {
        try {
            const message = e.data.toString();
            const data = JSON.parse(message);
            if (data.type === "join") {
                const user = {
                    userid: crypto.randomUUID(),
                    socket: socket,
                    username: data.username
                };
                userconnections.push(user);
                console.log(userconnections);
            }
            if (data.type === "message") {
                const sender = userconnections.find((user) => user.socket === socket);
                if (!sender)
                    return;
                userconnections.forEach((connection) => {
                    connection.socket?.send(JSON.stringify({
                        type: "message",
                        message: data.message,
                        username: sender.username
                    }));
                    console.log({
                        type: "message",
                        message: data.message,
                        username: sender.username
                    });
                });
            }
        }
        catch (e) {
            console.error(e);
            socket.send(JSON.stringify({ type: "error", message: "Invalid message" }));
        }
    };
});
//# sourceMappingURL=index.js.map