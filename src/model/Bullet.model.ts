import { GameObject } from './GameObject.Model';
import { Enemy } from './Enemy.model';

import type { Vec2D } from '../interface/vector';

export class Bullet extends GameObject {
  private demage: number;
  private speed: number;

  constructor(
    position: Vec2D,
    direction: Vec2D,
    demage: number,
    speed: number,
  ) {
    super(position, direction);
    this.demage = demage;
    this.speed = speed;
  }

  getDemage() {
    return this.demage;
  }

  move() {
    const moveX = this.direction[0] * this.speed;
    const moveY = this.direction[1] * this.speed;

    this.position[0] += moveX;
    this.position[1] += moveY;
  }

  onCollision(gameObject: GameObject) {
    if (gameObject instanceof Enemy) {
      // 총알은 적에게 닿으면 사라진다.
      // 데미지를 처리하는 책임은 체력을 가진 Enemy가 처리
      this.markExpired();
    }
  }
}
