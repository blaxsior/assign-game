import { CollidableGameObject } from 'src/model/CollidableGameObject.model';
import type { ICollisionDetectionStrategy } from './collision.strategy';
import type { Vec2D } from 'src/interface/vector';

/**
 * 2차원 월드 좌표축에 나란한 bounding box를 구한 후 좌표를 계산하는 전략
 */
export class AABBDetectionStrategy implements ICollisionDetectionStrategy {
  checkCollision(obj1: CollidableGameObject, obj2: CollidableGameObject) {
    const collider1 = obj1.getCollider();
    const collider2 = obj2.getCollider();

    // 다각형이 아니면 검사 대상이 아님
    if (collider1.length < 3 || collider2.length < 3) return false;

    const position1 = obj1.getPosition();
    const position2 = obj2.getPosition();

    const bv1 = this.getBoundingValues(position1, collider1);
    const bv2 = this.getBoundingValues(position2, collider2);

    return this.checkIntersect(bv1, bv2);
  }
  /**
   * 게임 오브젝트의 bounding box에 대한 x, y 축 최소 | 최대 좌표를 받는다
   */
  private getBoundingValues(position: Vec2D, collider: Vec2D[]) {
    const [x, y] = position;

    let xmin = Infinity,
      xmax = -Infinity;
    let ymin = Infinity,
      ymax = -Infinity;

    for (const dot of collider) {
      xmin = Math.min(dot[0], xmin);
      xmax = Math.max(dot[0], xmax);
      ymin = Math.min(dot[1], ymin);
      ymax = Math.max(dot[1], ymax);
    }

    return {
      xmin: xmin + x,
      xmax: xmax + x,
      ymin: ymin + y,
      ymax: ymax + y,
    };
  }
  /**
   * 두 사각형이 겹치는지 검사하는 알고리즘
   */
  private checkIntersect(bv1: BoundingValue, bv2: BoundingValue) {
    return !(
      bv1.xmax < bv2.xmin ||
      bv2.xmax < bv1.xmin ||
      bv1.ymax < bv2.ymin ||
      bv2.ymax < bv1.ymin
    );
  }
}

type BoundingValue = {
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
};
