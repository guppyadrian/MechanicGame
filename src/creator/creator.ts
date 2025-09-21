import { DrawGame } from "../draw";
import { Drawer } from "../libs/drawer";
import { loadLevel } from "../loadLevel";
import { World } from "../world";

Drawer.initialize(document.getElementById('gameCanvas') as HTMLCanvasElement);

// set up buttons

let blockSelected = "wall";
let playerStartPos = {x: 0, y: 0, z: 1};

function setStartPos() {
    const p = prompt("Enter pos (x y): ");
    if (p === "" || p === null) return;

    const pos = p.split(' ');

    playerStartPos = {x: parseInt(pos[0]), y: parseInt(pos[1]), z: 1};
}

function setSize() {
    const p = prompt("Enter dimensions (x y): ");
    if (p === "" || p === null) return;

    const size = p.split(' ');

    const lvl = exportLevel();

    lvl.dimensions.x = parseInt(size[0]);
    lvl.dimensions.y = parseInt(size[1]);

    loadLevel(lvl);
}

function addBlock(type: string) {
    const btn = document.getElementById(type + "-btn");
    if (btn)
        btn.onclick = () => { blockSelected = type };
}

function createButton(text: string, callback: () => any) {
    const btn = document.createElement('button');

    btn.textContent = text;

    btn.addEventListener('click', callback);

    document.getElementById('buttons')?.appendChild(btn);
}

addBlock('remove');
addBlock('wall');
addBlock('box');
addBlock('log');

createButton('export', exportLevel);
createButton('playerPos', setStartPos);
createButton('set size', setSize);

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

interface Vector3 {
    x: number,
    y: number,
    z: number
}

export interface ExportedLevel {
    dimensions: Vector3
    groundLayer: string[][],
    playerLayer: string[][]
    playerStartPos: Vector3
}

function exportLevel() {
    let exported: ExportedLevel;
    exported = {
        dimensions: {x: World.width, y: World.height, z: 2},
        groundLayer: [],
        playerLayer: [],
        playerStartPos: playerStartPos
    };

    for (let z = 0; z < 2; z++) {
        for (let x = 0; x < World.width; x++) {
            exported[z === 1 ? 'playerLayer' : 'groundLayer'][x] = new Array<string>();
            for (let y = 0; y < World.height; y++) {
                exported[z === 1 ? 'playerLayer' : 'groundLayer'][x][y] = ((z === 1) ? World.playerLayer : World.groundLayer)[x][y]?.type || 'empty';
            }
        }
    }
    console.log(JSON.stringify(exported));

    return exported;
}