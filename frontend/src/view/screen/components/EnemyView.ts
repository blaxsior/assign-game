import type { GameObjectPacketType } from "../../../interface/packet";
import { rotate } from "../../../util/drawing";

export class EnemyView {
  render(ctx: CanvasRenderingContext2D, objData: GameObjectPacketType) {
    // 적의 모양
    const rectHalfWidth = 5;
    const rectHalfHeight = 5;

    const [x, y] = objData.position;
    const [x_angle, y_angle] = objData.direction;

    const angle = (Math.atan2(y_angle, x_angle) * 180) / Math.PI;
    rotate(ctx, x, y, angle);
    // 회전된 직사각형 그리기
    ctx.fillStyle = '#3E2723'; // 
    ctx.fillRect(x - rectHalfWidth, y - rectHalfHeight, rectHalfHeight * 2, rectHalfHeight * 2);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}
