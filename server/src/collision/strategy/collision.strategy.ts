import { CollidableGameObject } from '../../model/CollidableGameObject.model';

export interface ICollisionDetectionStrategy {
  checkCollision(
    obj1: CollidableGameObject,
    obj2: CollidableGameObject,
  ): boolean;
}
