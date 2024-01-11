import { Vec2D } from '../interface/packet.ts';
import { convertAngleToRad } from './math.ts';

export function rotate(ctx: CanvasRenderingContext2D, xaxis: number, yaxis: number, angle: number) {
  // 기존 각도를 라디안 각도로 변경
  // 화면 상에서 보여주는 각도와 방향 벡터가 가리키는 각도는 90도 차이가 발생.
  // 게임에서는 0도를 윗 방향으로 지정하고 있으나,
  // 캔버스 상에서는 우측을 0도로 시작한다.
  var radRotationAngle = convertAngleToRad(angle + 90);

  ctx.translate(xaxis, yaxis);
  ctx.rotate(radRotationAngle);
  ctx.translate(-xaxis, -yaxis);
}

export function rotateByDirection(ctx: CanvasRenderingContext2D, xaxis: number, yaxis: number, direction: Vec2D) {
  const [x_vec, y_vec] = direction;
  const angle = Math.atan2(y_vec, x_vec) * 180 / Math.PI;
  rotate(ctx, xaxis, yaxis, angle);
}