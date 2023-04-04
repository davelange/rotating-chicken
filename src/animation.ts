function easeOutCirc(x: number): number {
  return Math.sqrt(1 - Math.pow(x - 1, 2));
}

export class ZAnimation {
  duration: number;
  direction: 1 | -1 = 1;
  frame = 0;
  force: number;
  running = false;
  points: number[] = [];
  easeAcc = 0;

  constructor(options: { duration: number; force: number; interval?: number }) {
    this.duration = options.duration;
    this.force = options.force;

    if (options.interval) {
      this.schedule(options.interval);
    }
  }

  schedule(interval: number) {
    setInterval(() => {
      this.running = true;
    }, interval);
  }

  start() {
    this.running = true;
  }

  stop() {
    this.running = false;
  }

  handleFrame() {
    this.frame++;

    if (this.frame === this.duration) {
      this.direction *= -1;
    }

    if (this.frame === this.duration * 2) {
      this.frame = 0;
      this.running = false;
      this.direction = 1;
    }
  }

  calcEasedValue() {
    const progressDecimal = (this.frame * 100) / this.duration / 100;
    const easedVal = easeOutCirc(progressDecimal);
    const frameEase = easedVal - this.easeAcc;
    const val = frameEase * this.force;
    this.easeAcc += frameEase;
    this.points.push(val);
  }

  getIncrement() {
    if (this.points.length <= this.duration) {
      this.calcEasedValue();
    }

    let point = this.frame;

    if (this.direction === -1) {
      point = this.duration - (this.frame - this.duration);
    }

    return this.points[point] * this.direction;
  }
}
