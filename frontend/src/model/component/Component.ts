import { GameObject } from '../gameobject/GameObject.model';

export class Component {
  private _gameObject: GameObject | null;

  constructor() {
    this._gameObject = null;
  }

  getGameObject(): GameObject | null {
    return this._gameObject;
  }

  setGameObject(gameObject: GameObject | null) {
    this._gameObject = gameObject;
  }

  public get gameObject(): GameObject | null {
    return this._gameObject;
  }
}
