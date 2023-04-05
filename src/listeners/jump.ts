import { bounceUp } from "../main";

export function addJumpListeners() {
  document.addEventListener("keydown", (evt) => {
    if (evt.code === "Space") {
      bounceUp.start();
    }
  });

  document.addEventListener("click", () => {
    bounceUp.start();
  });
}
