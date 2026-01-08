import { WebSocketServer } from "ws";
import { chatController } from "./controllers/ChatController";
import { UserRepository } from "./repositories/UserRepository";

const wss = new WebSocketServer({ port: 8080 });
const userRepo = UserRepository.getInstance();

wss.on("connection", (socket) => {
    socket.on("message", (data) => {
        chatController(socket, data.toString());
    });

    socket.on("close", () => {
        userRepo.remove(socket);
    });
});