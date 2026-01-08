
let socket: WebSocket | null = null;

export const connect = (onMessage: (data: any) => void, onStatusChange: (open: boolean) => void) => {
    if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
        return socket;
    }
    socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => onStatusChange(true);
    socket.onclose = () => onStatusChange(false);
    
    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        onMessage(data);
    };

    socket.onerror = (error) => {
        console.error("WebSocket Error:", error);
    };

    return socket;
};
export const sendMessage = (data: any) => {
    if (socket?.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(data));
    } else {
        console.warn("Could not send: Socket not connected");
    }
};