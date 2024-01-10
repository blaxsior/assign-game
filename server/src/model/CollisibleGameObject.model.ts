import { GameObject } from './GameObject.Model';

import type { Vec2D } from '../interface/vector';

// INFO:
// 요구사항이 점점 복잡해져 상속만으로 해결할 수 없는 상황이 발생하는 경우
// 현재의 상속 기반 확장을 제거하고, gameobject는 단순한 컴포넌트의 모음 방식으로 변경한다.
// ex) gameobject는 자신의 활성화 / 비활성화, 만료 정도의 정보만 관리하는 객체로 두고
// 객체의 위치 / 회전 등 관리하는 객체는 Transform 컴포넌트로 빼는 등의 처리를 수행한다.

/**
 * 충돌과 관련된 정보를 추가적으로 가지는 오브젝트.
 */
export abstract class CollisibleGameObject extends GameObject {
  private collider: Vec2D[];

  constructor(position: Vec2D, direction: Vec2D, collider: Vec2D[]) {
    super(position, direction);
    this.collider = collider;
  }

  getCollider() {
    return structuredClone(this.collider);
  }

  /**
   * 충돌 이벤트 발생 시 호출되는 메서드. 필요 시 각 클래스에서 오버라이딩한다.
   * @param obj 자신과 충돌한 게임 오브젝트
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onCollision(obj: CollisibleGameObject) {}
}
