import { Block } from "./block";

export class Player extends Block {

  constructor(x: number, y: number) {
    super(x, y);
    this.type = 'player';
  }
}