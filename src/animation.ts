import Zdog from "zdog";

export class ZAnimation {
  duration: number;
  direction: 1 | -1 = 1;
  frame = 0;
  force: number;
  running = false;
  points: number[] = [];

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

  getIncrement() {
    if (this.points.length <= this.duration) {
      let progress = this.frame / this.duration;
      let tween = Zdog.easeInOut(progress % 1, 5);
      this.points.push(tween);
    }

    let point = this.frame;

    if (this.direction === -1) {
      point = this.duration - (this.frame - this.duration);
    }

    return this.points[point] * this.force * this.direction;
  }
}
