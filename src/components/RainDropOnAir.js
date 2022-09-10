export class DropOnAir {
  constructor(index, canvasWidth, canvasHeight) {
    this.index = index;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.speedVar = canvasHeight / 150;
    this.minSpeed = canvasHeight / 20;
    this.lengthVar = canvasHeight / 30;
    this.minLength = canvasHeight / 255;
    this.x = Math.random() * this.canvasWidth;
    this.y = Math.random() * this.canvasHeight;
    this.speed = Math.random() * this.speedVar + this.minSpeed;
    this.length = Math.random() * this.lengthVar + this.minLength;
  }

  draw(context) {
    context.strokeStyle = "rgb(150,150,150)";
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.x, this.y + this.length);
    context.stroke();
  }

  update(context) {
    this.y += this.speed;
    if (this.y > this.canvasHeight) {
      this.x = Math.random() * this.canvasWidth;
      this.y = 0;
      this.speed = Math.random() * this.speedVar + this.minSpeed;
      this.length = Math.random() * this.lengthVar + this.minLength;
    }
    this.draw(context);
  }
}

