class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.deltX = [-0.5, 0.5];
    this.y = y;
    this.deltY = [-0.5, 0.5];
    this.r = r;
    this.brightness = 0;
    this.color = "#464849";
    this.altColor = "#757a7c";
    this.isusingAlt = false;
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
        this.isusingAlt = true;
      } else {
        this.isusingAlt = false;
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
    if (this.isusingAlt) {
      fill(this.altColor);
    } else {
      fill(this.color);
    }
    ellipse(this.x, this.y, this.r * 2);
  }

  isHighlighted() {
    if (this.isusingAlt) {
      return true;
    } else {
      return false;
    }
  }
}
