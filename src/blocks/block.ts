import { BlockSize } from "../constants";
import { World } from "../world";

export class Block {
    type: string;
    x: number;
    y: number;

    isPushable: boolean = false;
    isCollidable: boolean = true;

    get screenX() {
        return this.x * BlockSize;
    }

    get screenY() {
        return this.y * BlockSize;
    }

    constructor(x: number, y: number) {
        this.type = 'block';
        this.x = x;
        this.y = y;
    }

    move(x: number, y: number) {
        const targetX = this.x + x;
        const targetY = this.y + y;

        // Check boundaries
        if (targetX >= World.width || targetX < 0)
            return;
        if (targetY >= World.height || targetY < 0)
            return;

        // Check world for collision
        const targetBlock = World.playerLayer[targetX][targetY];



        if (targetBlock === undefined || !targetBlock.isCollidable) { // if target block is empty
            World.moveBlock(this.x, this.y, targetX, targetY);
            return true;
        }

        if (!targetBlock.isPushable) {
            return false;
        }

        if (targetBlock.move(x, y)) {
            World.moveBlock(this.x, this.y, targetX, targetY);
            return true;
        }
    }
}