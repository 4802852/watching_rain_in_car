export class Wiper {
  constructor(canvasWidth, canvasHeight, wiperVelocity, wiperLimit) {
    // wiper info
    this.centerX = canvasWidth / 2;
    this.centerY = (canvasHeight / 9) * 18;
    this.minRadius = (canvasWidth / 16) * 11;
    this.maxRadius = (canvasWidth / 16) * 17;
    this.wiperThickness = canvasWidth / 80;
    this.VELOCITY = wiperVelocity;
    this.LIMIT = wiperLimit;
    this.THETA = Math.PI / 2 - this.LIMIT;
    this.REVERSE = 1;
  }

  drawWiper(context, theta = this.THETA) {
    let start_angle = Math.PI / 2 - theta;
    let sx, sy, ex, ey;
    sx = this.centerX + this.minRadius * Math.cos(theta);
    sy = this.centerY - this.minRadius * Math.sin(theta);
    ex = this.centerX + this.maxRadius * Math.cos(theta);
    ey = this.centerY - this.maxRadius * Math.sin(theta);
    context.strokeStyle = "rgb(0,0,0,0)";
    context.beginPath();
    context.arc(sx, sy, this.wiperThickness / 2, start_angle, start_angle + Math.PI);
    context.arc(ex, ey, this.wiperThickness / 2, start_angle + Math.PI, start_angle);
    context.closePath();
    context.stroke();
    context.fillStyle = "rgb(0,0,0,0.8)";
    context.fill();
    const wiperData = { sx: sx, sy: sy, ex: ex, ey: ey };
    return wiperData;
  }

  animate(context, flag) {
    if (flag) {
      this.THETA += this.VELOCITY * this.REVERSE;
      if (this.THETA >= Math.PI / 2 + this.LIMIT) {
        this.REVERSE *= -1;
      }
    } else {
      this.THETA = Math.PI / 2 - this.LIMIT;
      this.REVERSE = 1;
    }
    const wiperData = this.drawWiper(context, this.THETA);
    return wiperData;
  }

  windowdata() {
    const data = {
      centerX: this.centerX,
      centerY: this.centerY,
      minRadius: this.minRadius,
      maxRadius: this.maxRadius,
      THETA: this.THETA,
    };
    return data;
  }
}

export default Wiper;
