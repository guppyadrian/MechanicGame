import { DrawGame } from "./draw";
import { Drawer } from "./libs/drawer";
import { World } from "./world";

// First initialize drawing with our canvas
Drawer.initialize(document.getElementById('gameCanvas') as HTMLCanvasElement);

// then create our world
World.createWorld(5, 5);
World.add(2, 1, 'wall');
World.add(2, 2, 'box');
World.remove(2, 3, 0);
World.remove(3, 3, 0);
World.remove(4, 3, 0);

// ok lets add our player (and keep a reference)
let player = World.add(0, 0, 'player');
const playerSpawnPos = {x: 0, y: 0};

function respawnPlayer() {
  
}


// rn tick looks a little empty... not much needs to happen every frame.
function Tick() {
  DrawGame();
}

// game loop runs 60fps
setInterval(Tick, 1000 / 60);


// adding controls to our player
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
    case 'KeyF':
      respawnPlayer();
      break;
    default:
      break;
  }
});