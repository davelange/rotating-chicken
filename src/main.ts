import { model, eyelid } from "./chicken";
import { ZAnimation } from "./zanimation";
import { addMousemoveListener } from "./listeners/mousemove";
import { addJumpListeners } from "./listeners/jump";
import { addOrientationListener } from "./listeners/orientation";

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
export const bounceUp = new ZAnimation({
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
addMousemoveListener();
addJumpListeners();
addOrientationListener();
