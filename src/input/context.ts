import { InputAction } from "./action";
import { IInput } from "./iinput";


interface IInputBinding {
  readonly input: IInput;
}
type InputMap = Map<string, InputModifier | InputTrigger>;

abstract class InputMapContainer {
  readonly inputMap: InputMap = new Map();
  modifier(input: IInput): InputModifier {
    if (this.inputMap.has(input)) {
      let entry = this.inputMap.get(input);
      if (entry instanceof InputModifier) {
        return entry;
      } else {
        throw new Error("Cannot register a modifier and a trigger to the same key: " + input);
      }
    } else {
      let modifier = new InputModifier(input);
      this.inputMap.set(input, modifier);
      return modifier;
    }
  }
  trigger(input: IInput, action: InputAction): InputTrigger {
    if (this.inputMap.has(input)) {
      throw new Error("Cannot register multiple triggers to the same key: " + input);
    } else {
      let trigger = new InputTrigger(input, action);
      this.inputMap.set(input, trigger);
      return trigger;
    }
  }
}

class InputModifier extends InputMapContainer implements IInputBinding {
  constructor(input: IInput) {
    super();
    this.input = input;
  }
}
class InputTrigger implements IInputBinding {
  readonly action: InputAction
  constructor(input: IInput, action: InputAction) {
    this.input = input;
    this.action = action;
  }
}

export class InputContext extends InputMapContainer {
  static readonly DEFAULT = new InputContext("default");
  private static readonly contexts = new Map<string, InputContext>();
  static get(contextKey: string): InputContext | undefined {
    return this.contexts.get(contextKey);
  }
  static getOrDefault(contextKey: string): InputContext {
    return this.get(contextKey) || this.DEFAULT;
  }

  readonly key: string;
  constructor(key: string) {
    super();
    this.key = key;
    if (InputContext.contexts.has(key)) {
      throw new Error("Attempted to register multiple InputContexts with the same key: " + key);
    }
    InputContext.contexts.set(key, this);
  }

  mergeBindings(existing: InputMap): InputMap {
    let res = new Map(this.inputMap);
    existing.forEach((v, k) => {
      if (!res.has(k)) {
        res.set(k, v);
      }
    });
    return res;
  }
}
