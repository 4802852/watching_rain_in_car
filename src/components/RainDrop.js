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

export class DropOnWindow {
  constructor(index, canvasWidth, canvasHeight) {
    this.index = index;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.dropSize = Math.floor(canvasHeight / 60);
    this.wiperThres = canvasWidth / 80;
    this.speedVar = canvasHeight / 500;
    this.minSpeed = canvasHeight / 400;
    this.lengthVar = canvasHeight / 30;
    this.minLength = canvasHeight / 500;
    this.x = Math.random() * this.canvasWidth;
    this.y = Math.random() * this.canvasHeight;
    this.maxSpeed = Math.random() * this.speedVar + this.minSpeed;
    this.length = Math.random() * this.lengthVar + this.minLength;
    this.cnt = 0;
    this.speed = 0;
    this.acceration = 0.05;
  }

  draw(context, wiperData) {
    if (this.speed < this.maxSpeed) this.speed = this.acceration * (this.cnt / 50) * (this.cnt / 50);
    this.cnt++;
    if (this.y > this.canvasHeight) {
      this.update();
    }
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
    } else {
      this.y += this.speed;
    }
    context.strokeStyle = "rgb(0,0,0,00.1)";
    context.beginPath();
    context.arc(this.x, this.y, this.dropSize, 0, 2 * Math.PI);
    context.stroke();
    let grd = context.createRadialGradient(this.x - this.dropSize / 4, this.y - this.dropSize / 4, (this.dropSize / 12) & 7, this.x - this.dropSize / 4, this.y - this.dropSize / 4, this.dropSize);
    grd.addColorStop(0, "rgb(255,255,255,0.3)");
    grd.addColorStop(1, "rgb(50,50,50,0.5");
    context.fillStyle = grd;
    context.fill();
  }

  update() {
    this.x = Math.random() * this.canvasWidth;
    this.y = Math.random() * this.canvasHeight;
    this.maxSpeed = Math.random() * this.speedVar + this.minSpeed;
    this.length = Math.random() * this.lengthVar + this.minLength;
    this.speed = 0;
    this.cnt = 0;
  }
}
