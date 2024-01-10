import { Injectable, Scope } from '@nestjs/common';

import { AABBDetectionStrategy } from '../collision/AABB.strategy';
import { CollisionManager } from '../collision/CollisionManager';

import { GameObject } from '../model/GameObject.Model';
import { Player } from '../model/Player.model';
import { Gun } from '../model/Gun.model';
import { Bullet } from '../model/Bullet.model';
import { Enemy } from '../model/Enemy.model';

import { type EnemyInfo, EnemySpawner } from '../model/EnemySpawner.model';
import { type BulletInfo, BulletSpawner } from '../model/BulletSpawner.model';

import { UserAction } from '../interface/user-action';
import type { Vec2D } from '../interface/vector';
import type { NumRange } from '../interface/range';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class GameManager {
  // 화면의 가로 / 세로는 고정된 값으로 가정
  private screen_width: number = 500;
  private screen_height: number = 400;

  // 게임을 구성하는 객체들
  private player: Player;
  private gun: Gun;
  private bullets: Bullet[];
  private enemies: Enemy[];
  private enemySpawner: EnemySpawner;
  private collisionManager: CollisionManager;

  constructor() {}
  /**
   * 게임 내 필요한 객체를 초기화하는 메서드
   */
  init() {
    // 충돌 매니저 설정
    const collisionStrategy = new AABBDetectionStrategy();
    this.collisionManager = new CollisionManager(collisionStrategy);

    // Player 설정
    const hp = 100;
    this.player = new Player(hp);

    // bullet spawner 설정
    const max_bullet_count = 3;
    const bullet_info: BulletInfo = {
      collider: [
        [-1, -1],
        [-1, 1],
        [1, 1],
        [1, -1],
      ],
      demage: 3,
      speed: 5,
    };
    const bulletSpawner = new BulletSpawner(max_bullet_count, bullet_info);

    // Gun 설정
    const gunPosition: Vec2D = [this.screen_width / 2, this.screen_height - 5];
    const gunDirection: Vec2D = [0, -1]; // 상단을 본다.
    const range_angle: NumRange = { from: -90, to: 90 };

    this.gun = new Gun(gunPosition, gunDirection, range_angle, bulletSpawner);

    // bullets, enemies을 배열로 초기화
    this.bullets = [];
    this.enemies = [];

    // EnemySpawner 설정
    const enemy_range_time_interval: NumRange = {
      from: 1,
      to: 4,
    };
    const enemy_info: EnemyInfo = {
      demage: 3,
      direction: [0, 1], // 아래로 향하는 방향
      collider: [
        [-5, -5],
        [5, -5],
        [5, 5],
        [-5, 5],
      ],
      hp: 10,
      range_speed: { from: 3, to: 6 },
      range_xpos: { from: 30, to: this.screen_width - 30 },
      ypos: 50,
    };

    this.enemySpawner = new EnemySpawner(enemy_range_time_interval, enemy_info);
  }

  run() {
    if (this.player.isDead()) return; // 적이 죽었으므로 끝
    // 적을 생성하고 할당하는 로직
    const new_enemy = this.enemySpawner.spawn();
    new_enemy && this.enemies.push(new_enemy);

    // 적과 총알의 움직임을 시뮬레이션한다.
    // 장기적으로는 this.gameObjects.forEach((it) => it.update());
    // 처럼 처리할 수 있다면 좋겠다.
    this.enemies.forEach((it) => {
      it.move();
    });
    this.bullets.forEach((it) => {
      it.move();
    });

    // 객체들의 충돌을 처리한다.
    this.collisionManager.detectAndHandleCollision([
      ...this.enemies,
      ...this.bullets,
    ]);

    // 죽은 적의 수만큼 점수를 획득한다.
    let score = 0;
    for (const enemy of this.enemies) {
      if (enemy.isDead()) score += 1;
    }
    this.player.addScore(score);

    // 화면 바깥에 있는 게임 오브젝트들을 마킹한다.
    this.expireOutObjs(this.enemies);
    this.expireOutObjs(this.bullets);

    for (const enemy of this.enemies) {
      if (!enemy.isDead() && enemy.isExpired())
        this.player.takeDamage(enemy.getDemage());
    }

    // 비활성화된 게임 오브젝트들을 리스트에서 제거한다.
    this.deleteExpiredObjs(this.enemies);
    this.deleteExpiredObjs(this.bullets);

    // 업데이트 요소들을 반환한다.
    return {
      objects: {
        enemies: this.enemies.map((it) => ({
          direction: it.getDirection(),
          position: it.getPosition(),
        })),
        bullets: this.bullets.map((it) => ({
          direction: it.getDirection(),
          position: it.getPosition(),
        })),
        gun: {
          direction: this.gun.getDirection(),
          position: this.gun.getPosition(),
        },
      },
      player: {
        hp: this.player.getHp(),
        score: this.player.getScore(),
      },
    };
  }
  /**
   * 사용자의 입력에 대응한다. UserAction에 맞지 않는 문자열의 요청이 올 경우 무시한다.
   * @param action 사용자가 요청한 액션을 의미하는 문자열
   */
  onInput(action: string) {
    switch (action) {
      case UserAction.ROT_LEFT:
        this.gun.rotate(-3);
        break;
      case UserAction.ROT_RIGHT:
        this.gun.rotate(3);
        break;
      case UserAction.FIRE:
        const bullet = this.gun.fire();
        bullet && this.bullets.push(bullet);
        break;
    }
  }
  /**
   * expired로 마킹된 객체들을 리스트에서 제거한다. 현재는 enemies, guns가 타겟이 된다.
   */
  private deleteExpiredObjs(gameObjects: GameObject[]) {
    for (let i = 0; i < gameObjects.length; i++) {
      if (!gameObjects[i].isExpired()) continue;

      //현 위치의 객체를 제거하고 인덱스를 1칸 내린다. (현재 인덱스에 다음 값이 오게 됨)
      gameObjects.splice(i, 1);
      i -= 1;
    }
  }

  /**
   * 화면 바깥으로 나간 객체들을 expired로 마킹한다.
   */
  private expireOutObjs(gameObjects: GameObject[]) {
    for (const gameObject of gameObjects) {
      if (gameObject.isExpired()) continue;

      const [x, y] = gameObject.getPosition();

      if (x < 0 || x > this.screen_width || y < 0 || y > this.screen_height) {
        gameObject.markExpired();
      }
    }
  }

  isGameOver() {
    return this.player.isDead();
  }
}
