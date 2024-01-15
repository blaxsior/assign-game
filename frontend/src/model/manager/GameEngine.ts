import { AABBDetectionStrategy } from './collision/strategy/AABB.strategy';
import { CollisionManager } from './collision/CollisionManager';

import { GameObject } from '../gameobject/GameObject.model';

import { InputManager } from './io/InputManager';
import { ObjectManager } from './object/ObjectManager';

export class GameEngine {
  // 화면의 가로 / 세로는 고정된 값으로 가정
  private screen_width: number = 1000;
  private screen_height: number = 800;

  private game_running: boolean;
  private game_over: boolean;
  private collisionManager: CollisionManager;
  private inputManager: InputManager;
  private objectManager: ObjectManager;

  constructor() {
    const collisionStrategy = new AABBDetectionStrategy();
    this.collisionManager = new CollisionManager(collisionStrategy);

    this.inputManager = InputManager.instance;
    this.objectManager = ObjectManager.instance;

    this.game_running = false;
    this.game_over = false;
  }

  isGameRunning() {
    return this.game_running;
  }

  startGame() {
    this.game_running = true;
  }

  stopGame() {
    this.game_running = false;
  }

  setGameOver() {
    this.game_over = true;
  }

  getScreenSize() {
    return {
      width: this.screen_width,
      height: this.screen_height,
    };
  }

  /**
   * 게임 내 필요한 객체를 초기화한다.
   */
  initGame() {
    // 충돌 매니저 설정
    
  }
  update() {
    const objects = this.objectManager.getObjects();
    for(const object of objects) {
      object.update?.();
    }

    this.collisionManager.detectAndHandleCollision(objects);
    this.expireOutObjs(objects);
    this.objectManager.deleteExpiredObjs();

    this.inputManager.clearInput();
  }
  // /**
  //  * 게임을 한 프레임 만큼 실행한다.
  //  */
  // run() {
  //   if (!this.game_running || this.player.isDead()) return; // 적이 죽었거나, 게임이 실행 중이 아님
  //   // 적을 생성하고 할당하는 로직
  //   const new_enemies = this.enemySpawner.spawn();
  //   this.enemies.push(...new_enemies);
  //   // 적과 총알의 움직임을 시뮬레이션한다.
  //   // 장기적으로는 this.gameObjects.forEach((it) => it.update());
  //   // 처럼 처리할 수 있다면 좋겠다.
  //   this.enemies.forEach((it) => {
  //     it.move();
  //   });
  //   this.bullets.forEach((it) => {
  //     it.move();
  //   });

  //   // 객체들의 충돌을 처리한다.
  //   this.collisionManager.detectAndHandleCollision([
  //     ...this.enemies,
  //     ...this.bullets,
  //   ]);

  //   // 죽은 적의 수만큼 점수를 획득한다.
  //   let score = 0;
  //   for (const enemy of this.enemies) {
  //     if (enemy.isDead()) score += 1;
  //   }
  //   this.player.addScore(score);

  //   // 화면 바깥에 있는 게임 오브젝트들을 마킹한다.
  //   this.expireOutObjs(this.enemies);
  //   this.expireOutObjs(this.bullets);

  //   // 화면 바깥으로 적이 나간 경우 플레이어의 체력을 깎는다.
  //   for (const enemy of this.enemies) {
  //     if (!enemy.isDead() && enemy.isExpired())
  //       this.player.takeDamage(enemy.getDemage());
  //   }

  //   // 비활성화된 게임 오브젝트들을 리스트에서 제거한다.
  //   this.deleteExpiredObjs(this.enemies);
  //   this.deleteExpiredObjs(this.bullets);
  // }

  // /**
  //  * 현재 시뮬레이션 되고 있는 게임의 상태를 반환한다.
  //  */
  // getCurrentGameState(): GameData {
  //   return {
  //     objects: {
  //       enemies: this.enemies.map((it) => ({
  //         direction: it.getDirection(),
  //         position: it.getPosition(),
  //       })),
  //       bullets: this.bullets.map((it) => ({
  //         direction: it.getDirection(),
  //         position: it.getPosition(),
  //       })),
  //       gun: {
  //         direction: this.gun.getDirection(),
  //         position: this.gun.getPosition(),
  //       },
  //     },
  //     hp: this.player.getHp(),
  //     score: this.player.getScore(),
  //     angle: this.gun.getAngle(),
  //   };
  // }

  /**
   * 사용자의 입력에 대응한다. UserAction에 맞지 않는 문자열의 요청이 올 경우 무시한다.
   * @param action 사용자가 요청한 액션을 의미하는 문자열
   */
  onInput(action: string) {
    this.inputManager.setUserInput(action);
  }

    /**
   * 화면 바깥으로 나간 객체들을 expired로 마킹한다.
   */
  private expireOutObjs(gameObjects: readonly GameObject[]) {
      for (const gameObject of gameObjects) {
        if (gameObject.isExpired() || !gameObject.transform) continue;
  
        const [x, y] = gameObject.transform.getPosition();
  
  
        if (x < 0 || x > this.screen_width || y < 0 || y > this.screen_height) {
          gameObject.markExpired();
        }
      }
    }

  isGameOver() {
    return this.game_over;
  }
}
