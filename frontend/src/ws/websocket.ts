import {io} from 'socket.io-client';

export function connectSocket() {
  const socket = io('http://localhost:8001');

  socket.on('connect', () => {
    console.log('connected');
    socket.emit('init');
  });

  socket.on('run', (data) => {
    console.log(data);
  });

  socket.emit("run", { data: [1, 2, 3] });
}