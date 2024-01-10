import { Bullet } from './Bullet.model';

import type { ISpawner } from '../interface/spawner';
import type { Vec2D } from '../interface/vector';

export class BulletSpawner implements ISpawner<Bullet> {
  private count: number;
  private max_count: number;

  private bullet_position: Vec2D | null;
  private bullet_direction: Vec2D | null;

  // 생성할 bullet 관련 정보
  private bullet_collider: Vec2D[];
  private bullet_demage: number;
  private bullet_speed: number;

  constructor(max_count: number, bulletInfo: BulletInfo) {
    this.count = 0;

    this.max_count = max_count;

    this.bullet_position = null;
    this.bullet_direction = null;
    this.bullet_collider = bulletInfo.collider;
    this.bullet_demage = bulletInfo.demage;
    this.bullet_speed = bulletInfo.speed;
  }

  spawn(): Bullet | null {
    if (!this.canSpawn()) return null;
    if (!this.bullet_direction || !this.bullet_position) {
      throw new Error('bullet_position and direction must be set');
    }

    // 객체가 생성됨.
    this.count++;

    const bullet = new Bullet(
      this.bullet_position,
      this.bullet_direction,
      this.bullet_collider,
      this.bullet_demage,
      this.bullet_speed,
    );

    this.bullet_position = null;
    this.bullet_direction = null;

    return bullet;
  }

  setBulletInitialPosition(pos: Vec2D) {
    this.bullet_position = pos;
  }

  setBulletInitialDirection(dir: Vec2D) {
    this.bullet_direction = dir;
  }

  canSpawn(): boolean {
    return this.count < this.max_count;
  }
}

/**
 * 총알에 대한 기본 정보
 */
export type BulletInfo = {
  collider: Vec2D[];
  demage: number;
  speed: number;
};
