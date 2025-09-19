import { Block } from "./block";

export class Player extends Block {

  constructor() {
    super(0, 0);
    this.type = 'player';
  }
}