class Drawer {
  static ctx: CanvasRenderingContext2D;
  static canvas: HTMLCanvasElement;

  static initialize(canvas: HTMLCanvasElement) {
    Drawer.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error("Can't get context!");
    Drawer.ctx = ctx;
  }

}

Drawer.initialize(document.getElementById('gameCanvas') as HTMLCanvasElement);

let World: (Block | undefined)[][] = [];
let WorldWidth = 5;
let WorldHeight = 5;

function worldMove(x: number, y: number, destX: number, destY: number) {
  const sourceBlock = World[x][y];
  
  if (sourceBlock === undefined) return;

  sourceBlock.x = destX;
  sourceBlock.y = destY;

  World[destX][destY] = sourceBlock;
  World[x][y] = undefined;
}

function createWorld(width: number, height: number) {
  WorldWidth = width;
  WorldHeight = height;
  World = Array(width);
  for (let i = 0; i < width; i++) {
    World[i] = new Array(height);
  }
}



class Block {
  type: string;
  x: number;
  y: number;

  isPushable: boolean = false;
  isCollidable: boolean = true;

  constructor(x: number, y: number) {
    this.type = 'block';
    this.x = x;
    this.y = y;
  }

  move(x: number, y: number) {
    const targetX = this.x + x;
    const targetY = this.y + y;

    // Check boundaries
    if (targetX >= WorldWidth || targetX < 0)
      return;
    if (targetY >= WorldHeight || targetY < 0)
      return;

    // Check world for collision
    const targetBlock = World[targetX][targetY];

    

    if (targetBlock === undefined || !targetBlock.isCollidable) { // if target block is empty
      worldMove(this.x, this.y, targetX, targetY);
      return true;
    }

    if (!targetBlock.isPushable) {
      return false;
    }

    if (targetBlock.move(x, y)) {
      worldMove(this.x, this.y, targetX, targetY);
      return true;
    }
  }
}

class Box extends Block {
  constructor(x: number, y: number) {
    super(x, y);
    this.type = 'box';
    this.isPushable = true;
  }
}

function createBlock(x: number, y: number, type: string) {
  let blockClass: typeof Block;

  switch (type) {
    case 'block':
      blockClass = Block;
      break;
    case 'box':
      blockClass = Box;
      break;
    case 'player':
      blockClass = Player;
      break;
    default:
      blockClass = Block;
  }
  World[x][y] = new blockClass(x, y);
}

class Player extends Block {

  get screenX() {
    return this.x * 30;
  }

  get screenY() {
    return this.y * 30;
  }

  constructor() {
    super(0, 0);
    this.type = 'player';
  }
}

function Tick() {
  Draw();
}

let player = new Player();

function drawWorld() {
  for (let x = 0; x < WorldWidth; x++) {
    for (let y = 0; y < WorldHeight; y++) {
      const block = World[x][y];
      if (block === undefined) { // TODO: make a drawBlock(x, y, blockType) function
        Drawer.ctx.strokeRect(x * 30, y * 30, 30, 30);
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
      }
      // if block here
      
      Drawer.ctx.fillRect(x * 30, y * 30, 30, 30);
    }
  }
}

function Draw() {
  Drawer.ctx.clearRect(0, 0, Drawer.canvas.width, Drawer.canvas.height);

  Drawer.ctx.fillStyle = "red";
  Drawer.ctx.fillRect(player.screenX, player.screenY, 30, 30);

  drawWorld();
}

setInterval(Tick, 16);

createWorld(5, 5);
createBlock(2, 1, 'block');
createBlock(2, 2, 'box');

World[0][0] = player;

window.addEventListener('keydown', (e) => {
  switch (e.code) {
    case 'ArrowRight':
    case 'KeyD':
      player.move(1, 0);
      break;
    case 'ArrowLeft':
    case 'KeyA':
      player.move(-1, 0);
      break;
    case 'ArrowDown':
    case 'KeyS':
      player.move(0, 1);
      break;
    case 'ArrowUp':
    case 'KeyW':
      player.move(0, -1);
      break;
    default:
      break;
  }
});