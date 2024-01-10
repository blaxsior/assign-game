import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";

export function connectSocket() {
  const socket = io('http://localhost:3000');
  socket.connect();

  console.log(socket);
  socket.on('connect', () => {
    console.log('connected');
  });

  socket.on('run', (data) => {
    console.log(data);
  });

  socket.emit("user-input", { data: [1, 2, 3] });
  socket.disconnect();
}