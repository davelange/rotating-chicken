import Zdog from "zdog";
import {
  red,
  yellow,
  white,
  darkGrey,
  sceneSize,
  crestData,
  rotation,
} from "./constants";

const scene = {
  isSpinning: false,
};

let illo = new Zdog.Illustration({
  element: ".zdog-canvas",
  dragRotate: true,
  resize: true,
  rotate: { x: rotation.initialX, y: rotation.initialY },
  onDragStart: function () {
    scene.isSpinning = false;
  },
  onResize: function (width, height) {
    this.zoom = Math.floor(Math.min(width, height) / sceneSize);
  },
});

let chicken = new Zdog.Anchor({
  addTo: illo,
});

let crestGroup = new Zdog.Group({
  addTo: illo,
});

crestData.forEach((item) => {
  new Zdog.Shape({
    addTo: crestGroup,
    stroke: 4.5,
    color: red,
    ...item,
  });
});

let headGroup = new Zdog.Group({
  addTo: illo,
});

let head = new Zdog.Hemisphere({
  stroke: 6,
  diameter: 15,
  addTo: headGroup,
  color: white,
  rotate: { x: Zdog.TAU / 4 },
});

let neck = new Zdog.Cylinder({
  stroke: 6,
  diameter: 15,
  length: 14,
  addTo: headGroup,
  color: white,
  frontFace: white,
  backface: white,
  rotate: { x: Zdog.TAU / 4, z: Zdog.TAU },
  translate: { y: 8 },
});

let beak = new Zdog.Cone({
  addTo: chicken,
  diameter: 4,
  length: 5.5,
  stroke: 2,
  color: yellow,
  backface: yellow,
  rotate: { y: -Zdog.TAU / 4 },
  translate: { x: 11, y: 4 },
});

let eyesGroup = new Zdog.Group({
  addTo: chicken,
});

let eye1 = new Zdog.Shape({
  addTo: eyesGroup,
  stroke: 1.5,
  color: darkGrey,
  translate: { x: 8, y: -1, z: 3 },
});

let eye2 = eye1.copy({
  translate: { x: 8, y: -1, z: -3 },
});

let counterBalance = eye1.copy({
  translate: { x: 2, y: -1, z: -3 },
  visible: false,
});

let negativeEye = new Zdog.Shape({
  addTo: illo,
  path: [
    { x: 8, y: -3, z: -3.4 },
    { x: 8, y: -3, z: 3.4 },
  ],
  stroke: 2,
  color: white,
});

let beardThing = new Zdog.Shape({
  addTo: chicken,
  stroke: 3.2,
  path: [
    { x: 11, y: 9 },
    { x: 11, y: 11 },
  ],
  color: red,
});

let blinkAnim = {
  duration: 15,
  frame: 0,
  running: false,
  direction: 1,
  start: () =>
    setInterval(() => {
      blinkAnim.running = true;
    }, 4000),
  getIncrement: function () {
    let progress = this.frame / this.duration;
    let tween = Zdog.easeInOut(progress % 1, 3);
    return tween * 0.2 * blinkAnim.direction;
  },
};

function animate() {
  if (scene.isSpinning) {
    illo.rotate.y -= 0.03;
  }

  if (blinkAnim.running) {
    blinkAnim.frame++;
    negativeEye.translate.y += blinkAnim.getIncrement();

    if (blinkAnim.frame === blinkAnim.duration) {
      blinkAnim.direction = -1;
    }

    if (blinkAnim.frame === blinkAnim.duration * 2) {
      blinkAnim.frame = 0;
      blinkAnim.running = false;
      blinkAnim.direction = 1;
    }
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
}

addPointerListen();
animate();
blinkAnim.start();
