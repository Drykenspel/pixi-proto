import { InputContext } from "./context";
import { IInput, KeyBind } from "./iinput";

interface IInputManagerOptions {
  /**
   * The element to add the event listeners to.
   * Defaults to `window`
   */
  element?: Window | HTMLElement;
  useKeyName?: boolean;
}

class InputManager {
  private options: IInputManagerOptions;
  private _context: InputContext;
  public element: Window | HTMLElement;
  protected readonly state: Map<string, IInput>;

  constructor(options: IInputManagerOptions) {
    this.options = options;
    this.element = options.element || window;

    this.element.addEventListener("keydown", e => this.handleKey(e, true));
    this.element.addEventListener("keyup", e => this.handleKey(e, true));
    this.element.addEventListener("wheel", this.handleWheel);
  }
  private handleKey(event: KeyboardEvent, down: boolean): void {
    if (this.options.useKeyName && ! keyNames.has(event.code)) {
      keyNames.set(event.code, event.key);
    }
    let key = keyName(event);
    let kb: KeyBind;
    if (!this.state.has(key)) {
      kb = new KeyBind(key, getKeyNameForDisplay(key));
      this.state.set(key, kb);
    } else {
      kb = this.state.get(key);
    }
    kb.setState(down);
    this.updateInput(kb);
  }
  private handleWheel(event: WheelEvent): void {
    //TODO
  }
  private updateInput(trigger: IInput): void {
    this.context.updateAction(this.state, trigger);
  }
  public get context(): InputContext {
    return this._context || InputContext.DEFAULT;
  }
  public set context(context: string | InputContext) {
    if (typeof context === "string") {
      context = this.getContext(context);
    }
    this._context = context;
  }
  public createContext(contextKey: string): InputContext {
    return new InputContext(contextKey);
  }
  public getContext(contextKey: string): InputContext | undefined {
    return InputContext.get(contextKey);
  }
}

let inputMgr: InputManager;

export function init(options: Partial<IInputManagerOptions>): InputManager {
  if (!inputMgr) {
    inputMgr = new InputManager(options);
  }
  return inputMgr;
}
/**
 * Used for mapping key codes/locations to names.
 * Will be updated the first time each key is pressed.
 * ignored and unused if `options.useKeyName` is `true`
 */
const keyNames = new Map<string, string>();

/**
 * Used to get key names for your current keyboard layout.
 * Each key is updated the first time it is pressed.
 * @returns `KeyboardEvent.key` if `options.useKeyName`
 * or the key is recognised (has been pressed at least once).
 * `KeyboardEvent.code` otherwise.
 */
export function getKeyNameForDisplay(keyCode: string): string {
  return inputMgr.options.useKeyName && keyNames.has(keyCode) ? keyNames.get(keyCode)! : keyCode;
}

function keyName(event: KeyboardEvent): string {
  return inputMgr.options.useKeyName ? event.key : event.code;
}
