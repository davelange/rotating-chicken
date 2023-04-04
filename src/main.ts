import { rotation } from "./constants";
import { illo, negativeEye } from "./chicken";
import { ZAnimation } from "./animation";

export const scene = {
  isSpinning: false,
};

const bounceAnim = new ZAnimation({
  duration: 20,
  force: 1.8,
});

const blinkAnim = new ZAnimation({
  duration: 15,
  force: 0.2,
  interval: 4000,
});

function animate() {
  if (scene.isSpinning) {
    illo.rotate.y -= 0.03;
  }

  if (bounceAnim.running) {
    illo.translate.y -= bounceAnim.getIncrement();
    bounceAnim.handleFrame();
  }

  if (blinkAnim.running) {
    negativeEye.translate.y += blinkAnim.getIncrement();
    blinkAnim.handleFrame();
  }

  illo.updateRenderGraph();

  requestAnimationFrame(animate);
}

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
    const xMotion = calcMotion(window.innerWidth, evt.clientX, 140);
    const yMotion = calcMotion(window.innerHeight, evt.clientY, 100);

    if (xMotion !== null)
      illo.rotate.y = rotation.initialY + xMotion * rotation.step;
    if (yMotion !== null)
      illo.rotate.x = rotation.initialX + yMotion * rotation.step;
  });

  document.addEventListener("keydown", (evt) => {
    if (evt.code === "Space") {
      bounceAnim.start();
    }
  });
}

addPointerListen();
animate();
