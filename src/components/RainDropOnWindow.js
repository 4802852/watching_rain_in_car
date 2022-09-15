export class DropOnWindow {
  constructor(index, canvasWidth, canvasHeight) {
    // drop info
    this.index = index;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.minDropSize = canvasHeight / 100 >= 3 ? canvasHeight / 90 : 3;
    this.intitialDropSize = this.minDropSize * 2;
    this.wiperThres = canvasWidth / 80;
    this.speedVar = canvasHeight / 500;
    this.minSpeed = canvasHeight / 400;
    this.maxSpeed = Math.random() * this.speedVar + this.minSpeed;
    this.acceration = 0.05;
    // drop intial status
    this.x = Math.random() * this.canvasWidth;
    this.y = Math.random() * this.canvasHeight;
    this.dropSize = this.intitialDropSize;
    this.cnt = 0;
    this.speed = 0;
  }

  draw(context, wiperData) {
    // drop status update
    if (this.dropSize > this.minDropSize) this.dropSize = this.dropSize * 0.95;
    if (this.speed < this.maxSpeed) this.speed = this.acceration * (this.cnt / 50) * (this.cnt / 50);
    if (this.y > this.canvasHeight) this.update();
    this.cnt++;
    let isWiped = 0.7;
    // movement by wiper
    const { sx, sy, ex, ey } = wiperData;
    let distance;
    if (sy === ey) {
      distance = Math.abs(sx - this.x);
    } else {
      let up = Math.abs((ey - sy) * this.x + (sx - ex) * this.y + (ex - sx) * sy - (ey - sy) * sx);
      let down = Math.sqrt(Math.pow(ey - sy, 2) + Math.pow(sx - ex, 2));
      distance = up / down;
    }
    const ab = { x: ex - sx, y: ey - sy };
    const ac = { x: this.x - sx, y: this.y - sy };
    const ba = { x: -ab.x, y: -ab.y };
    const bc = { x: this.x - ex, y: this.y - ey };
    if (distance < this.wiperThres && ab.x * ac.x + ab.y * ac.y > 0 && ba.x * bc.x + ba.y * bc.y > 0) {
      let theta1 = Math.atan(ab.y / ab.x);
      let theta = theta1 >= 0 ? Math.PI / 2 + theta1 : theta1 - Math.PI / 2;
      let dx = (this.wiperThres - distance) * Math.cos(theta);
      let dy = (this.wiperThres - distance) * Math.sin(theta);
      if (ab.x * ac.y - ab.y * ac.x >= 0) {
        this.x -= dx * 2;
        this.y -= dy * 2;
      } else {
        this.x += dx * 2;
        this.y += dy * 2;
      }
      this.y += this.speed / 5;
      isWiped = 0.1;
    } else {
      this.y += this.speed;
    }
    // drop draw
    context.strokeStyle = "rgb(0,0,0,0)";
    context.beginPath();
    context.arc(this.x, this.y, this.dropSize, 0, 2 * Math.PI);
    context.stroke();
    context.fillStyle = "rgb(180,180,180,0.9)";
    context.fill();
    // drop status return
    const data = {
      x: this.x,
      y: this.y,
      opacity: isWiped,
    };
    return data;
  }

  update() {
    this.x = Math.random() * this.canvasWidth;
    this.y = Math.random() * this.canvasHeight;
    this.maxSpeed = Math.random() * this.speedVar + this.minSpeed;
    this.length = Math.random() * this.lengthVar + this.minLength;
    this.dropSize = this.intitialDropSize;
    this.speed = 0;
    this.cnt = 0;
  }
}

export class DropRemain {
  constructor(index, canvasWidth, canvasHeight, remainDropNumber) {
    this.index = index;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    let remainNumber = Math.floor(this.index / remainDropNumber);
    this.dropSize = (canvasHeight / 100) * (1 - Math.pow(0.85, remainNumber));
    this.wiperThres = canvasWidth / 80;
    this.x = -20;
    this.y = -20;
    this.opacity = 0;
  }

  draw(context, dropData) {
    const { x, y, opacity } = dropData;
    this.x = x;
    this.y = y;
    this.opacity = opacity * 0.9;
    context.strokeStyle = "rgb(0,0,0,0)";
    context.beginPath();
    context.arc(this.x, this.y, this.dropSize, 0, Math.PI * 2);
    context.stroke();
    context.fillStyle = `rgb(180,180,180,${this.opacity})`;
    context.fill();
  }

  getData() {
    const data = {
      x: this.x,
      y: this.y,
      opacity: this.opacity,
    };
    return data;
  }
}
