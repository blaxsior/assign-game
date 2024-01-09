import { Bullet } from './Bullet.model';

import type { ISpawner } from '../interface/spawner';
import type { Vec2D } from '../interface/vector';

export class BulletSpawner implements ISpawner<Bullet> {
  private count: number;
  private max_count: number;

  private bullet_demage: number;
  private bullet_speed: number;
  private bullet_position: Vec2D;
  private bullet_direction: Vec2D;

  spawn(): Bullet | null {
    if (!this.canSpawn()) return null;

    // 객체 1개 더 생성됨
    this.count++;

    const bullet = new Bullet(
      this.bullet_position,
      this.bullet_direction,
      this.bullet_demage,
      this.bullet_speed,
    );

    return bullet;
  }

  setBulletPosition(pos: Vec2D) {
    this.bullet_position = pos;
  }

  setBulletDirection(dir: Vec2D) {
    this.bullet_direction = dir;
  }

  canSpawn(): boolean {
    return this.count < this.max_count;
  }
}
