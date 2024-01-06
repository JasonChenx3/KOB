import { AcGameObject } from "./AcGameObject";
import { Wall } from "./Wall";

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

        // 存放墙的对象
        this.walls = [];

        // 墙的数量
        this.inner_walls_count = 20;
    }

    check_connectivity(g, sx, sy, tx, ty) {
        if (sx === tx && sy === ty) {
            return true;
        }
        g[sx][sy] = true;
        let dx = [0, 1, 0, -1], dy = [1, 0, -1, 0];
        for (let i = 0; i < 4; i++) {
            let x = sx + dx[i], y = sy + dy[i];
            if (!g[x][y] && this.check_connectivity(g, x, y, tx, ty)) {
                return true;
            }
        }
        return false;
    }

    /**
     * 创建墙
     */
    create_walls() {
        const g = [];
        for (let h = 0; h < this.height; h++) {
            g[h] = [];
            for (let w = 0; w < this.width; w++) {
                g[h][w] = false;
            }
        }

        // 给四周创建出墙
        for (let h = 0; h < this.height; h++) {
            g[h][0] = g[h][this.width - 1] = true;
        }

        for (let w = 0; w < this.width; w++) {
            g[0][w] = g[this.height - 1][w] = true;
        }

        // 创建随机的墙
        for (let i = 0; i < this.inner_walls_count / 2; i++) {
            for (let j = 0; j < 1000; j++) {
                const r = parseInt(Math.random() * this.height);
                const c = parseInt(Math.random() * this.width);
                if (g[r][c] || g[c][r]) {
                    continue;
                }
                if ((r === 1 && c === this.width - 2) || (r === this.height - 2 && c === 1)) {
                    continue;
                }
                g[r][c] = g[c][r] = true;
                break;
            }
        }

        const copy_g = JSON.parse(JSON.stringify(g));
        if (!this.check_connectivity(copy_g, 1, this.width - 2, this.height - 2, 1)) {
            return false;
        }

        // 将墙放到墙的数组内
        for (let h = 0; h < this.height; h++) {
            for (let w = 0; w < this.width; w++) {
                if (g[h][w]) {
                    this.walls.push(new Wall(h, w, this));
                }
            }
        }

        return true;
    }

    /**
     * 第一帧执行的函数
     */
    start() {
        for (let i = 0; i < 1000; i++) {
            if (this.create_walls()) {
                break;
            }
        }
    }

    /**
     * 动态更新地图的大小。
     * 保证地图一直是正方形。
     */
    update_size() {
        // 更新地图绝对距离
        this.L = parseInt(Math.min(
            this.parent.clientWidth / this.width,
            this.parent.clientHeight / this.height));

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