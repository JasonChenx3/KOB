import { AcGameObject } from "./AcGameObject";

export class GameMap extends AcGameObject {

    constructor(ctx, parent) {
        // 基类构造函数
        super();
        // 画布
        this.ctx = ctx;
        // 父亲结点的引用
        this.parent = parent;
        // 单位一
        this.L = 0;
        // 画布的高
        this.height = 13;
        // 画布的宽
        this.width = 13;
    }

    /**
     * 第一帧执行的函数
     */
    start() {

    }

    /**
     * 动态更新地图的大小。
     * 保证地图一直是正方形。
     */
    update_size() {
        // 更新地图绝对距离
        this.L = Math.min(
            this.parent.clientWidth / this.width,
            this.parent.clientHeight / this.height);

        // 更新canvas的宽和高
        this.ctx.canvas.width = this.L * this.width;
        this.ctx.canvas.height = this.L * this.height;
    }

    /**
     * 每一帧都执行，对画布内的对象参数进行更新。
     */
    update() {
        this.update_size();
        this.render();
    }

    /**
     * 实际渲染函数。
     */
    render() {
        let odd = "#AAD751", even = "#A2D149";
        for (let h = 0; h < this.height; h++) {
            for (let w = 0; w < this.width; w++) {
                if ((h + w) % 2 === 1) {
                    this.ctx.fillStyle = even;
                } else {
                    this.ctx.fillStyle = odd;
                }
                this.ctx.fillRect(h * this.L, w * this.L, this.ctx.canvas.width, this.ctx.canvas.height);
            }
        }
    }
}