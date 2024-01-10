export interface ISpawner<T> {
  spawn(): T | null;
  canSpawn(): boolean;
}
