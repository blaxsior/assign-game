export type Packet = {
  objects: ScreenPacketType;
  player: PanelPacketType;
};

export type ScreenPacketType = {
  enemies: GameObjectPacketType[];
  bullets: GameObjectPacketType[];
  gun?: GameObjectPacketType;
};

export type PanelPacketType = {
  hp?: number;
  score?: number;
  angle?: number;
};

export type GameObjectPacketType = {
  direction: Vec2D;
  position: Vec2D;
};

export type Vec2D = [number, number];