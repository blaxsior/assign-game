import { CollisibleGameObject } from '../../model/CollisibleGameObject.model';

export interface ICollisionDetectionStrategy {
  checkCollision(
    obj1: CollisibleGameObject,
    obj2: CollisibleGameObject,
  ): boolean;
}
