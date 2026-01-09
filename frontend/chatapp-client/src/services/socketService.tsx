import type { ClientEvent } from '../types/type';

let socket: WebSocket | null = null;

export const connect = (onMessage: (data: any) => void, onStatusChange: (open: boolean) => void) => {
    if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
        return socket;
    }
    socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => onStatusChange(true);
    socket.onclose = () => onStatusChange(false);
     

    socket.onmessage = (event) => {
    const serverEvent = JSON.parse(event.data);
    
    if (serverEvent.event === "room:message") {
    const { id, username, text } = serverEvent.data;

    onMessage({
      id,
      sender: username,
      text,
      self: false
    });
  }
};


    socket.onerror = (error) => {
        console.error("WebSocket Error:", error);
    };

    return socket;
};
export const sendMessage = (data: ClientEvent) => {
    if (socket?.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(data));
    } else {
        console.warn("Could not send: Socket not connected");
    }
};