import { World } from "../world";
import { Block } from "./block";

export class Box extends Block {
  constructor(x: number, y: number) {
    super(x, y);
    this.type = 'box';
    this.isPushable = true;
  }

  override move(x: number, y: number) {
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

      if (targetBlock.type == 'hole') { // if target block is a hole
          World.moveBlock(this.x, this.y, targetX, targetY);
          World.remove(targetX,targetY);
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