class Snake {
  constructor(x, y, size, acc_mag, frictions) {
    this.part = [createVector(x, y)];
    this.size = size;
    this.acc_mag = acc_mag;
    this.frictions = frictions;
    this.vel = createVector(0, 0);
  }

  update(fruit) {
    this.update_head(fruit);
    this.check_colisions();
    this.update_tail();
    return this.check_fruit(fruit);
  }

  update_head(fruit) {
    let head = this.part[0];

    let target = fruit.copy();
    // target.add(createVector(random(this.size / 2), random(this.size / 2)));

    let acc = p5.Vector.sub(target, head);
    acc.setMag(this.acc_mag);

    this.vel.add(acc);
    head.add(this.vel);

    this.vel.mult(this.frictions);
  }

  check_colisions() {
    let head = this.part[0];
    if (this.part.length > 2) {
      // check if the head enter in the tail
      for (let i = 1; i < this.part.length; i++) {
        let dist = p5.Vector.sub(head, this.part[i]);
        if (dist.mag() < this.size / 2 && i != 0) {
          this.part = this.part.slice(0, i);
        }
      }
    }
  }

  update_tail() {
    for (let i = 1; i < this.part.length; i++) {
      let previous = this.part[i];
      let next = this.part[i - 1];

      let dir = p5.Vector.sub(next, previous);
      if (dir.mag() > this.size) {
        dir.setMag(this.size);
        dir = p5.Vector.sub(next, dir)
        previous.set(dir);
      }
    }
  }

  check_fruit(fruit) {
    let head = this.part[0];
    if (p5.Vector.sub(fruit, head).mag() < this.size / 2) {
      let last_part_id = this.part.length - 1;
      this.part.push(createVector(this.part[last_part_id].x, this.part[last_part_id].y));
      return true;
    }
    return false;
  }

  draw() {
    for (let i = 0; i < this.part.length; i++) {
      fill(0, 255 - (8 * i), 100);
      circle(this.part[i].x, this.part[i].y, this.size);
    }
  }
}
