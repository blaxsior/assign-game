import { rotateByDirection } from '../../../util/drawing';

import type { GameObjectData } from '../../../interface/packet';

export class GunView {
  render(ctx: CanvasRenderingContext2D, objData: GameObjectData) {
    // gun의 모양
    const rectWidth = 10;
    const rectHeight = 30;

    const [x, y] = objData.position;

    rotateByDirection(ctx, x, y, objData.direction);
    // 회전된 직사각형 그리기
    ctx.fillStyle = '#FF0000'; // 빨간색으로 채우기
    ctx.fillRect(x - rectWidth / 2, y - rectHeight, rectWidth, rectHeight);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}
