import { Component } from '../Component';
import { Vec2D } from 'src/interface/vector';

export class Collider extends Component {
  private collider: Vec2D[];

  constructor(collider: Vec2D[]) {
    super();
    this.collider = collider;
  }

  getCollider() {
    return structuredClone(this.collider);
  }
}
