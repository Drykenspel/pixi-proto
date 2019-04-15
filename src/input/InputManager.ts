interface InputManagerOptions {
  /**
   * The element to add the event listeners to.
   * Defaults to `window`
   */
  element: Window | HTMLElement;
  useKeyName: boolean;
}

const options: InputManagerOptions = {
  element: window,
  useKeyName: false,
};

export function init(opts: Partial<InputManagerOptions>): void {
  Object.assign(options, opts);
  // @ts-ignore To disable Event not assignable to KeyboardEvent
  options.element.addEventListener("keydown", handleKeyDown);
  // @ts-ignore To disable Event not assignable to KeyboardEvent
  options.element.addEventListener("keyup", handleKeyUp);
  // @ts-ignore To disable Event not assignable to WheelEvent
  options.element.addEventListener("wheel", handleWheel);
}

export function activateContext(contextKey: string) {

}

const keyState = new Map<string, boolean>();
/**
 * Used for mapping key codes/locations to names.
 * Will be updated the first time each key is pressed.
 * ignored and unused if `options.useKeyName` is `true`
 */
const keyNames = new Map<string, string>();
export function getKeyNameForDisplay(keyCode: string): string {
  return options.useKeyName && keyNames.has(keyCode) ? keyNames.get(keyCode)! : keyCode;
}

function handleKeyDown(event: KeyboardEvent) {
  if (options.useKeyName && ! keyNames.has(event.code)) {
    keyNames.set(event.code, event.key);
  }
  keyState.set(options.useKeyName ? event.code : event.key, true);
  updateKeyInput();
}

function handleKeyUp(event: KeyboardEvent) {
  keyState.set(options.useKeyName ? event.code : event.key, true);
  updateKeyInput();
}

function handleWheel(event: WheelEvent) {
  //TODO
}

function updateKeyInput() {
  //TODO
}
