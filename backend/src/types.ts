import { WebSocket } from "ws";

export interface UserSocket {
    userid: string;
    socket: WebSocket;
    username: string;
}

export interface ChatMessage {
    type: "join" | "message";
    username?: string;
    message?: string;
}