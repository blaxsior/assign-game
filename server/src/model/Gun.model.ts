import { BulletSpawner } from './BulletSpawner.model';
import { GameObject } from './GameObject.Model';
import { Bullet } from './Bullet.model';
import { convertAngleToRad } from '../util/math';

import type { NumRange } from '../interface/range';
import type { Vec2D } from '../interface/vector';

export class Gun extends GameObject {
  /**
   * 각도의 최소 & 최대값
   */
  private range_angle: NumRange;

  /**
   * 현재 각도
   */
  private angle: number;

  private bulletSpawner: BulletSpawner;

  constructor(
    pos: Vec2D,
    dir: Vec2D,
    range_angle: NumRange,
    bulletSpawner: BulletSpawner,
  ) {
    super(pos, dir);
    this.range_angle = range_angle;
    this.angle = 0;
    this.bulletSpawner = bulletSpawner;
  }

  fire(): Bullet | null {
    if (!this.bulletSpawner.canSpawn()) return null;
    this.bulletSpawner.setBulletInitialDirection(this.getDirection());
    this.bulletSpawner.setBulletInitialPosition(this.getPosition());

    return this.bulletSpawner.spawn();
  }

  rotate(angle: number) {
    this.angle += angle;
    // 최소 최대 보정
    if (this.angle > this.range_angle.to) this.angle = this.range_angle.to;
    if (this.angle < this.range_angle.from) this.angle = this.range_angle.from;

    // 각도 - 방향 보정
    // 0도가 가리키는 방향은 270도에 해당. 원 각도에서 90도를 빼서 올바른 방향을 지정한다.
    const rad = convertAngleToRad(angle);

    this.direction[0] = Math.sin(rad);
    this.direction[1] = -Math.cos(rad);
  }

  getAngle() {
    return this.angle;
  }
}
