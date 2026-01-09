import { WebSocket } from "ws";
import { ChatService } from "../services/ChatService";
import { ClientEvent } from "../types";

export const chatController = (socket: WebSocket, raw: string) => {
  try {
    const data: ClientEvent = JSON.parse(raw);

// {
//   "event": "room:join",
//   "payload": {
//     "roomId": "global",
//     "username": "siva"
//   }
// }

    switch (data.event) {
      case "room:join": {
        const { roomId, username } = data.payload;
        ChatService.handleJoin(socket, roomId, username);
        break;
      }

      case "room:message": {
        const { roomId, text } = data.payload;
        ChatService.broadcastRoomMessage(socket, roomId, text);
        break;
      }
    }
  } catch (err) {
    socket.send(
      JSON.stringify({
        event: "system:error",
        message: "Invalid payload format"
      })
    );
  }
};
