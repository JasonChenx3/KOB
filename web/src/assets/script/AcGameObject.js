const Ac_Game_Object = [];

export class AcGameObject {
    constructor() {
        Ac_Game_Object.push(this);
        this.timedelta = 0;
        this.has_called_start = false;
    }

    start() {  // 只执行一次
    }

    update() {  // 每一帧执行一次，除了第一帧
    }

    on_destroy() {  // 删除之前执行
    }

    destroy() {
        this.on_destroy();
        for (let i in Ac_Game_Object) {  // in 遍历下标
            let obj = Ac_Game_Object[i];
            if (obj === this) {
                Ac_Game_Object.splice(i);
                break;
            }
        }
    }
}

let last_timestamp;  // 上一次执行的时刻
const step = timestamp => {
    for (let obj of Ac_Game_Object) {  // of 遍历值
        if (!obj.has_called_start) {
            obj.has_called_start = true;
            obj.start();
        } else {
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }
    last_timestamp = timestamp;
    requestAnimationFrame(step);
}

requestAnimationFrame(step)