import { BarView } from "./BarView.js";
import { GameView } from "./GameView.js";

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
    }
}
// 초기에 게임 관련 정보 (bar 각도 등) 가져오도록 코드 작성

function main() {
    const barWidth = document.querySelector('#bar-container').offsetWidth;
    const circleElem = document.querySelector('#arrow');
    const textElem = document.querySelector('#bar-text')

    const barView = new BarView(circleElem, textElem, barWidth, bar.from, bar.to);
    barView.render(bar.state);

    const canvas = document.querySelector('canvas');
    const gameView = new GameView(canvas);

    gameView.render(bar.state);

    const diff = 3;
    // key mapping
    addEventListener('keydown', (e) => {
        if (e.key === 'a') {
            bar.dec(diff);
            barView.render(bar.state);
            gameView.render(bar.state);
        }
        if (e.key === 'd') {
            bar.inc(diff);
            barView.render(bar.state);
            gameView.render(bar.state);
        }
    });
}

main();