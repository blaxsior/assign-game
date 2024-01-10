import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameManager } from '../game/GameManager';
import { setTimeout } from 'timers/promises';

@WebSocketGateway(8001, { cors: '*' })
export class GameServerGateway {
  constructor(private gameManager: GameManager) { }
  @WebSocketServer() server: Server;

  @SubscribeMessage('init')
  initGame() {
    this.gameManager.init();
    return { event: 'init', data: 'ready to game' };
  }

  @SubscribeMessage('input')
  userInput(@MessageBody() input: string) {
    console.log(input);
    // this.gameManager.onInput(input);
  }

  @SubscribeMessage('run')
  async runGame(@MessageBody() data: any) {
    console.log(data);
    while (!this.gameManager.isGameOver()) {
      const render_data = this.gameManager.run();
      this.server.emit('run', render_data);
      await setTimeout(25); // 40프레임
    }
    this.server.emit('game over');
  }
}
