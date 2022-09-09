export class DropOnAir {
  constructor(index, x, y, speed, length) {
    this.index = index;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.length = length;
    this.draw();
  }

  draw(context) {
    context.beginPath();
    context.strokeStyle = "#dfdfdf";
    context.moveTo(this.x, this.y);
    context.lineTo(this.x, this.y + this.length);
    context.stroke();
    context.closePath();
  }
}

export class DropOnWindow {
  constructor(index, x, y, speed, length) {
    this.index = index;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.length = length;
    this.draw();
  }

  draw(context) {
    context.beginPath();
    context.strokeStyle = "#dfdfdf";
    context.moveTo(this.x, this.y);
    context.lineTo(this.x, this.y + this.length);
    context.stroke();
    context.closePath();
  }
}
