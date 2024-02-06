//just a code doodle for generative knitting - needs clean up

//32x3 is 96 - a great knitting hat size with worsted weight.
//make a 2cm ribbing with a smaller needle (like a 4/5)
//go to a larger needle and start pattern
//when the hat approaches depth, start closing in preffered method (I like to decrease 3-4 stitches every other row for awhile and then close up.)
//for 2 colors, just make 2 the same

let ncol = 32;
let nrow = 32;
let nrepeatCol = 4;
let nrepeatRow = 5;
let d;
let pattern;
let c1 = [150, 200, 250];
let c2 = [10, 100, 155];
let c3 = [0, 20, 50];
let newN = 4;
let newN2 = 5;
let tileM = "regular";

function setup() {
  c = max(600, min(windowWidth, windowHeight) * 0.8);
  cnv = createCanvas(c, c);
  if (typeof c11 === "undefined") {
    c11 = color(c1);
    c22 = color(c2);
    c33 = color(c3);
  }
  nrepeatCol = newN;
  nrepeatRow = newN2;

  colorPicker1 = createColorPicker(c11);
  colorPicker1.position(20, 100);
  colorPicker2 = createColorPicker(c22);
  colorPicker2.position(20, 150);
  colorPicker3 = createColorPicker(c33);
  colorPicker3.position(20, 200);
  button1 = createButton("new");
  button1.position(30, 50);
  button1.mousePressed(clickNew);
  button2 = createButton("save");
  button2.position(20, 450);
  button2.mousePressed(saveIt);
  sel2 = createSelect();
  sel2.position(20, 300);
  sel2.option("regular");
  sel2.option("reflect");
  sel2.selected(tileM);
  sel2.changed(tileMode);
  sel = createSelect();
  sel.position(20, 250);
  sel.option(8);
  sel.option(16);
  sel.option(24);
  sel.option(32);
  sel.option(48);
  sel.option(64);
  sel.selected(nrow);
  sel.changed(newSize);
  d = width / nrow;
  //create pattern
  pattern = [];

  for (let i = 0; i < nrepeatRow; i++) {
    pattern[i] = [];
    for (let j = 0; j < nrepeatCol; j++) {
      pattern[i][j] = floor(random(0, 2.999));
    }
  }
  // console.log(pattern)
}

function draw() {
  patternPlot();
  stroke(200, 0, 0);
  strokeWeight(2);
  line(0, d * newN2, width, d * newN2);
  line(d * newN, 0, d * newN, height);
  fill(100, 0, 0);
  s = width / 8;
  circle(width - s, d * newN2, s);
  fill(100, 0, 0);
  circle(d * newN, height - s, s);
  if (mouseIsPressed) {
    d1 = dist(d * newN, width - s, mouseX, mouseY);
    if (d1 < s / 2 + 10) {
      newN = round(mouseX / d);
      fill(200, 0, 0);
      circle(d * mouseX, height - s, s);
    }
    d2 = dist(width - s, d * newN2, mouseX, mouseY);
    if (d2 < s / 2 + 10) {
      newN2 = round(mouseY / d);
      push();
      fill(200, 0, 0);
      circle(width - s, d * mouseY, s);
      pop();
    }
  }
  if (!mouseIsPressed) {
    if (newN != nrepeatCol || newN2 != nrepeatRow) {
      nrepeatCol = newN;
      c11 = colorPicker1.color();
      c22 = colorPicker2.color();
      c33 = colorPicker3.color();
      nrepeatRow = newN2;
      c11 = colorPicker1.color();
      c22 = colorPicker2.color();
      c33 = colorPicker3.color();
      setup();
    }
  }
}
function tileMode() {
  tileM = sel2.value();
  sel2.selected(tileM);
}
function patternPlot() {
  stroke(255);
  strokeWeight(0.8);
  if (tileM === "regular") {
    for (let l = 0; l < nrow / nrepeatRow; l++) {
      for (let k = 0; k < nrepeatRow; k++) {
        for (let i = 0; i < ncol / nrepeatCol; i++) {
          for (let j = 0; j < nrepeatCol; j++) {
            if (pattern[k][j] === 0) {
              fill(colorPicker1.color());
            } else if (pattern[0][j] === 1) {
              fill(colorPicker2.color());
            } else {
              fill(colorPicker3.color());
            }
            rect(j * d + i * nrepeatCol * d, k * d + l * nrepeatRow * d, d);
          }
        }
      }
    }
  }
  if (tileM === "reflect") {
    for (let l = 0; l < nrow / nrepeatRow; l++) {
      for (let k = 0; k < nrepeatRow; k++) {
        for (let i = 0; i < ncol / nrepeatCol; i++) {
          for (let j = 0; j < nrepeatCol; j++) {
            if (l % 2 === 0) {
              if (pattern[k][j] === 0) {
                fill(colorPicker1.color());
              } else if (pattern[0][j] === 1) {
                fill(colorPicker2.color());
              } else {
                fill(colorPicker3.color());
              }
              rect(j * d + i * nrepeatCol * d, k * d + l * nrepeatRow * d, d);
              rect(
                j * d + i * nrepeatCol * d,
                (2 * nrepeatRow - k - 1) * d + l * nrepeatRow * d,
                d
              );
            }
          }
        }
      }
    }
  }
}
function saveIt() {
  patternPlot();
  save(cnv, "pattern", ".png");
}

function clickNew() {
  c11 = colorPicker1.color();
  c22 = colorPicker2.color();
  c33 = colorPicker3.color();
  setup();
}

function newSize() {
  ncol = sel.value();
  nrow = sel.value();
  sel.selected(nrow);
  nrepeatCol = 4;
  nrepeatRow = 4;
  newN = 4;
  newN2 = 4;

  setup();
}
