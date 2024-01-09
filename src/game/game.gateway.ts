import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway()
export class GameServerGateway {
  @SubscribeMessage('user-input')
  handleUserInput(data: any) {
    console.log(data);
    return data;
  }

  @SubscribeMessage('start')
  startGame(@MessageBody() data: any) {
    console.log(data);
    return data;
  }
}
