import { Component } from '../component/Component';
import type { IConstructor } from '../../interface/ctor';
import { Transform } from '../component/common/Transform';
import { ObjectManager } from '../manager/object/ObjectManager';

export class GameObject {
  protected components: Map<IConstructor<Component>, Component>;
  protected obj_expired: boolean;

  public get transform() {
    return this.getComponent(Transform);
  }

  constructor() {
    this.components = new Map();
    this.obj_expired = false;
    ObjectManager.instance.manageObject(this);
  }

  /**
   * 게임 오브젝트가 만료되었을 때 실행되는 메서드
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

  getComponent<T extends Component>(ctor: IConstructor<T>): T | undefined {
    return this.components.get(ctor) as T | undefined;
  }

  addComponent(component: Component) {
    const ctor = component.constructor as IConstructor<Component>;
    // 생성자가 없으면 돌아간다.
    if (!ctor) return;

    this.components.set(ctor, component);
    component.setGameObject(this);
  }

  deleteComponent(ctor: IConstructor<Component>) {
    const component = this.components.get(ctor);
    // 컴포넌트가 없으면 돌아간다.
    if (!component) return;

    component.setGameObject(null);
    this.components.delete(ctor);
  }

  /**
   * 한 틱마다 실행되는 메서드. 실제 객체에서 따로 구현
   */
  update?: () => void;

  /**
   * 충돌 발생 시 실행되는 메서드. 실제 객체에서 따로 구현
   */
  onCollision?: (gameObject: GameObject) => void;
}
