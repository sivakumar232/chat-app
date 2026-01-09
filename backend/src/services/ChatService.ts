import { WebSocket } from "ws";
import { randomUUID } from "crypto";
import { UserRepository } from "../repositories/UserRepository";
import { ServerEvent } from "../types";

const userRepo = UserRepository.getInstance();

export class ChatService {
  static handleJoin(
    socket: WebSocket,
    roomId: string,
    username: string
  ) {
    let user = userRepo.findBySocket(socket);

    if (!user) {
      user = {
        userId: randomUUID(),
        socket,
        username,
        rooms: new Set()
      };
      userRepo.save(user);
    }

    user.rooms.add(roomId);
  }

  static broadcastRoomMessage(
    socket: WebSocket,
    roomId: string,
    text: string
  ) {
    const sender = userRepo.findBySocket(socket);
    if (!sender) return;

    const message: ServerEvent = {
      event: "room:message",
      data: {
        id: randomUUID(),
        roomId,
        username: sender.username,
        text,
        timestamp: Date.now()
      }
    };

    userRepo.getUsersByRoom(roomId).forEach(user => {
      if (user.socket.readyState === WebSocket.OPEN && user.socket !== socket) {
        user.socket.send(JSON.stringify(message));
      }
    });
  }
}
