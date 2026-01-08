let socket: WebSocket | null = null;

export const connect = () => {
    if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
        return socket;
    }
    socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
        console.log("WebSocket Connected");
    };
    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("New Message:", data);
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