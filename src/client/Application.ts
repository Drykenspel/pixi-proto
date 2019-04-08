import * as PIXI from "pixi.js";
import { ObservableTransform } from "../util";

/**
 * Wraps an instance of `PIXI.Application`.
 * Splits stage into `interface` and `world`.
 * In addition, adds centering and interaction.
 */
export default class Application {
  readonly interface: PIXI.Container;
  readonly world: PIXI.Container;
  cameraTarget?: {transform: ObservableTransform};
  protected app: PIXI.Application;

  constructor(options: PIXI.ApplicationOptions) {
    this.app = new PIXI.Application(options);
    this.world = new PIXI.Container();
    this.interface = new PIXI.Container();
  }

  centerCamera() {
    if (this.cameraTarget) {
      this.world.position.set(
        this.app.view.width / 2 -this.cameraTarget.transform.position.x,
        this.app.view.height / 2 -this.cameraTarget.transform.position.y,
      );
    }
  }

  centerOn(observableDO: {transform: ObservableTransform}) {
    if (this.cameraTarget) {
      this.cameraTarget.transform.listener = null;
    }
    this.cameraTarget = observableDO;
    this.cameraTarget.transform.listener = () => { this.centerCamera; };
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
    return this.renderer.view;
  }

  /**
* Reference to the renderer's screen rectangle. Its safe to use as `filterArea` or `hitArea` for the whole screen.
* @member {PIXI.Rectangle}
* @readonly
*/
  get screen() {
    return this.renderer.screen;
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
  destroy(removeView?: boolean) {
    // Destroy plugins in the opposite order
    // which they were constructed
    //@ts-ignore
    const plugins: PIXI.Application.Plugin[] = Application._plugins.slice(0);

    plugins.reverse();
    plugins.forEach((plugin) => {
      plugin.destroy.call(this);
    });

    this.world.destroy();

    this.renderer.destroy(removeView);
    this.renderer = null;
  }
}
new Application({ view: { game: document.createElement("canvas") }});
