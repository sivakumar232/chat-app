import { WebSocket } from "ws";
import { ChatService } from "../services/ChatService";
import { ClientEvent } from "../types";

export const chatController = (socket: WebSocket, raw: string) => {
  // joining the room
// {
//   "event": "room:join",
//   "payload": {
//     "roomId": "global",
//     "username": "siva"
//   }
// }

//sending meesage
// {
//   "event": "room:message",
//   "payload": {
//     "roomId": "global",
//     "text": "hello"
//   }
// }



  try {
    const data: ClientEvent = JSON.parse(raw);
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
