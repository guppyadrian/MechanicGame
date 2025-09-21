import { World } from "../world";
import { Box } from "./box";

export class WeakBox extends Box {
  constructor(x: number, y: number) {
    super(x, y);
    this.type = 'weak-box';
    this.isPushable = true;
  }

  override move(x: number, y: number) {
    const result = super.move(x, y);

    if (this.z === 0) {
        World.remove(this.x, this.y, this.z);
    }

    return result;
  }
}