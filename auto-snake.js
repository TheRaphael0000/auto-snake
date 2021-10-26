let canvas_w = 1280;
let canvas_h = 720;

let fruit;
let snake;

let size = 36;

function setup() {
  createCanvas(canvas_w, canvas_h);
  fruit = createVector(random(canvas_w), random(canvas_h));
  snake = new Snake(random(canvas_w), random(canvas_h), size, 1, 0.9);
}

function draw() {
  clear();
  strokeWeight(0);
  background(32, 32, 32, 200);
  ellipseMode(CENTER);

  fill(255);
  circle(fruit.x, fruit.y, size);

  snake.draw();
  if (snake.update(fruit)) {
    fruit = createVector(random(canvas_w), random(canvas_h));
  }
  fill(255);
  textSize(72);
  textAlign(RIGHT);
  text("" + snake.part.length, canvas_w - 20, 72);
}

function distance_point_line(x0, y0, x1, y1, x2, y2) {
  let num = abs((x2 - x1) * (y1 - y0) - (x1 - x0) * (y2 - y1));
  let den = sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  return num / den;
}
