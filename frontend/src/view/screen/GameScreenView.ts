import { BulletView } from './components/BulletView.js';
import { EnemyView } from './components/EnemyView.js';
import { GunView } from './components/GunView.js';

import type { ScreenPacketType } from '../../interface/packet.js';

export class GameScreenView {
  private cwidth: number;
  private cheight: number;
  private ctx: CanvasRenderingContext2D;

  private gunView: GunView;
  private enemyView: EnemyView;
  private bulletView: BulletView;

  constructor(canvas: HTMLCanvasElement) {
    // 캔버스 설정
    if (!canvas) throw new Error('there is no canvas object');
    this.cwidth = canvas.width;
    this.cheight = canvas.height;
    this.ctx = canvas.getContext('2d')!;

    this.gunView = new GunView();
    this.enemyView = new EnemyView();
    this.bulletView = new BulletView();
  }

  render(data: ScreenPacketType) {
    console.log(data);
    this.ctx.clearRect(0, 0, this.cwidth, this.cheight);

    data.gun && this.gunView.render(this.ctx, data.gun);
    data.enemies?.forEach((it) => this.enemyView.render(this.ctx, it));
    data.bullets?.forEach((it) => this.bulletView.render(this.ctx, it));
  }
}