import { CollidableGameObject } from './CollidableGameObject.model';
import { Bullet } from './Bullet.model';

import type { Vec2D } from '../interface/vector';

export class Enemy extends CollidableGameObject {
  private demage: number;
  private speed: number;
  private hp: number;
  private score: number;
  constructor(
    position: Vec2D,
    direction: Vec2D,
    collider: Vec2D[],
    demage: number,
    speed: number,
    hp: number,
    score: number,
  ) {
    super(position, direction, collider);
    this.demage = demage;
    this.speed = speed;
    this.hp = hp;
    this.score = score;
  }

  takeDemage(demage: number) {
    this.hp -= demage;
    if (this.isDead()) this.markExpired();
  }

  getDemage() {
    return this.demage;
  }

  getScore() {
    return this.score;
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

  override onCollision(gameObject: CollidableGameObject) {
    if (!(gameObject instanceof Bullet)) return;
    const bullet = gameObject;
    // 총알과 충돌한 경우, 데미지를 입는다.
    // 총알이 비활성화되는 로직은 총알 자체에서 책임진다.
    this.takeDemage(bullet.getDemage());
  }
}
