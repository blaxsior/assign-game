import {io} from 'socket.io-client';

import { GameScreenView } from './view/screen/GameScreenView.js';
import { connectSocket } from './ws/websocket.js';

import type { Packet } from './interface/packet.js';

function main() {
  const canvas = document.querySelector('canvas')!;
  const gameScreenView = new GameScreenView(canvas);

  const socket = io('http://localhost:8001');

  socket.on('connect', () => {
    console.log('connected');
    socket.emit('init');
  });

  socket.on('init', (message: string) => {
    console.log(message);
    socket.emit("run");
  });

  socket.on('run', (data: Packet) => {
    gameScreenView.render(data.objects);
  });

  socket.on('game over', () => {
    console.log('game over!');
  });
}

main();
connectSocket();
