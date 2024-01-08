import { convertAngleToRad } from "../../util/math.js";
import { GunView } from "./components/GunView.js";

export class GameScreenView {
    /**
     * @param {HTMLCanvasElement} canvas
     * @param {GunView} gunView 
     */
    constructor(canvas, gunView) {
        // 캔버스 설정
        if (!canvas) throw new Error("there is no canvas object");
        this.cwidth = canvas.width;
        this.cheight = canvas.height;
        /**
         * @type {CanvasRenderingContext2D}
         */
        this.ctx = canvas.getContext("2d");

        // gunView 설정
        /**
         * @type {GunView}
         */
        this.gunView = gunView;
    }
    /**
     * 
     * @param {{ 
     * gun: { direction: [number, number], position: [number, number] } 
     * }} data 
     */
    render(data) {
        this.ctx.clearRect(0, 0, this.cwidth, this.cheight);
        this.gunView.render(this.ctx, data.gun);
    }
}