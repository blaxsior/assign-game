import { Enemy } from './Enemy.model';
import { pickRandomNumberInRange } from '../util/math';

import type { ISpawner } from '../interface/spawner';
import type { Vec2D } from '../interface/vector';
import type { NumRange } from '../interface/range';

export class EnemySpawner implements ISpawner<Enemy> {
  /**
   * Enemy를 생성할 수 있는 시간을 숫자로 표현
   */
  private available_spawn_time: number;
  private range_time_interval: NumRange;

  // 적 생성 시 사용되는 정보들
  private enemy_hp: number;
  private enemy_demage: number;
  private enemy_direction: Vec2D;
  private enemy_collider: Vec2D[];
  private range_enemy_xpos: NumRange;
  private range_enemy_speed: NumRange;
  private enemy_ypos: number;

  constructor(range_time_interval: NumRange, enemyInfo: EnemyInfo) {
    this.available_spawn_time = 0; // 초기화
    this.range_time_interval = range_time_interval;

    this.enemy_hp = enemyInfo.hp;
    this.enemy_demage = enemyInfo.demage;
    this.enemy_direction = enemyInfo.direction;
    this.enemy_collider = enemyInfo.collider;
    this.range_enemy_xpos = enemyInfo.range_xpos;
    this.range_enemy_speed = enemyInfo.range_speed;
    this.enemy_ypos = enemyInfo.ypos;
  }

  spawn(): Enemy | null {
    if (!this.canSpawn()) return null;
    // 생성 가능 시간 갱신
    this.available_spawn_time = this.calculateNextSpawnTime();

    // 적 생성 위한 값 준비
    const enemy_xpos = pickRandomNumberInRange(this.range_enemy_xpos);
    const enemy_position: Vec2D = [enemy_xpos, this.enemy_ypos];

    const enemy_speed = pickRandomNumberInRange(this.range_enemy_speed);

    const enemy = new Enemy(
      enemy_position,
      this.enemy_direction,
      this.enemy_collider,
      this.enemy_demage,
      enemy_speed,
      this.enemy_hp,
    ); // 적 생성

    return enemy;
  }

  canSpawn(): boolean {
    return Date.now() >= this.available_spawn_time;
  }

  /**
   * 다음 번 생성될 시간을 얻는 함수
   */
  private calculateNextSpawnTime(): number {
    const SEC = 1000;
    return Date.now() + pickRandomNumberInRange(this.range_time_interval) * SEC;
  }
}

export type EnemyInfo = {
  hp: number;
  demage: number;
  direction: Vec2D;
  collider: Vec2D[];
  range_speed: NumRange;
  range_xpos: NumRange;
  ypos: number;
};
