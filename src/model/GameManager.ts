import { Injectable, Scope } from '@nestjs/common';

import { Player } from './Player.model';
import { Gun } from './Gun.model';
import { Bullet } from './Bullet.model';
import { Enemy } from './Enemy.model';
import { type EnemyInfo, EnemySpawner } from './EnemySpawner.model';
import { BulletSpawner } from './BulletSpawner.model';

import type { Vec2D } from '../interface/vector';
import type { NumRange } from '../interface/range';
import { GameObject } from './GameObject.Model';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class GameManager {
  private screen_width: number;
  private screen_height: number;

  private player: Player;
  private gun: Gun;
  private bullets: Bullet[];
  private enemies: Enemy[];
  private enemySpawner: EnemySpawner;

  constructor() { }
  /**
   * 게임 내 필요한 객체를 초기화하는 메서드
   */
  init() {
    // 게임 화면 사이즈. 고정된 값으로 가정
    this.screen_width = 500;
    this.screen_height = 400;

    // Player 설정
    this.player = new Player(100);

    // Gun 설정
    const gunPosition: Vec2D = [this.screen_width / 2, this.screen_height - 5];
    const gunDirection: Vec2D = [0, -1]; // 상단을 본다.
    const rotateSpeed = 3;
    const range_angle: NumRange = { from: -90, to: 90 };
    const bulletSpawner = new BulletSpawner();

    this.gun = new Gun(
      gunPosition,
      gunDirection,
      rotateSpeed,
      range_angle,
      bulletSpawner,
    );

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
      hp: 10,
      range_speed: { from: 3, to: 6 },
      range_xpos: { from: 20, to: this.screen_width - 20 },
      ypos: 20,
    };

    this.enemySpawner = new EnemySpawner(enemy_range_time_interval, enemy_info);
  }

  run() {
    // 적을 생성하고 할당하는 로직
    const new_enemy = this.enemySpawner.spawn();
    new_enemy ?? this.enemies.push(new_enemy);

    // 적과 총알의 움직임을 시뮬레이션한다.
    this.enemies.forEach((it) => {
      it.move();
    });
    this.bullets.forEach((it) => {
      it.move();
    });

    // 적과 총알의 충돌 상태를 확인한다.

    // 죽은 적의 수만큼 점수를 획득한다.

    // 화면 바깥에 있는 게임 오브젝트들을 마킹한다.
    this.expireOutObjs(this.enemies);
    this.expireOutObjs(this.bullets);
    // 비활성화된 게임 오브젝트들을 제거한다.
    this.deleteExpiredObjs(this.enemies);
    this.deleteExpiredObjs(this.bullets);

    // 업데이트 요소들을 반환한다.
    return {};
  }

  onInput(inputData: string) {
    if (inputData === 'rotate_left') {
      this.gun.rotate(-3);
    }
    if (inputData === 'rotate_right') {
      this.gun.rotate(3);
    }
    if (inputData === 'fire') {
      const bullet = this.gun.fire();
      bullet ?? this.bullets.push(bullet);
    }
  }
  /**
   * expired로 마킹된 객체들을 리스트에서 제거한다. 현재는 enemies, guns가 타겟이 된다.
   */
  private deleteExpiredObjs(gameObjects: GameObject[]) {
    for (let i = 0; i < gameObjects.length; i++) {
      if (gameObjects[i].isExpired()) continue;

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
}