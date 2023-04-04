import { easeOutBounce, easeOutCirc } from "./easing";

export class ZAnimation {
  duration: number;
  halfDuration: number;
  direction: 1 | -1 = 1;
  frame = 0;
  force: number;
  running = false;
  points: number[] = [];
  easeAcc = 0;

  constructor(options: { duration: number; force: number; interval?: number }) {
    this.duration = options.duration;
    this.halfDuration = Math.round(options.duration / 2);
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

    if (this.frame === this.halfDuration) {
      this.direction *= -1;
      this.easeAcc = 0;
      this.points = [];
    }

    if (this.frame === this.duration) {
      this.frame = 0;
      this.easeAcc = 0;
      this.direction = 1;
      this.stop();
    }
  }

  calcEasedValue() {
    const progressDecimal = (this.frame * 100) / this.halfDuration / 100;

    let easedVal = 0;

    if (this.direction === 1) {
      easedVal = easeOutCirc(progressDecimal);
    } else {
      easedVal = easeOutBounce(progressDecimal - 1);
    }

    const frameEase = easedVal - this.easeAcc;
    this.easeAcc += frameEase;

    return frameEase * this.force;
  }

  getIncrement() {
    const ease = this.calcEasedValue();

    return ease * this.direction;
  }
}
