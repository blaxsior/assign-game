import type { GameObjectPacketType } from "../../../interface/packet";

export class BulletView {
  render(ctx: CanvasRenderingContext2D, objData: GameObjectPacketType) {
    // 총알의 반지름
    const rectradius = 1;

    const [x, y] = objData.position;
    ctx.beginPath();
    ctx.arc(x, y, rectradius, 0, 2 * Math.PI);
    ctx.fillStyle = '#424242';
    ctx.fill();
    // ctx.closePath();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}
