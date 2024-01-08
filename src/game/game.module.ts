import { Module } from '@nestjs/common';
import { GameServerController } from './game.controller';
import { GameServerGateway } from './game.gateway';

@Module({
  imports: [],
  controllers: [GameServerController],
  providers: [GameServerGateway],
})
export class GameModule {}