import { Block } from "./block";

export class Hole extends Block {
  constructor(x: number, y: number) {
    super(x, y);
    this.type = 'hole';
    this.isPushable = false;
  }
}