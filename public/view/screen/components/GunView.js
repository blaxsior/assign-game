import { rotate } from '../../../util/drawing.js';

export class GunView {
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {{
   * direction: [number, number],
   * position: [number, number]
   * }} objData
   */
  render(ctx, objData) {
    // gun의 모양
    const rectWidth = 10;
    const rectHeight = 30;

    const [x, y] = objData.position;
    const [x_angle, y_angle] = objData.direction;

    const angle = (Math.atan2(y_angle, x_angle) * 180) / Math.PI;
    console.log(angle);

    rotate(ctx, x, y, angle);
    // 회전된 직사각형 그리기
    ctx.fillStyle = '#FF0000'; // 빨간색으로 채우기
    ctx.fillRect(x - rectWidth / 2, y - rectHeight, rectWidth, rectHeight);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}
