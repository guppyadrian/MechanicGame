import { DrawGame } from "./draw";
import { Drawer } from "./libs/drawer";
import { World } from "./world";

// First initialize drawing with our canvas
Drawer.initialize(document.getElementById('gameCanvas') as HTMLCanvasElement);

// then create our world
World.createWorld(10, 10);

World.add(6, 7, 'box');

World.add(1, 9, 'box');

World.add(5, 7, 'wall');
World.add(5, 5, 'wall');
World.add(6, 5, 'wall');
World.add(6, 9, 'hole');

World.add(6, 4, 'hole');

World.add(7, 0, 'wall');
World.add(7, 2, 'box');
World.add(7, 3, 'box');
World.add(7, 4, 'hole');
World.add(7, 5, 'wall');
World.add(7, 6, 'wall');
World.add(7, 7, 'wall');

World.add(8, 0, 'wall');
World.add(8, 1, 'wall');
World.add(8, 2, 'wall');
World.add(8, 3, 'wall');
World.add(8, 4, 'hole');
World.add(8, 5, 'wall');
World.add(8, 6, 'wall');
World.add(8, 7, 'wall');
World.add(8, 8, 'wall');
World.add(8, 9, 'wall');

// ok lets add our player (and keep a reference)
let player = World.add(0, 0, 'player');


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
    default:
      break;
  }
});