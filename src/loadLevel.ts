import type { ExportedLevel } from "./creator/creator";
import { World } from "./world";

export function loadLevel(levelData: ExportedLevel) {
    World.createWorld(levelData.dimensions.x, levelData.dimensions.y);

    for (let x = 0; x < World.width; x++) {
        for (let y = 0; y < World.height; y++) {
            if (levelData.groundLayer[x][y] !== 'empty')
                World.add(x, y, levelData.groundLayer[x][y], 0);
            else
                World.remove(x, y, 0);
            if (levelData.playerLayer[x][y] !== 'empty')
                World.add(x, y, levelData.playerLayer[x][y], 1);
            else 
                World.remove (x, y, 1);
        }
    }

    World.PlayerStartPos = levelData.playerStartPos;
}

export function promptLevel() {
    const p = prompt("Enter level data");
    if (p === null || p === '') return;

    loadLevel(JSON.parse(p));
}