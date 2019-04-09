import * as PIXI from "pixi.js";

declare module "pixi.js" {
  export interface DisplayObject {
    readonly transformChangeRunner: PIXI.Runner;
  }
}

PIXI.DisplayObject.mixin(Object.defineProperty({}, "transformChangeRunner", {
  get() {
    if (!this._onTransformChangeRunner) {
      this._onTransformChangeRunner = new PIXI.Runner("onTransformChange");
      this.transform.position = this.transform.position.clone(() => {
        this.transform.onChange();
        this._onTransformChangeRunner.emit(this.transform, this);
      }, this);
    }
    return this._onTransformChangeRunner;
  },
  enumerable: true,
}));


/**
 * Wraps an instance of `PIXI.Application`.
 * Splits stage into `interface` and `world`.
 * In addition, adds centering and interaction.
 */
export default class Application {
  readonly interface: PIXI.Container;
  readonly world: PIXI.Container;
  cameraTarget?: PIXI.DisplayObject;
  protected app: PIXI.Application;

  constructor(options: PIXI.ApplicationOptions) {
    this.app = new PIXI.Application(options);
    this.world = new PIXI.Container();
    this.interface = new PIXI.Container();
    this.interface.zIndex = 50;
    this.app.stage.addChild(this.world, this.interface);
    //@ts-ignore
    this.app.renderer.runners.resize.add(this);
  }

  centerCamera(transform?: PIXI.Transform): void {
    if (!transform && this.cameraTarget) {
      transform = this.cameraTarget.transform;
    }
    this.world.position.set(
      this.app.view.width / 2 - transform!.position.x,
      this.app.view.height / 2 - transform!.position.y,
    );
  }

  centerOn(displayObj: PIXI.DisplayObject): void {
    if (this.cameraTarget) {
      this.cameraTarget.transformChangeRunner.remove(this);
    }
    this.cameraTarget = displayObj;
    displayObj.transformChangeRunner.add(this);
    this.centerCamera();
  }

  private onTransformChange(transform: PIXI.Transform, displayObj: PIXI.DisplayObject) {
    this.centerCamera(transform);
  }
  private resize() {
    this.centerCamera();
  }

  get loader() {
    return this.app.loader;
  }

  /**
  * Render the current stage.
  */
  render() {
    this.app.render();
  }

  /**
  * Reference to the renderer's canvas element.
  * @member {HTMLCanvasElement}
  * @readonly
  */
  get view(): HTMLCanvasElement {
    return this.app.view;
  }

  /**
  * Reference to the renderer's screen rectangle. Its safe to use as `filterArea` or `hitArea` for the whole screen.
  * @member {PIXI.Rectangle}
  * @readonly
  */
  get screen() {
    return this.app.screen;
  }

  /**
  * Destroy and don't use after this.
  * @param {Boolean} [removeView=false] Automatically remove canvas from DOM.
  * @param {object|boolean} [stageOptions] - Options parameter. A boolean will act as if all options
  *  have been set to that value
  * @param {boolean} [stageOptions.children=false] - if set to true, all the children will have their destroy
  *  method called as well. 'stageOptions' will be passed on to those calls.
  * @param {boolean} [stageOptions.texture=false] - Only used for child Sprites if stageOptions.children is set
  *  to true. Should it destroy the texture of the child sprite
  * @param {boolean} [stageOptions.baseTexture=false] - Only used for child Sprites if stageOptions.children is set
  *  to true. Should it destroy the base texture of the child sprite
  */
  destroy() {
    if (this.cameraTarget) {
      this.cameraTarget.transformChangeRunner.remove(this);
      //@ts-ignore
      this.cameraTarget = null;
    }
    this.world.destroy();
    //@ts-ignore
    this.world = null;
    this.interface.destroy();
    //@ts-ignore
    this.interface = null;
    this.app.destroy(...arguments);
    //@ts-ignore
    this.app = null;
  }
}
