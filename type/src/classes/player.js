class Player {
  constructor({ words }) {
    this.words = words;
    this.hp = 100;
  }

  draw() {
    c.fillStyle = this.color;

    c.font = "100px arial"; // Adjust font size as needed
    c.fillStyle = "#FFF";

    // Draw each word vertically
    this.words.forEach((word, index) => {
      c.fillText(word, 300, 300 + index * 150); // Adjust vertical spacing as needed
    });
  }

  update() {
    this.draw();
  }
}
