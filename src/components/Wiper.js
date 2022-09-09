export class Wiper {
  constructor(canvasWidth, canvasHeight, wiperVelocity, wiperLimit) {
    this.centerX = canvasWidth / 2;
    this.centerY = (canvasHeight / 9) * 18;
    this.minRadius = (canvasWidth / 16) * 11;
    this.maxRadius = (canvasWidth / 16) * 17;
    this.wiperThickness = canvasWidth / 80;
    this.VELOCITY = wiperVelocity;
    this.WIPERCOLOR = "rgb(0,0,0,0.5)";
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
    context.strokeStyle = this.WIPERCOLOR;
    context.beginPath();
    context.arc(sx, sy, this.wiperThickness / 2, start_angle, start_angle + Math.PI);
    context.arc(ex, ey, this.wiperThickness / 2, start_angle + Math.PI, start_angle);
    context.closePath();
    context.stroke();
    context.fillStyle = this.WIPERCOLOR;
    context.fill();
    const wiperData = { sx: sx, sy: sy, ex: ex, ey: ey };
    return wiperData;
  }

  animate(context, flag) {
    let wiperData;
    if (flag) {
      this.THETA += this.VELOCITY * this.REVERSE;
      wiperData = this.drawWiper(context, this.THETA);
      if (this.THETA >= Math.PI / 2 + this.LIMIT) {
        this.REVERSE *= -1;
      }
    } else {
      this.THETA = Math.PI / 2 - this.LIMIT;
      wiperData = this.drawWiper(context, this.THETA);
      this.REVERSE = 1;
    }
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
