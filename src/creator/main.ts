import { DrawGame } from "../draw";
import { Drawer } from "../libs/drawer";
import { World } from "../world";

Drawer.initialize(document.getElementById('gameCanvas') as HTMLCanvasElement);

// set up buttons

let blockSelected = "wall";

function addBlock(type: string) {
    const btn = document.getElementById(type + "-btn");
    if (btn)
        btn.onclick = () => { blockSelected = type };
}

addBlock('remove');
addBlock('wall');
addBlock('box');
addBlock('log');



World.createWorld(5, 5);

setInterval(DrawGame, 25);

window.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'Digit1':
            blockSelected = 'remove';
            break;
        case 'Digit2':
            blockSelected = 'box';
            break;
        case 'Digit3':
            blockSelected = 'wall';
            break;
        case 'Digit4':
            blockSelected = 'log';
            break;
    }
});

window.addEventListener('mousedown', (e) => {
    const gridX = Math.floor(e.clientX / 30);
    const gridY = Math.floor(e.clientY / 30);

    if (!World.inBounds(gridX, gridY, 1)) return;

    if (blockSelected === 'remove') {
        if (World.getBlock(gridX, gridY, 1))
            World.remove(gridX, gridY, 1)
        else
            World.remove(gridX, gridY, 0);
    } else {
        if (World.getBlock(gridX, gridY, 0))
            World.add(gridX, gridY, blockSelected, 1);
        else
            World.add(gridX, gridY, blockSelected, 0);
    }
});

interface exportedLevel {
    groundLayer: String[][],
    playerLayer: String[][]
}

function exportLevel() {
    let exported: exportedLevel;
    exported = {groundLayer: [], playerLayer: []};

    for (let z = 0; z < 2; z++) {
        for (let x = 0; x < World.width; x++) {
            exported[z === 1 ? 'playerLayer' : 'groundLayer'][x] = new Array<string>();
            for (let y = 0; y < World.height; y++) {
                exported[z === 1 ? 'playerLayer' : 'groundLayer'][x][y] = ((z === 1) ? World.playerLayer : World.groundLayer)[x][y]?.type || 'empty';
            }
        }
    }
}