class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.deltX = [-0.2, 0.2];
    this.y = y;
    this.deltY = [-0.2, 0.2];
    this.r = r;
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
    if (distance < this.r * 20) {
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
    } else {
      let moveDown = mouseY - this.y >= 0 ? true : false;
      let moveRight = mouseX - this.x >= 0 ? true : false;
      if (this.y !== mouseY) {
        if (moveDown) {
          this.y = this.y + random(4, 8);
        } else {
          this.y = this.y - random(4, 8);
        }
        if (moveRight) {
          this.x = this.x + random(4, 8);
        } else {
          this.x = this.x - random(4, 8);
        }
      }
      //   this.x = mouseX;
      //   this.y = mouseY;
    }
    this.x = constrain(this.x, 0 + this.r, width - this.r);
    this.y = constrain(this.y, 0 + this.r, height - this.r);
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
