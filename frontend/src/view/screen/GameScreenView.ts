import { BulletView } from './components/BulletView.js';
import { EnemyView } from './components/EnemyView.js';
import { GunView } from './components/GunView.js';

import type { ScreenData } from '../../interface/packet.js';

export class GameScreenView extends HTMLElement {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;

  private gunView: GunView;
  private enemyView: EnemyView;
  private bulletView: BulletView;

  constructor(width: number, height: number) {
    super();
    this.initElement(width, height);

    this.width = width;
    this.height = height;

    const canvas = this.shadowRoot!.querySelector('#gameCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    this.ctx = ctx;

    this.gunView = new GunView();
    this.enemyView = new EnemyView();
    this.bulletView = new BulletView();
  }

  private initElement(width: number, height: number) {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.innerHTML =
      `
      <style>
        * {
        box-sizing: content-box;
        }
        #gameScreen {
          margin: 0;
          padding: 0;
          border: black 1px solid;
        }
        
        #gameUpPanel > * {
          flex-grow: 1;
        }
      </style>
      <div id="gameScreen">
        <canvas id="gameCanvas" width="${width}" height="${height}" style="width:${width}px; height:${height}px"></canvas>
      </div>
      `;
  }

  render(data: ScreenData) {
    // console.log(data);
    this.ctx.clearRect(0, 0, this.width, this.height);

    data.gun && this.gunView.render(this.ctx, data.gun);
    data.enemies?.forEach((it) => this.enemyView.render(this.ctx, it));
    data.bullets?.forEach((it) => this.bulletView.render(this.ctx, it));
  }
}

window.customElements.define('game-screen-view', GameScreenView);