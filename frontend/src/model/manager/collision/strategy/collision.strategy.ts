import { GameObject } from "../../../core/GameObject.model";

export interface ICollisionDetectionStrategy {
  checkCollision(collider1: GameObject, collider2: GameObject): boolean;
}
