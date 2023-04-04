import { rotation } from "./constants";
import { model, eyelid } from "./chicken";
import { ZAnimation } from "./animation";

export type Scene = {
  animations: ZAnimation[];
  runAnimations: () => void;
};

export const scene: Scene = {
  animations: [],
  runAnimations: function () {
    this.animations.forEach((item) => {
      if (item.running) item.handleFrame();
    });
  },
};

const bounceDown = new ZAnimation({
  duration: 40,
  force: 6.8,
  easing: "easeOutBounce",
  addTo: scene,
  apply: (val) => {
    model.translate.y += val;
  },
});
const bounceUp = new ZAnimation({
  duration: 36,
  force: 6.8,
  easing: "easeOutCirc",
  addTo: scene,
  onEnd: () => bounceDown.start(),
  apply: (val) => {
    model.translate.y -= val;
  },
});
const blinkUp = new ZAnimation({
  duration: 22,
  force: 1.4,
  easing: "easeOutCirc",
  addTo: scene,
  apply: (val) => {
    eyelid.translate.y -= val;
  },
});
const blinkDown = new ZAnimation({
  duration: 18,
  force: 1.4,
  interval: 4000,
  easing: "easeOutCirc",
  addTo: scene,
  apply: (val) => {
    eyelid.translate.y += val;
  },
  onEnd: () => {
    blinkUp.start();
  },
});

function animate() {
  scene.runAnimations();
  model.updateRenderGraph();

  requestAnimationFrame(animate);
}

animate();

function addPointerListen() {
  function calcMotion(window: number, pos: number, threshhold: number) {
    const mid = window / 2;
    const diff = mid - pos;
    const dir = diff > 0 ? 1 : -1;
    const absDiff = Math.abs(diff);

    if (absDiff > threshhold) {
      return null;
    }

    return ((absDiff * 5) / 100) * dir;
  }

  document.addEventListener("mousemove", (evt) => {
    const xMotion = calcMotion(window.innerWidth, evt.clientX, 340);
    const yMotion = calcMotion(window.innerHeight, evt.clientY, 300);

    if (xMotion !== null)
      model.rotate.y = rotation.initialY + xMotion * rotation.xStep;
    if (yMotion !== null)
      model.rotate.x = rotation.initialX + yMotion * rotation.yStep;
  });

  document.addEventListener("keydown", (evt) => {
    if (evt.code === "Space") {
      bounceUp.start();
    }
  });

  document.addEventListener("click", () => {
    bounceUp.start();
  });
}

addPointerListen();
