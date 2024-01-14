import { Vec2D } from './vector';

export interface ISpawner<T> {
  spawn(): T[];
  canSpawn(): boolean;
}

export interface IBulletSpawner<T> extends ISpawner<T> {
  setBulletInitialPosition(pos: Vec2D);
  setBulletInitialDirection(dir: Vec2D);
}
