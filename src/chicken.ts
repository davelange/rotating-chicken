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

// main model
export let model = new Zdog.Illustration({
  element: ".zdog-canvas",
  resize: true,
  dragRotate: true,
  rotate: { x: rotation.initialX, y: rotation.initialY },
  onResize: function (width, height) {
    this.zoom = Math.floor(Math.min(width, height) / sceneSize);
  },
});

let crestGroup = new Zdog.Group({
  addTo: model,
});

// create all crest shapes
crestData.forEach((item) => {
  new Zdog.Shape({
    addTo: crestGroup,
    stroke: 4.5,
    color: red,
    ...item,
  });
});

// head
new Zdog.Hemisphere({
  stroke: 6,
  diameter: 15,
  addTo: model,
  color: white,
  rotate: { x: Zdog.TAU / 4 },
});

// neck
new Zdog.Cylinder({
  stroke: 6,
  diameter: 15,
  length: 14,
  addTo: model,
  color: white,
  frontFace: white,
  backface: white,
  rotate: { x: Zdog.TAU / 4, z: Zdog.TAU },
  translate: { y: 8 },
});

// beak
new Zdog.Cone({
  addTo: model,
  diameter: 4,
  length: 5.5,
  stroke: 2,
  color: yellow,
  backface: yellow,
  rotate: { y: -Zdog.TAU / 4 },
  translate: { x: 11, y: 4 },
});

// eyes group
let eyesGroup = new Zdog.Group({
  addTo: model,
});

// left eye
let eye1 = new Zdog.Shape({
  addTo: eyesGroup,
  stroke: 1.5,
  color: darkGrey,
  translate: { x: 8, y: -1, z: 3 },
});

// right eye
eye1.copy({
  translate: { x: 8, y: -1, z: -3 },
});

// invisible shape to balance eyes z index
eye1.copy({
  translate: { x: 2, y: -1, z: -3 },
  visible: false,
});

// eyelid
export let eyelid = new Zdog.Shape({
  addTo: model,
  path: [
    { x: 8, y: -3.2, z: -3.4 },
    { x: 8, y: -3.2, z: 3.4 },
  ],
  stroke: 2,
  color: white,
});

// beard thing
new Zdog.Shape({
  addTo: model,
  stroke: 3.2,
  path: [
    { x: 11, y: 9 },
    { x: 11, y: 11 },
  ],
  color: red,
});
