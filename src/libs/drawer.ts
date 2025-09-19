export class Drawer {
  static ctx: CanvasRenderingContext2D;
  static canvas: HTMLCanvasElement;

  static initialize(canvas: HTMLCanvasElement) {
    Drawer.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error("Can't get context!");
    Drawer.ctx = ctx;
  }

}