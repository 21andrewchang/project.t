class Player {
  constructor({ x, y, color }) {
    this.x = x;
    this.y = y;
    this.hp = 100;
    this.color = color;
  }

  draw() {
    c.fillStyle = this.color;
    let size = this.hp * devicePixelRatio;
    c.fillRect(this.x, this.y, size, size);
  }
  update() {
    this.draw();
  }
}
