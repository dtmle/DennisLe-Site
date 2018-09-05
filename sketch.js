const bubbles = [];
const backgroundBubbles = [];

function bubblePressed() {
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].clicked(mouseX, mouseY);
    if (bubbles[i].isHighlighted()) {
      bubbles[i].changeColor(0);
    }
  }
}

function mouseMoved() {
  for (let i = 0; i < bubbles.length; i++) {
    let currBub = bubbles[i];
    let distance = dist(currBub.x, currBub.y, mouseX, mouseY);
    if (distance < currBub.r * 10) {
      let moveDown = mouseY - currBub.y <= 0 ? true : false;
      let moveRight = mouseX - currBub.x <= 0 ? true : false;
      if (moveDown) {
        currBub.deltY = [0, 10];
      } else {
        currBub.deltY = [-10, 0];
      }
      if (moveRight) {
        currBub.deltX = [0, 10];
      } else {
        currBub.deltX = [-10, 0];
      }
    } else {
      currBub.deltX = [-2, 2];
      currBub.deltY = [-2, 2];
    }
  }
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.mousePressed(bubblePressed);
  for (let i = 0; i < 200; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(10, 40);
    let bub = new Bubble(x, y, r);
    bubbles.push(bub);
  }
  for (let i = 0; i < 500; i++) {
    let backX = random(width);
    let backY = random(height);
    let backR = random(2, 5);
    let backgroundBub = new Bubble(backX, backY, backR);
    backgroundBubbles.push(backgroundBub);
  }
}

function draw() {
  background(0);
  for (let i = 0; i < bubbles.length; i++) {
    for (let j = i + 1; j < bubbles.length; j++) {
      if (bubbles[i].intersects(bubbles[j])) {
        bubbles[i].changeColor(255);
        bubbles[j].changeColor(255);
      }
    }
  }
  for (let i = 0; i < bubbles.length; i++) {
    let currBub = bubbles[i];
    currBub.move(currBub.deltX, currBub.deltY);
    currBub.show();
  }
  for (let i = 0; i < backgroundBubbles.length; i++) {
    let currBub = backgroundBubbles[i];
    currBub.move([-2, 2], [-2, 2]);
    currBub.show();
  }
}

class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.deltX = [-2, 2];
    this.y = y;
    this.deltY = [-2, 2];
    this.r = r;
    this.brightness = 0;
    this.isClicked = false;
  }

  intersects(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    if (d < this.r + other.r) {
      return true;
    } else {
      return false;
    }
  }

  clicked(px, py) {
    let distance = dist(px, py, this.x, this.y);
    if (distance < this.r) {
      if (this.isClicked) {
        this.isClicked = false;
      } else {
        this.isClicked = true;
      }
      if (this.isHighlighted() && !this.isClicked) {
        this.brightness = 0;
      } else {
        this.brightness = 255;
      }
    }
  }

  move(x, y) {
    if (!this.isClicked) {
      this.x = this.x + random(x[0], x[1]);
      this.y = this.y + random(y[0], y[1]);
      this.x = constrain(this.x, 0 + this.r, width - this.r);
      this.y = constrain(this.y, 0 + this.r, height - this.r);
    } else {
      this.x = mouseX;
      this.y = mouseY;
    }
  }

  show() {
    stroke(0, 125);
    strokeWeight(15);
    fill(this.brightness, 125, 125);
    ellipse(this.x, this.y, this.r * 2);
  }

  changeColor(brightness) {
    this.brightness = brightness;
  }

  isHighlighted() {
    if (this.brightness === 255) {
      return true;
    } else {
      return false;
    }
  }
}
