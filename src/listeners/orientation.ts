import { model } from "../chicken";
import { isMobile } from "../utils";

// gamma = left / right motion
// beta = tilt forwards / backwards motion

const DEBOUNCE_INTERVAL = 10;
const DAMPING = 20;
const THRESHOLD = {
  x: {
    low: -6.8,
    high: -5.7,
  },
  y: {
    low: 0.5,
    high: 2.5,
  },
};

const state: {
  enabled: boolean;
  gamma: number | undefined;
  beta: number | undefined;
  startDebounce: () => void;
  calcDiff: (newVal: number, axis: "gamma" | "beta") => number;
} = {
  enabled: true,
  gamma: undefined,
  beta: undefined,
  startDebounce: function () {
    this.enabled = false;

    setTimeout(() => {
      state.enabled = true;
    }, DEBOUNCE_INTERVAL);
  },
  calcDiff: function (newVal, axis) {
    return (this[axis]! - newVal) / DAMPING;
  },
};

function handleEvent(event: DeviceOrientationEvent) {
  if (event?.gamma === null || event.beta === null || !state.enabled) {
    return;
  }

  state.startDebounce();

  if (state.gamma !== undefined && state.beta !== undefined) {
    const newY = model.rotate.y + state.calcDiff(event.gamma, "gamma");
    const newX = model.rotate.x + state.calcDiff(event.beta, "beta");

    if (newY <= THRESHOLD.y.high && newY >= THRESHOLD.y.low) {
      model.rotate.y = newY;
    }

    if (newX <= THRESHOLD.x.high && newX >= THRESHOLD.x.low) {
      model.rotate.x = newX;
    }
  }

  state.gamma = event.gamma;
  state.beta = event.beta;
}

export function addOrientationListener() {
  if (!isMobile()) return;

  window.addEventListener("deviceorientation", handleEvent);
}
