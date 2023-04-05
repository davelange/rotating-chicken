import { model } from "../chicken";
import { rotation } from "../constants";
import { isMobile } from "../utils";

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

export function addMousemoveListener() {
  if (isMobile()) {
    return;
  }

  document.addEventListener("mousemove", (evt) => {
    const xMotion = calcMotion(window.innerWidth, evt.clientX, 340);
    const yMotion = calcMotion(window.innerHeight, evt.clientY, 300);

    if (xMotion !== null)
      model.rotate.y = rotation.initialY + xMotion * rotation.xStep;
    if (yMotion !== null)
      model.rotate.x = rotation.initialX + yMotion * rotation.yStep;
  });
}
