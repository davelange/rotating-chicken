import Zdog from "zdog";

export const sceneSize = 80;
export const isSpinning = false;
export const TAU = Zdog.TAU;
export const white = "#fefefe";
export const yellow = "#fbdf3e";
export const darkGrey = "#333";
export const red = "#f5594e";
export let rotation = {
  initialY: Zdog.TAU / 4,
  initialX: -Zdog.TAU / 1,
  xStep: Zdog.TAU / 100,
  yStep: Zdog.TAU / 200,
};
export const crestData = [
  {
    path: [
      { x: -4.5, y: -11 },
      { x: -5, y: -11.5 },
    ],
  },
  {
    path: [
      { x: -1.5, y: -11.5 },
      { x: -1.5, y: -13 },
    ],
  },
  {
    path: [
      { x: 2, y: -11 },
      { x: 2, y: -14 },
    ],
  },
  {
    path: [
      { x: 5, y: -10 },
      { x: 6, y: -14 },
    ],
  },
  {
    path: [
      { x: 7, y: -9 },
      { x: 10, y: -13 },
    ],
  },
];
