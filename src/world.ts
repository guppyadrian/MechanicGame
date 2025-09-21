import { Block } from "./blocks/block";
import { Box } from "./blocks/box";
import { Log } from "./blocks/log";
import { Player } from "./blocks/player";
import { WeakBox } from "./blocks/weakBox";
import { BlockSize } from "./constants";
import { Drawer } from "./libs/drawer";

export class World {
    static playerLayer: (Block | undefined)[][];
    static groundLayer: (Block | undefined)[][];
    static PlayerStartPos = {x: 0, y: 0, z: 0};

    static get width() {
        return this.playerLayer.length;
    }

    static get height() { // should be getter or just a var?
        return this.playerLayer.length;
    }

    /**
     * Creates a new empty world with width and height
     * @param width 
     * @param height 
     */
    static createWorld(width: number, height: number) {
        this.playerLayer = new Array(width);
        this.groundLayer = new Array(width);
        for (let i = 0; i < width; i++) {
            this.playerLayer[i] = new Array(height);
            this.groundLayer[i] = new Array(height);

            for (let o = 0; o < height; o++) {
                this.groundLayer[i][o] = new Block(i, o);
            }
        } 

        Drawer.canvas.width = width * BlockSize;
        Drawer.canvas.height = height * BlockSize;
    }

    /**
     * Moves a block from one position to another. Note: does not check to see if the destination position is already occupied!
     * It will overwrite the desination position.
     * @param x x pos of block to move
     * @param y y pos of block to move
     * @param z
     * @param destX destination x pos
     * @param destY destination y pos
     * @param destZ
     * @returns
     */
    static moveBlock(x: number, y: number, z: number, destX: number, destY: number, destZ: number) {
        const sourceBlock = this.getBlock(x, y, z);
  
        if (sourceBlock === undefined) return;

        sourceBlock.x = destX;
        sourceBlock.y = destY;
        sourceBlock.z = destZ;

        if (destZ === 1) {
            World.playerLayer[destX][destY] = sourceBlock;
        } else {
            World.groundLayer[destX][destY] = sourceBlock;
        }
        if (z === 1) {
            World.playerLayer[x][y] = undefined;
        } else {
            World.groundLayer[x][y] = undefined;
        }
    }

    static inBounds(x: number, y: number, z: number) {
        if (x < 0 || x >= World.width) return false;
        if (y < 0 || y >= World.height) return false;
        if (z < 0 || z >= 2) return false;
        return true;
    }

    static getBlock(x: number, y: number, z: number) {
        return (z === 1) ? this.playerLayer[x][y] : this.groundLayer[x][y];
    }

    /**
     * Creates a block and adds it to the world
     * @param x x grid position
     * @param y y grid position
     * @param type type of block
     * @param z z layer of block
     * @returns the block that was created
     */
    static add(x: number, y: number, type: string, z: number = 1, properties: any = {}) {
        let blockClass: typeof Block;

        switch (type) {
            case 'wall':
                blockClass = Block;
                break;
            case 'player':
                blockClass = Player;
                break;
            case 'weak-box':
                blockClass = WeakBox;
                break;
            case 'box':
                blockClass = Box;
                break;
            case 'log':
                blockClass = Log;
                break;
            default:
                blockClass = Block;
                break;
        }

        const block = new blockClass(x, y);

        if ('felled' in properties) {
            if (properties.felled === "vertical") {
                (block as Log).standing = false;
                (block as Log).vertical = true;
            } else {
                (block as Log).standing = false;
                (block as Log).vertical = false;
            }
        }

        if (z === 1) {
            this.playerLayer[x][y] = block;
        } else {
            this.groundLayer[x][y] = block;
        }
        return block;
    }

    static remove(x: number, y: number, z: number) {
        if (z === 1) {
            this.playerLayer[x][y] = undefined;
        } else {
            this.groundLayer[x][y] = undefined;
        }
    }
}