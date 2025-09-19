import { BlockSize } from "./constants";
import { Drawer } from "./libs/drawer";
import { World } from "./world";

function drawWorld() {
  for (let x = 0; x < World.width; x++) {
    for (let y = 0; y < World.height; y++) {
      const block = World.playerLayer[x][y];
      if (block === undefined) { // TODO: make a drawBlock(x, y, blockType) function
        Drawer.ctx.strokeRect(x * BlockSize, y * BlockSize, BlockSize, BlockSize);
        continue;
      }

      switch (block.type) {
        case 'player':
          Drawer.ctx.fillStyle = 'red';
          break;
        case 'block':
          Drawer.ctx.fillStyle = 'black'; 
          break;
        case 'box':
          Drawer.ctx.fillStyle = 'blue';
          break;
        case 'hole':
          Drawer.ctx.fillStyle = 'grey';
          break;
      }
      // if block here
      
      Drawer.ctx.fillRect(x * BlockSize, y * BlockSize, BlockSize, BlockSize);
    }
  }
}

/**
 * Draws the game
 */
export function DrawGame() {
  Drawer.ctx.clearRect(0, 0, Drawer.canvas.width, Drawer.canvas.height);

  drawWorld();
}