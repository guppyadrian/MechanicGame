import type { Player } from "./blocks/player";
import { DrawGame } from "./draw";
import { Drawer } from "./libs/drawer";
import { promptLevel } from "./loadLevel";
import { World } from "./world";

// First initialize drawing with our canvas
Drawer.initialize(document.getElementById('gameCanvas') as HTMLCanvasElement);



/// CREATE WORLD

World.createWorld(9, 4);
World.add(2, 1, 'log', 1, {felled: "vertical"});
World.add(3, 1, 'weak-box');
World.add(3, 2, 'weak-box');

World.add(4, 1, 'log', 1, {felled: "vertical"});
World.add(5, 1, 'weak-box');
World.add(5, 0, 'weak-box');
World.add(5, 2, 'weak-box');

for (let x = 6; x <= 7; x++) {
  for (let y = 0; y <= 4; y++) {
    World.remove(x, y, 0);
  }
}

/// CREATE WORLD



// ok lets add our player (and keep a reference)
let player: Player;

function respawnPlayer() {
  player = World.add(World.PlayerStartPos.x, World.PlayerStartPos.y, 'player');
}
respawnPlayer(); 

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
    case 'KeyL':
      promptLevel();
      break;
    default:
      break;
  }
});