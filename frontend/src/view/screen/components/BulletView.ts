import type { GameObjectData } from "../../../interface/packet";
import { rotateByDirection } from "../../../util/drawing";

export class BulletView {
  render(ctx: CanvasRenderingContext2D, objData: GameObjectData) {
    // 총알의 반지름
    const rectradius = 3;

    const [x, y] = objData.position;
    rotateByDirection(ctx, x, y, objData.direction);
    ctx.beginPath();
    ctx.arc(x, y, rectradius, 0, 2 * Math.PI);
    ctx.fillStyle = '#424242';
    ctx.fill();
    // ctx.closePath();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}
