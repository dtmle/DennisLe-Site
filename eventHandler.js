function bubblePressed() {
  for (let i = 0; i < bubbles.length; i++) {
    let currBub = bubbles[i];
    currBub.clicked(mouseX, mouseY);
    if (currBub.isHighlighted()) {
      currBub.isusingAlt = false;
    }
  }
}

function bubbleHover(bubbles) {
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
      currBub.deltX = [-0.5, 0.5];
      currBub.deltY = [-0.5, 0.5];
    }
  }
}

function mouseMoved() {
  bubbleHover(bubbles);
  bubbleHover(backgroundBubbles);
}

function iconHover() {
  if (this.elt.className === "LinkedIn") {
    this.elt.style.filter = "brightness(0.35)";
  } else {
    this.elt.style.filter = "brightness(0.35)";
  }
}

function iconOff() {
  if (this.elt.className === "LinkedIn") {
    this.elt.style.filter = "brightness(1)";
  } else {
    this.elt.style.filter = "brightness(1)";
  }
}

function nameHover() {
  this.elt.style.color = "rgb(70, 72, 73)";
}

function nameOff() {
  this.elt.style.color = "rgb(255, 255, 255)";
}
