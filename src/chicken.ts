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

export let illo = new Zdog.Illustration({
  element: ".zdog-canvas",
  dragRotate: true,
  resize: true,
  rotate: { x: rotation.initialX, y: rotation.initialY },
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

export let negativeEye = new Zdog.Shape({
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
