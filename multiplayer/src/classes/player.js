class Player {
  constructor({ position, color }) {
    this.position = position;
    this.hp = 100;
    this.color = color;
  }

  draw() {
    c.fillStyle = this.color;
    let size = this.hp * devicePixelRatio;
    c.fillRect(this.position.x, this.position.y, size, size);
  }
  update() {
    this.draw();
  }
}
