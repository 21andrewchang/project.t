class Player {
  constructor({ x, y, color }) {
    this.x = x;
    this.y = y;
    this.hp = 100;
    this.color = color;
    this.message = "";
  }

  draw() {
    c.fillStyle = this.color;
    let size = this.hp * devicePixelRatio;
    c.fillRect(this.x, this.y, size, size);
    if (this.message) {
      c.font = "48px arial";
      c.fillStyle = "#FFF";
      c.fillText(this.message, this.x, this.y - 10);
    }
  }
  update() {
    this.draw();
  }
}
