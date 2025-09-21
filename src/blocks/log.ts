import { World } from "../world";
import { Box } from "./box";

export class Log extends Box {
    standing: boolean;
    vertical: boolean; // will roll left/right if true

    constructor(x: number, y: number) {
        super(x, y);
        this.type = 'log';

        this.standing = true;
        this.vertical = false;
    }

    finishMove(destX: number, destY: number) {
        World.moveBlock(this.x, this.y, this.z, destX, destY, this.z);
        this.checkFalling();
    }

    override move(x: number, y: number) {

        if (!this.checkTargetPos(x, y)) {
            return false;
        }

        if (this.standing) {
            // then push over, based on direction of force
            this.standing = false;
            if (y !== 0) {
                this.vertical = true;
            } else {
                this.vertical = false;
            }

            World.moveBlock(this.x, this.y, this.z, this.x + x, this.y + y, this.z);
            return true;
        }

        // if not standing then either roll or make standing
        if (this.vertical && x !== 0) {
            // roll until not
            let canRoll = true;
            while(canRoll) {
                if (
                    !World.inBounds(this.x + x, this.y, this.z) ||
                    World.getBlock(this.x + x, this.y, this.z) ||
                    this.z === 0
                ) {
                    return true;
                }
                this.finishMove(this.x + x, this.y);
            }
        } else if (!this.vertical && y !== 0) {
            // roll until not
            let canRoll = true;
            while(canRoll) {
                if (
                    !World.inBounds(this.x, this.y, this.z) ||
                    World.getBlock(this.x, this.y, this.z) ||
                    this.z === 0
                ) {
                    return true;
                }
                this.finishMove(this.x, this.y + y);
            }
        } else {
            this.standing = true;
            World.moveBlock(this.x, this.y, this.z, this.x + x, this.y + y, this.z);
            return true;
        }

        return true;
    }
}
