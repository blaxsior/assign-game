import { convertAngleToRad } from './util/math.js';
import { BarView } from './view/panel/BarView.js';
import { GameScreenView } from './view/screen/GameScreenView.js';
import { GunView } from './view/screen/components/GunView.js';
import { connectSocket } from './ws/websocket.js';

const bar = {
  state: 0,
  from: -90,
  to: 90,
  /**
   * @param {number} value
   */
  inc(value) {
    this.state += value;
    if (this.state > this.to) {
      this.state = this.to;
    }
  },
  dec(value) {
    this.state -= value;
    if (this.state < this.from) {
      this.state = this.from;
    }
  },
};
// 초기에 게임 관련 정보 (bar 각도 등) 가져오도록 코드 작성

function main() {
  const barWidth = document.querySelector('#bar-container').offsetWidth;
  const circleElem = document.querySelector('#arrow');
  const textElem = document.querySelector('#bar-text');

  const barView = new BarView(circleElem, textElem, barWidth, bar.from, bar.to);
  barView.render(bar.state);

  const canvas = document.querySelector('canvas');
  const gunView = new GunView();
  const gameScreenView = new GameScreenView(canvas, gunView);

  gameScreenView.render({
    gun: {
      direction: [0, -1],
      position: [canvas.clientWidth / 2, canvas.clientHeight - 4],
    },
  });

  const diff = 3;
  // key mapping
  addEventListener('keydown', (e) => {
    if (e.key === 'a') {
      bar.dec(diff);
      barView.render(bar.state);

      const angle = convertAngleToRad(bar.state);
      gameScreenView.render({
        gun: {
          direction: [Math.cos(angle), Math.sin(angle)],
          position: [canvas.clientWidth / 2, canvas.clientHeight - 4],
        },
      });
    }
    if (e.key === 'd') {
      bar.inc(diff);
      barView.render(bar.state);

      const angle = convertAngleToRad(bar.state);
      gameScreenView.render({
        gun: {
          direction: [Math.cos(angle), Math.sin(angle)],
          position: [canvas.clientWidth / 2, canvas.clientHeight - 4],
        },
      });
    }
  });
}

main();
connectSocket();
