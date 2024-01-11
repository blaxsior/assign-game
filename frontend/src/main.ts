import { io } from 'socket.io-client';

import { GameView } from './view/GameView.js';
import { GameController } from './controller/GameController.js';

function main() {
  const gameContainer = document.querySelector('#gameContainer') as HTMLDivElement;
  const gameView = new GameView(gameContainer, { width: 1000, height: 800 });

  const socket = io('http://localhost:8001');
  const gameController = new GameController(socket, gameView);

  gameController.bindUserAction();
  gameController.bindServerAction();
  gameController.initGame();
  // 서버에서 게임을 초기화 할 시간을 줘야 한다.
  setTimeout(() => {
    gameController.runGame();
  }, 100);
}

main();