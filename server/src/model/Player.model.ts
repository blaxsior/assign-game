export class Player {
  private hp: number;
  private score: number;

  constructor(hp: number) {
    this.hp = hp;
    this.score = 0;
  }

  takeDamage(demage: number) {
    this.hp -= demage;
  }

  addScore(score: number) {
    this.score += score;
  }

  getHp() {
    return this.hp;
  }

  getScore() {
    return this.score;
  }

  isDead() {
    return this.hp <= 0;
  }
}
