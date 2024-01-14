import type { Bullet } from '../model/Bullet.model';
import type { ISpawner } from './spawner';
import type { Vec2D } from './vector';

export interface IBulletSpawner extends ISpawner<Bullet> {
  setBulletInitialPosition(pos: Vec2D);
  setBulletInitialDirection(dir: Vec2D);
}

/**
 * 총알에 대한 기본 정보
 */
export type BulletInfo = {
  collider: Vec2D[];
  demage: number;
  speed: number;
};
