import { convertAngleToRad } from './math.js';

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} xaxis
 * @param {number} yaxis
 * @param {number} angle
 */
export function rotate(ctx, xaxis, yaxis, angle) {
  // 기존 각도를 라디안 각도로 변경
  var radRotationAngle = convertAngleToRad(angle);

  ctx.translate(xaxis, yaxis);
  ctx.rotate(radRotationAngle);
  ctx.translate(-xaxis, -yaxis);
}
