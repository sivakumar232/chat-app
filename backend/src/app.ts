import { WebSocketServer } from "ws";
import { chatController } from "./controllers/ChatController";
import { UserRepository } from "./repositories/UserRepository";
//on websocket server
const wss = new WebSocketServer({ port: 8080 });
const userRepo = UserRepository.getInstance();


wss.on("connection", (socket) => {
    //when message is received 
    socket.on("message", (data) => {
        chatController(socket, data.toString());
    });

    socket.on("close", () => {
        userRepo.remove(socket);
    });
});