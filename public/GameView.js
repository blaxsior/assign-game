import { convertAngleToRad } from "./util/math.js";

export class GameView {
    /**
     * 
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(canvas) {
        if(!canvas) throw new Error("there is no canvas object");
        this.cwidth = canvas.width;
        this.cheight = canvas.height;
        /**
         * @type {CanvasRenderingContext2D}
         */
        this.ctx = canvas.getContext("2d");
    }

    render(angle) {
        this.ctx.clearRect(0, 0, this.cwidth, this.cheight);

        this.ctx.fillStyle = '#FF0000';
    
        var rectWidth = 10;
        var rectHeight = 30;

        this.rotate(this.cwidth / 2, this.cheight, angle);

        // 회전된 직사각형 그리기
        this.ctx.fillStyle = '#FF0000'; // 빨간색으로 채우기
        this.ctx.fillRect((this.cwidth - rectWidth) / 2, this.cheight - rectHeight, rectWidth, rectHeight);
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    /**
     * 
     * @param {number} xaxis
     * @param {number} yaxis
     * @param {number} angle 
     */
    rotate(xaxis, yaxis, angle) {
        // 기존 각도를 라디안 각도로 변경
        var radRotationAngle = convertAngleToRad(angle);

        this.ctx.translate(xaxis, yaxis);
        this.ctx.rotate(radRotationAngle);
        this.ctx.translate(-xaxis, -yaxis);
    }

    draw(target) {
    }
}