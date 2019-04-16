import { InputContext } from "./context";
import { IInput, KeyBind } from "./iinput";

interface IInputManagerOptions {
  /**
   * The element to add the event listeners to.
   * Defaults to `window`
   */
  element: Window | HTMLElement;
  useKeyName: boolean;
}

// Defaults and assigned options
const options: IInputManagerOptions = {
  element: window,
  useKeyName: false,
};

export function init(opts: Partial<IInputManagerOptions>): void {
  Object.assign(options, opts);
  options.element.addEventListener("keydown", handleKeyDown);
  options.element.addEventListener("keyup", handleKeyUp);
  options.element.addEventListener("wheel", handleWheel);
}

//TODO: let currentContext: InputContext = InputContext.DEFAULT;

export function createContext(contextKey: string): InputContext {
  return new InputContext(contextKey);
}

export function getContext(contextKey: string): InputContext | undefined {
  return InputContext.get(contextKey);
}

export function activateContext(contextKey?: string): void {
  if (!contextKey) {
    contextKey = InputContext.DEFAULT.key;
  }
  //currentContext = InputContext.getOrDefault(contextKey);
  //TODO: Build input map
}

const inputState = new Map<string, IInput>();
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
  return options.useKeyName && keyNames.has(keyCode) ? keyNames.get(keyCode)! : keyCode;
}

function keyName(event: KeyboardEvent): string {
  return options.useKeyName ? event.key : event.code;
}

function handleKeyDown(event: KeyboardEvent): void {
  if (options.useKeyName && ! keyNames.has(event.code)) {
    keyNames.set(event.code, event.key);
  }
  let key = keyName(event);
  if (!inputState.has(key)) {
    inputState.set(key, () => 1);
  } else {
    inputState.set(key, () => 1);
  }
  updateKeyInput();
}

function handleKeyUp(event: KeyboardEvent): void {
  handleKey(event, false);
}

function handleKey(event: KeyboardEvent, down: boolean): void {
  if (options.useKeyName && ! keyNames.has(event.code)) {
    keyNames.set(event.code, event.key);
  }
  let key = keyName(event);
  if (!inputState.has(key)) {
    inputState.set(key, new KeyBind(key, getKeyNameForDisplay(key)));
  }
  (inputState.get(key) as KeyBind).setState(down);
  updateKeyInput();
}

function handleWheel(event: WheelEvent): void {
  //TODO
}

function updateKeyInput(): void {
  //TODO:??currentContext.
}
