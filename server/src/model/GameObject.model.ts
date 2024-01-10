import type { Vec2D } from '../interface/vector';

export abstract class GameObject {
  protected position: Vec2D;
  protected direction: Vec2D;

  protected obj_expired: boolean;
  protected obj_activated: boolean;

  constructor(position: Vec2D, direction: Vec2D) {
    this.position = [...position];
    this.direction = [...direction];
    this.obj_expired = false;
  }

  /**
   * 게임 오브젝트가 만료되었을 때 실행되는 메서드. 필요한 경우 각 게임 오브젝트에서 오버라이딩한다.
   */
  protected onExpired() {}

  isExpired() {
    return this.obj_expired;
  }

  /**
   * 현재 게임 오브젝트를 만료된 상태로 설정한다. 만료된 오브젝트는 GameManager에 의해 제거된다.
   */
  markExpired() {
    this.obj_expired = true;
    this.onExpired();
  }

  getPosition(): Vec2D {
    return [...this.position];
  }

  getDirection(): Vec2D {
    return [...this.direction];
  }
}
