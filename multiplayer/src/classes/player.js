class Player {
  constructor({ position }) {
    this.position = position;
    this.hp = 100;
  }

  draw() {
    c.fillStyle = "white";
    c.fillRect(this.position.x, this.position.y, this.hp, this.hp);
  }
  update() {
    this.draw();
  }
}
