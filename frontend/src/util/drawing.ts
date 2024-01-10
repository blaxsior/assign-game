import { convertAngleToRad } from './math.ts';

export function rotate(ctx: CanvasRenderingContext2D, xaxis: number, yaxis: number, angle: number) {
  // 기존 각도를 라디안 각도로 변경
  var radRotationAngle = convertAngleToRad(angle);

  ctx.translate(xaxis, yaxis);
  ctx.rotate(radRotationAngle);
  ctx.translate(-xaxis, -yaxis);
}
