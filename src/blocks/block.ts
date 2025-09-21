import { BlockSize } from "../constants";
import { World } from "../world";

export class Block {
    type: string;
    x: number;
    y: number;
    z: number;

    isPushable: boolean = false;
    isCollidable: boolean = true;

    get screenX() {
        return this.x * BlockSize;
    }

    get screenY() {
        return this.y * BlockSize;
    }

    constructor(x: number, y: number, z: number = 1) {
        this.type = 'block';
        this.x = x;
        this.y = y;
        this.z = z;
    }

    checkTargetPos(x: number, y: number) {
        const targetX = this.x + x;
        const targetY = this.y + y;


        // Check boundaries
        if (targetX >= World.width || targetX < 0)
            return;
        if (targetY >= World.height || targetY < 0)
            return;

        const targetBlock = World.getBlock(targetX, targetY, this.z);

        if (targetBlock === undefined || !targetBlock.isCollidable)
            return true;

        if (!targetBlock.isPushable) {
            return false;
        }

        if (targetBlock.move(x, y)) {
            return true;
        }

        return false;
    }

    move(x: number, y: number) {
        const targetX = this.x + x;
        const targetY = this.y + y;
        
        if (this.checkTargetPos(x, y)) {
            console.log(targetX)
            World.moveBlock(this.x, this.y, this.z, targetX, targetY, this.z);
            this.checkFalling();
            return true;
        }
        

        return false;
    }

    checkFalling() {
        if (this.z === 0) return false;

        if (World.getBlock(this.x, this.y, this.z - 1) === undefined) {
            World.moveBlock(this.x, this.y, this.z, this.x, this.y, this.z - 1);

            return true;
            // for recursive checks
            // TODO: uncomment this for >2 layers
            //this.checkFalling();
        }
        return false;
    }
}