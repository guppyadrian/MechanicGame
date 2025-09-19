import { Block } from "./blocks/block";
import { Box } from "./blocks/box";
import { Hole } from "./blocks/hole";
import { Player } from "./blocks/player";
import { BlockSize } from "./constants";
import { Drawer } from "./libs/drawer";

export class World {
    static playerLayer: (Block | undefined)[][];

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
        for (let i = 0; i < width; i++) {
            this.playerLayer[i] = new Array(height);
        } 

        Drawer.canvas.width = width * BlockSize;
        Drawer.canvas.height = height * BlockSize;
    }

    /**
     * Moves a block from one position to another. Note: does not check to see if the destination position is already occupied!
     * It will overwrite the desination position.
     * @param x x pos of block to move
     * @param y y pos of block to move
     * @param destX destination x pos
     * @param destY destination y pos
     * @returns {void}
     */
    static moveBlock(x: number, y: number, destX: number, destY: number) {
        const sourceBlock = this.playerLayer[x][y];
  
        if (sourceBlock === undefined) return;

        sourceBlock.x = destX;
        sourceBlock.y = destY;

        World.playerLayer[destX][destY] = sourceBlock;
        World.playerLayer[x][y] = undefined;
    }

    /**
     * Creates a block and adds it to the world
     * @param x x grid position
     * @param y y grid position
     * @param type type of block
     * @returns the block that was created
     */
    static add(x: number, y: number, type: string) {
        let blockClass: typeof Block;

        switch (type) {
            case 'wall':
                blockClass = Block;
                break;
            case 'player':
                blockClass = Player;
                break;
            case 'box':
                blockClass = Box;
                break;
            case 'hole':
                blockClass = Hole;
                break;
            default:
                blockClass = Block;
                break;
        }

        const block = new blockClass(x, y);
        this.playerLayer[x][y] = block;
        return block;
    }

    static remove(x: number, y: number)
    {
        this.playerLayer[x][y] = undefined;
    }
}