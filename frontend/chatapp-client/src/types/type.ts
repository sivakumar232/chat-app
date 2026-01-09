import { WebSocket } from "ws";

/* ------------------ User ------------------ */

export interface UserSocket {
  userId: string;
  socket: WebSocket;
  username: string;
  rooms: Set<string>;
}
export interface ChatMessage {
  id:string,
  sender:string,
  text:string,
  self:boolean
}
/* ------------------ Client → Server ------------------ */

export type ClientEvent =
  | {
      event: "room:join";
      payload: {
        roomId: string;
        username: string;
      };
    }
  | {
      event: "room:message";
      payload: {
        roomId: string;
        text: string;
      };
    };

/* ------------------ Server → Client ------------------ */

export type ServerEvent =
  | {
      event: "room:message";
      data: {
        id: string;
        roomId: string;
        username: string;
        text: string;
        timestamp: number;
      };
    }
  | {
      event: "system:error";
      message: string;
    }
  | {
      event: "system:info";
      message: string;
    };
