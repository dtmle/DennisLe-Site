const bubbles = [];
const backgroundBubbles = [];
let center = "";
let liIcon = "";
let ghIcon = "";
let h1 = "";

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  frameRate(30);
  canvas.mousePressed(bubblePressed);

  center = selectAll(".Holder")[0];

  liIcon = selectAll(".LinkedIn")[0];
  liIcon.mouseOver(iconHover);
  liIcon.mouseOut(iconOff);

  ghIcon = selectAll(".GitHub")[0];
  ghIcon.mouseOver(iconHover);
  ghIcon.mouseOut(iconOff);

  h1 = selectAll("h1")[0];
  h1.mouseOver(nameHover);
  h1.mouseOut(nameOff);

  let leftBound = windowWidth / 2 - center.width / 2;
  let rightBound = windowWidth / 2 + center.width / 2;
  let bottomBound = windowHeight / 2 + center.height / 2 + 25;
  let topBound = windowHeight / 2 - center.height / 2 - 25;

  for (let i = 0; i < 200; i++) {
    let x = floor(random(windowWidth));
    let y = floor(random(windowHeight));
    while (
      x > leftBound &&
      x < rightBound &&
      (y < bottomBound && y > topBound)
    ) {
      x = floor(random(windowWidth));
      y = floor(random(windowHeight));
    }
    let r = random(5, 20);
    let bub = new Bubble(x, y, r);
    bubbles.push(bub);
  }
  for (let i = 0; i < 500; i++) {
    let x = random(windowWidth);
    let y = random(windowHeight);
    while (
      x > leftBound &&
      x < rightBound &&
      (y < bottomBound && y > topBound)
    ) {
      x = floor(random(windowWidth));
      y = floor(random(windowHeight));
    }
    let r = random(2, 2);
    let backgroundBub = new Bubble(x, y, r);
    backgroundBubbles.push(backgroundBub);
  }
}

function draw() {
  background(0);
  for (let i = 0; i < bubbles.length; i++) {
    for (let j = i + 1; j < bubbles.length; j++) {
      if (bubbles[i].intersects(bubbles[j])) {
        bubbles[i].isusingAlt = true;
        bubbles[j].isusingAlt = true;
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
    currBub.move(currBub.deltX, currBub.deltY);
    currBub.show();
  }
}
