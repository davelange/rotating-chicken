import { rotation } from "./constants";
import { model, eyelid } from "./chicken";
import { ZAnimation } from "./animation";

const bounce = new ZAnimation({
  duration: 60,
  force: 6.8,
});

const blink = new ZAnimation({
  duration: 18,
  force: 1.4,
  interval: 4000,
});

function animate() {
  if (bounce.running) {
    model.translate.y -= bounce.getIncrement();
    bounce.handleFrame();
  }

  if (blink.running) {
    eyelid.translate.y += blink.getIncrement();
    blink.handleFrame();
  }

  model.updateRenderGraph();

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
    const xMotion = calcMotion(window.innerWidth, evt.clientX, 340);
    const yMotion = calcMotion(window.innerHeight, evt.clientY, 300);

    if (xMotion !== null)
      model.rotate.y = rotation.initialY + xMotion * rotation.xStep;
    if (yMotion !== null)
      model.rotate.x = rotation.initialX + yMotion * rotation.yStep;
  });

  document.addEventListener("keydown", (evt) => {
    if (evt.code === "Space") {
      bounce.start();
    }
  });

  document.addEventListener("click", () => {
    bounce.start();
  });
}

addPointerListen();
animate();
