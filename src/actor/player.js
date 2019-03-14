import Actor from "./actor";
import * as PIXI from "pixi.js";

function createPlayerSprite() {
  let playerSprite = new PIXI.Graphics();
  playerSprite.beginFill(0x6330ff);
  playerSprite.drawEllipse(0, 0, 40, 15);
  playerSprite.endFill();
  playerSprite.beginFill(0xffe0bd);
  playerSprite.drawCircle(0, 0, 20);
  playerSprite.drawPolygon([
    -15, 15,
    0, -28,
    15, 15,
  ]);
  playerSprite.endFill();
  playerSprite.pivot.set(0, 0);
  playerSprite.scale.set(1.2);
  return playerSprite;
}

export default class Player extends Actor {
  constructor(app, options) {
    super(app.stage, createPlayerSprite(), Object.assign({}, options, {
      pos: {
        x: app.view.width / 2,
        y: app.view.height / 2,
        rotation: Math.PI,
      },
    }));
    this.app = app;
  }
  setPosition(pos) {
    super.setPosition(pos);
    if (this.app) { // If not initial position
      this.parent.position.set(
        this.app.view.width / 2 - this.pos.x,
        this.app.view.height / 2 - this.pos.y
      );
    }
  }
}
