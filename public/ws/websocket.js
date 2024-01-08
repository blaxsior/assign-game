import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";

export function connectSocket() {
    const socket = io("ws://localhost:3000");
    socket.connect();

    console.log(socket);
    socket.on("connect", () => {
        console.log("connected");
    });
    
    socket.emit("user-input", {data:[1,2,3]});
    socket.emit("user-input", {data:[2,2,2]});
    socket.emit("user-input", {data:[3,3,6]});
    socket.disconnect();
}