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
    this.theta = Math.PI / 2 - this.LIMIT;
    this.direction = 0;
  }

  drawWiper(context, theta = this.theta) {
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
    const xydata = { sx: sx, sy: sy, ex: ex, ey: ey };
    return xydata;
  }

  animate(context, trigger) {
    let isWiping;
    if (trigger) this.direction = 1;
    switch (this.direction) {
      case 1:
        if (this.theta >= Math.PI / 2 + this.LIMIT) this.direction = -1;
        isWiping = true;
        break;

      case -1:
        if (this.theta < Math.PI / 2 - this.LIMIT) this.direction = 0;
        isWiping = true;
        break;

      case 0:
        this.theta = Math.PI / 2 - this.LIMIT;
        isWiping = false;
        break;

      default:
        break;
    }
    this.theta += this.VELOCITY * this.direction;
    const xydata = this.drawWiper(context, this.theta);
    const wiperData = { isWiping, xydata };
    return wiperData;
  }

  windowdata() {
    const data = {
      centerX: this.centerX,
      centerY: this.centerY,
      minRadius: this.minRadius,
      maxRadius: this.maxRadius,
      THETA: this.theta,
    };
    return data;
  }
}

export default Wiper;
