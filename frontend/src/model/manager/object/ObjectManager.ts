import { IConstructor } from "../../../interface/ctor";
import { GameObject } from "../../core/GameObject.model";

export class ObjectManager {
  private gameObjects: GameObject[];

  private static manager: ObjectManager | null = null;

  static get instance(): ObjectManager {
    if (!this.manager) {
      this.manager = new ObjectManager();
    }
    return this.manager;
  }

  private constructor() {
    this.gameObjects = [];
  }

  /**
   * 객체를 생성하는 클래스. 이 메서드로 생성하면 생명주기에 포함된다.
   */
  createObject<T extends GameObject, P extends any[]>(
    ctor: IConstructor<T, P>,
    ...args: ConstructorParameters<typeof ctor>
  ) {
    const gameObject = new ctor(...args);
    this.manageObject(gameObject);
    return gameObject;
  }

  /**
   * 객체를 관리 풀에 넣는 클래스
   */
  manageObject<T extends GameObject>(gameObject: T) {
    this.gameObjects.push(gameObject);
    return gameObject;
  }

  /**
 * expired로 마킹된 객체들을 리스트에서 제거한다. 현재는 enemies, guns가 타겟이 된다.
 */
  deleteExpiredObjs() {
    for (let i = 0; i < this.gameObjects.length; i++) {
      if (!this.gameObjects[i].isExpired()) continue;

      //현 위치의 객체를 제거하고 인덱스를 1칸 내린다. (현재 인덱스에 다음 값이 오게 됨)
      this.gameObjects.splice(i, 1);
      i -= 1;
    }
  }

  /**
   * 모든 게임 오브젝트를 찾는다.
   */
  getObjects(): readonly GameObject[] {
    return this.gameObjects;
  }

  /**
   * 클래스 타입 기반으로 게임 오브젝트를 찾는다.
   */
  findObjectsByType(ctor: IConstructor<GameObject>): readonly GameObject[] {
    return this.gameObjects.filter(it => it instanceof ctor);
  }
}