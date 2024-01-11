import { rotateByDirection } from "../../../util/drawing";

import type { GameObjectData } from "../../../interface/packet";

export class EnemyView {
  render(ctx: CanvasRenderingContext2D, objData: GameObjectData) {
    // 적의 모양
    const rectHalfWidth = 30;
    const rectHalfHeight = 20;

    const [x, y] = objData.position;

    rotateByDirection(ctx, x, y, objData.direction);
    // 회전된 직사각형 그리기
    ctx.fillStyle = '#7DC0A7'; // 
    ctx.fillRect(x - rectHalfWidth, y - rectHalfHeight, rectHalfWidth * 2, rectHalfHeight * 2);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}
