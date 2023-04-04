import { easeOutBounce, easeOutCirc } from "./easing";
import { Scene } from "./main";

type Easing = "easeOutCirc" | "easeOutBounce";

export class ZAnimation {
  duration: number;
  /* halfDuration: number;
  direction: 1 | -1 = 1; */
  frame = 0;
  force: number;
  running = false;
  points: number[] = [];
  easing: Easing = "easeOutCirc";
  easeAcc = 0;
  onEnd?: () => void;
  apply: (val: number) => void;

  constructor(options: {
    duration: number;
    force: number;
    interval?: number;
    easing: Easing;
    addTo: Scene;
    apply: (val: number) => void;
    onEnd?: () => void;
  }) {
    this.duration = options.duration;
    this.force = options.force;
    this.easing = options.easing;
    this.apply = options.apply;
    this.onEnd = options.onEnd;

    if (options.interval) {
      this.schedule(options.interval);
    }

    options.addTo.animations.push(this);
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

    /* if (this.frame === this.halfDuration) {
      this.direction *= -1;
      this.easeAcc = 0;
      this.points = [];
    } */

    const val = this.calcEasedValue();
    this.apply(val);

    if (this.frame === this.duration) {
      this.frame = 0;
      this.easeAcc = 0;
      /* this.direction = 1; */
      this.stop();
      this.onEnd?.();
    }
  }

  calcEasedValue() {
    const progressDecimal = (this.frame * 100) / this.duration / 100;

    let easedVal = 0;

    /* if (this.direction === 1) {
    } else {
      easedVal = easeOutBounce(progressDecimal - 1);
    } */

    switch (this.easing) {
      case "easeOutCirc":
        easedVal = easeOutCirc(progressDecimal);
        break;

      case "easeOutBounce":
        easedVal = easeOutBounce(progressDecimal);
        break;
    }

    const frameEase = easedVal - this.easeAcc;
    this.easeAcc += frameEase;

    return frameEase * this.force;
  }

  getIncrement() {
    const ease = this.calcEasedValue();

    return ease /*  * this.direction */;
  }
}
