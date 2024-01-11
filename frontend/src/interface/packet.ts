export type viewData = {
  objects: ScreenData;

  hp?: number;
  score?: number;
  angle?: number;
};

export type ScreenData = {
  enemies: GameObjectData[];
  bullets: GameObjectData[];
  gun?: GameObjectData;
};

export type UpPanelData = {
  hp?: number;
  score?: number;
};

export type DownPanelData = {
  angle?: number;
};

export type GameObjectData = {
  direction: Vec2D;
  position: Vec2D;
};

export type Vec2D = [number, number];