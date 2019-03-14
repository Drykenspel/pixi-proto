import Player from "./actor/player";
import * as PIXI from "pixi.js";
import { debounce } from "debounce";

export default class Client extends PIXI.Application {
  protected localPlayer?: Player
  readonly world: PIXI.Container;
  readonly gui: PIXI.Container;
  constructor(domParent: HTMLElement, pixiOpts?: PIXI.ApplicationOptions) {
    super(Object.assign({
      resizeTo: window,
      autoDensity: true,
    }, pixiOpts, { backgroundColor: 0xcecece }));
    domParent.appendChild(this.view);
    // Add resize handler (fires at most every 200ms)
    window.addEventListener("resize", debounce(() => this.resize(), 200));

    this.stage.addChild(this.world = new PIXI.Container());
    this.stage.addChild(this.gui = new PIXI.Container());

    this.loader.on('complete', (loader, resources) => {
      this.localPlayer = new Player(this);
    });
  }
  resize(): void {
    super.resize();
    if (this.player) {
      this.player.setPosition(this.player.getPosition());
    }
  }
  get player(): Player {
    if (!this.localPlayer) {
      throw Error("Tried to retrieve local Player before loading has completed!");
    }
    return this.localPlayer!;
  }
}
