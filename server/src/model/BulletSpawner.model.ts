import { Bullet } from './Bullet.model';
import { GameObject } from './GameObject.Model';

import type { Vec2D } from '../interface/vector';
import type { BulletInfo, IBulletSpawner } from '../interface/bulletspawner';

export class LimitCountBulletSpawner implements IBulletSpawner {
  private max_count: number;

  private bullet_position: Vec2D | null;
  private bullet_direction: Vec2D | null;

  // 생성할 bullet 관련 정보
  private bullet_collider: Vec2D[];
  private bullet_demage: number;
  private bullet_speed: number;

  /**
   * 만료된 총알 오브젝트를 알아내기 위한 배열. 총알 자체 기능이 필요한게 아니므로 GameObject로 받음.
   */
  private bullets: GameObject[];

  constructor(max_count: number, bulletInfo: BulletInfo) {
    this.bullets = [];
    this.max_count = max_count;

    this.bullet_position = null;
    this.bullet_direction = null;
    this.bullet_collider = bulletInfo.collider;
    this.bullet_demage = bulletInfo.demage;
    this.bullet_speed = bulletInfo.speed;
  }

  spawn(): Bullet[] {
    this.removeExpiredBullets();
    if (!this.canSpawn()) return [];
    if (!this.bullet_direction || !this.bullet_position) {
      throw new Error('bullet_position and direction must be set');
    }

    const bullet = new Bullet(
      this.bullet_position,
      this.bullet_direction,
      this.bullet_collider,
      this.bullet_demage,
      this.bullet_speed,
    );
    this.bullets.push(bullet);

    this.bullet_position = null;
    this.bullet_direction = null;

    return [bullet];
  }
  /**
   * 총알의 상태를 검사, 만료된 경우 제거한다.
   */
  private removeExpiredBullets() {
    for (let i = 0; i < this.bullets.length; i++) {
      if (!this.bullets[i].isExpired()) continue;

      this.bullets.splice(i, 1);
      i--;
    }
  }

  setBulletInitialPosition(pos: Vec2D) {
    this.bullet_position = pos;
  }

  setBulletInitialDirection(dir: Vec2D) {
    this.bullet_direction = dir;
  }

  canSpawn(): boolean {
    return this.bullets.length < this.max_count;
  }
}
