import { easeOutBounce, easeOutCirc } from "./easing";
import { Scene } from "./main";

type Easing = "easeOutCirc" | "easeOutBounce";

export class ZAnimation {
  duration: number;
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
    if (!this.running) return;

    this.frame++;

    const value = this.calcEasedValue();
    this.apply(value);

    if (this.frame === this.duration) {
      this.frame = 0;
      this.easeAcc = 0;
      this.stop();
      this.onEnd?.();
    }
  }

  calcEasedValue() {
    const progressDecimal = (this.frame * 100) / this.duration / 100;

    let easedVal = 0;

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
}
