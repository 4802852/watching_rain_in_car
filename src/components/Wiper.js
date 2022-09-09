export class Wiper {
  constructor(canvasWidth, canvasHeight, wiperVelocity) {
    this.centerX = canvasWidth / 2;
    this.centerY = (canvasHeight / 9) * 18;
    this.minRadius = (canvasWidth / 16) * 11;
    this.maxRadius = (canvasWidth / 16) * 17;
    this.wiperThickness = canvasWidth < 500 ? 6 : 10;
    this.VELOCITY = wiperVelocity;
    this.WIPERCOLOR = "rgb(0,0,0,0.5)";
    this.LIMIT = 0.4;
    this.THETA = Math.PI / 2 - this.LIMIT;
    this.REVERSE = 1;
  }

  drawWiper(context, theta = this.THETA) {
    let start_angle = Math.PI / 2 - theta;
    context.strokeStyle = this.WIPERCOLOR;
    context.beginPath();
    context.arc(this.centerX + this.minRadius * Math.cos(theta), this.centerY - this.minRadius * Math.sin(theta), this.wiperThickness / 2, start_angle, start_angle + Math.PI);
    context.arc(this.centerX + this.maxRadius * Math.cos(theta), this.centerY - this.maxRadius * Math.sin(theta), this.wiperThickness / 2, start_angle + Math.PI, start_angle);
    context.closePath();
    context.stroke();
    context.fillStyle = this.WIPERCOLOR;
    context.fill();
  }

  animate(context) {
    this.THETA += this.VELOCITY * this.REVERSE;
    this.drawWiper(context, this.THETA);
    if (this.THETA >= Math.PI / 2 + this.LIMIT) {
      this.REVERSE *= -1;
    }
  }
}

export default Wiper;
