import { WebSocket } from "ws";
import { ChatService } from "../services/ChatService";
import { ChatMessage } from "../types";

export const chatController = (socket: WebSocket, message: string) => {
    try {
        const data: ChatMessage = JSON.parse(message);

        if (data.type === "join" && data.username) {
            ChatService.handleJoin(socket, data.username);
        }

        if (data.type === "message" && data.message) {
            ChatService.broadcastMessage(socket, data.message);
        }
    } catch (e) {
        console.error("Payload error:", e);
        socket.send(JSON.stringify({ type: "error", message: "Invalid format" }));
    }
};