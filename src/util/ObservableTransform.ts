import { Transform } from "pixi.js";//"@pixi/math";

export default class ObservableTransform extends Transform {
  listener?: ((transform: this) => void) | null;
  onChange() {
    //@ts-ignore (onChange is "private" so not declared in types)
    super.onChange();
    if (this.listener) {
      this.listener(this);
    }
  }
}
