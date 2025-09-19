import { Block } from "./block";

export class Box extends Block {
  constructor(x: number, y: number) {
    super(x, y);
    this.type = 'box';
    this.isPushable = true;
  }
}