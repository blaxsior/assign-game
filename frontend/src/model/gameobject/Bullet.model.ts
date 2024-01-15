import { GameObject } from './GameObject.model';
import { Transform } from '../component/common/Transform';
import { Collider } from '../component/common/Collider';

import { Enemy } from './Enemy.model';

import type { Vec2D } from '../../interface/vector';

export class Bullet extends GameObject {
  private demage: number;
  private speed: number;

  constructor(
    position: Vec2D,
    direction: Vec2D,
    collider: Vec2D[],
    demage: number,
    speed: number,
  ) {
    super();
    this.addComponent(new Transform(position, direction));
    this.addComponent(new Collider(collider));
    this.demage = demage;
    this.speed = speed;
  }

  getDemage() {
    return this.demage;
  }

  private move() {
    const transform = this.getComponent(Transform);
    if (!transform) return;

    const dir = transform.getDirection();

    const dist: Vec2D = [dir[0] * this.speed, dir[1] * this.speed];
    transform.translate(dist);
  }

  update = () => {
    this.move();
  };

  onCollision = (gameObject: GameObject) => {
    if (gameObject instanceof Enemy) {
      // 총알은 적에게 닿으면 사라진다.
      // 데미지를 처리하는 책임은 체력을 가진 Enemy가 처리
      this.markExpired();
    }
  };
}
