import type { Log } from "./blocks/log";
import { BlockSize } from "./constants";
import { Drawer } from "./libs/drawer";
import { World } from "./world";

function drawWorld() {
  // DRAW GROUND
  for (let x = 0; x < World.width; x++) {
    for (let y = 0; y < World.height; y++) {
      const block = World.groundLayer[x][y];
      if (block === undefined) { // TODO: make a drawBlock(x, y, blockType) function
        Drawer.ctx.strokeRect(x * BlockSize, y * BlockSize, BlockSize, BlockSize);
        continue;
      }

      switch (block.type) {
        case 'player':
          Drawer.ctx.fillStyle = 'darkRed';
          break;
        case 'block':
          Drawer.ctx.fillStyle = '#101010';
          break;
        case 'log':
          Drawer.ctx.fillStyle = 'darkGreen';
          break;
        case 'weak-box':
        case 'box':
          Drawer.ctx.fillStyle = 'saddleBrown';
          break;
      }
      // if block here

      Drawer.ctx.fillRect(x * BlockSize, y * BlockSize, BlockSize, BlockSize);
    }
  }

  // DRAW PLAYER LAYER
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
          Drawer.ctx.fillStyle = 'dimGray';
          break;
        case 'log':
          Drawer.ctx.fillStyle = 'green';
          break;
        case 'weak-box':
        case 'box':
          Drawer.ctx.fillStyle = 'Peru';
          break;
      }
      // if block here

      Drawer.ctx.fillRect(x * BlockSize, y * BlockSize, BlockSize, BlockSize);

      if (block.type === 'log' && !(block as Log).standing) {
        Drawer.ctx.fillStyle = "white";
        Drawer.ctx.font = "15px Arial";
        Drawer.ctx.textAlign = "center";
        if ((block as Log).vertical) {
          Drawer.ctx.fillText("↔", x * BlockSize + BlockSize / 2, y * BlockSize + BlockSize / 2 + 2);
        } else {
          Drawer.ctx.fillText("↕", x * BlockSize + BlockSize / 2, y * BlockSize + BlockSize / 2 + 2);
        }
      }
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