class Player {
  constructor({ position }) {
    this.position = position;
    this.width = 50;
    this.height = 50;
  }

  draw() {
    c.fillStyle = "white";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
  }
}
