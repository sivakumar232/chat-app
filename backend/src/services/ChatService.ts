import { WebSocket } from "ws";
import crypto from "crypto";
import { UserRepository } from "../repositories/UserRepository";

const userRepo = UserRepository.getInstance();

export class ChatService {
    public static handleJoin(socket: WebSocket, username: string) {
        const newUser = {
            userid: crypto.randomUUID(),
            socket,
            username
        };
        userRepo.save(newUser);
        console.log("Users updated:", userRepo.getAll().length);
    }

    public static broadcastMessage(socket: WebSocket, content: string) {
        const sender = userRepo.findBySocket(socket);
        if (!sender) return;

        const payload = JSON.stringify({
            type: "message",
            message: content,
            username: sender.username
        });

        userRepo.getAll().forEach(client => {
            if (client.socket.readyState === WebSocket.OPEN) {
                client.socket.send(payload);
            }
        });
    }
}