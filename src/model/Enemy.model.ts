import { GameObject } from './GameObject.model';
import { Bullet } from './Bullet.model';

import type { Vec2D } from '../interface/vector';

export class Enemy extends GameObject {
  private demage: number;
  private speed: number;
  private hp: number;
  constructor(
    position: Vec2D,
    direction: Vec2D,
    demage: number,
    speed: number,
    hp: number,
  ) {
    super(position, direction);
    this.demage = demage;
    this.speed = speed;
    this.hp = hp;
  }

  takeDemage(demage: number) {
    this.hp -= demage;
    if (this.isDead()) this.markExpired();
  }

  getDemage() {
    return this.demage;
  }

  isDead() {
    return this.hp <= 0;
  }

  move() {
    const moveX = this.direction[0] * this.speed;
    const moveY = this.direction[1] * this.speed;

    this.position[0] += moveX;
    this.position[1] += moveY;
  }

  onCollision(gameObject: GameObject) {
    if (!(gameObject instanceof Bullet)) return;
    const bullet = gameObject;
    // 총알과 충돌한 경우, 데미지를 입는다.
    // 총알이 비활성화되는 로직은 총알 자체에서 책임진다.
    this.takeDemage(bullet.getDemage());
  }
}
