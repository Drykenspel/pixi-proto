import Attribute from "../util/Attribute";
import {GAME_FPS} from "../index";

type Vec = { x: number, y: number };

type Options = {
  /** Maximum movement speed ( default 5 ) */
  ms: number,
  /** Maximum number of complete revolutions per second ( default 1 ) */
  rps: number,
  /** {x, y, rotation} position and rotation of entity ( default taken from sprite ) */
  pos: { x: number, y: number, rotation: number },
}

export default class Actor {
  /** Limited to between 0 and 1 full revolution per frame */
  readonly moveSpeed: Attribute;
  /** Limited to between 0 and 1 full revolution per frame (inclusive) */
  readonly rotationSpeed: Attribute;

  private readonly displayObj: PIXI.DisplayObject;
  private readonly pos: Vec = { x: 0, y: 0 };
  private readonly vel: Vec = { x: 0, y: 0 };
  private readonly forces: Array<Vec> = [];
  private rot: number = 0;

  constructor(parent: PIXI.Container, display: PIXI.DisplayObject, options: Partial<Options>) {
    this.displayObj = display;
    /** Limited to more than or equal to 0 */
    this.moveSpeed = new Attribute(options.hasOwnProperty("ms") ? options.ms! : 5, 0);
    this.moveSpeed.onChange(() => this.setVelocity(this.vel));
    this.rotationSpeed = new Attribute(options.hasOwnProperty("rps") ? 2 * Math.PI / ( GAME_FPS * options.rps!) : Math.PI / 30, 0, GAME_FPS);

    this.setPosition(options.hasOwnProperty("pos") ? options.pos! : display);

    this.vel = { x: 0, y: 0 };

    parent.addChild(this.displayObj);
  }

  public setPosition(pos: { x: number, y: number, rotation?: number}): void {
    this.displayObj.x = this.pos.x = pos.x;
    this.displayObj.y = this.pos.y = pos.y;
    if (pos.rotation != undefined) {
      this.displayObj.rotation = this.rot = pos.rotation;
    }
  }

  public rotateToPoint(point: Vec) {
    let x = point.x - this.pos.x;
    let y = point.y - this.pos.y;
    this.rot = (Math.PI / 2) + Math.atan2(y, x);
    this.updateRotation();
  }

  public setVelocity(point: Vec, overrideMS = false) {
    let modifier = overrideMS ? 1 : this.moveSpeed.value / Math.sqrt(point.x * point.x + point.y * point.y);
    this.vel.x = point.x * modifier;
    this.vel.y = point.y * modifier;
  }

  update() {
    this.setPosition({ x: this.pos.x += this.vel.x, y: this.pos.y += this.vel.y });
    this.updateRotation();
  }

  private updateRotation() {
    let t = this.rot;
    let c = this.displayObj.rotation
    let delta = Math.atan2(Math.sin(t-c), Math.cos(t-c));
    let r = this.rotationSpeed.value;
    if(Math.abs(delta) < r) {
      this.displayObj.rotation = t;
    } else {
      this.displayObj.rotation += Math.sign(delta) * r;
    }
  }
}
