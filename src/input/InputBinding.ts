import { IInput } from "./iinput";

interface IBindingMatcher {
  match(against: Set<IInput>): IBindingMatch | false;
}

interface IBindingMatch {
  modifiers: Iterable<IInput>;
}

export class TriggerMatcher implements IBindingMatcher {
  readonly input: IInput;
  match(against: Set<IInput>): IBindingMatch | false {
    throw new Error("Method not implemented.");
  }
}

export class ModifierMatcher implements IBindingMatcher {
  readonly inputs: Set<IInput>;
  constructor(inputs: Iterable<IInput>);
  constructor(...inputs: IInput[]) {
    this.inputs = new Set(inputs);
  }
  match(against: Set<IInput>): IBindingMatch | false {
    let modifiers = new Set(against);
    for (var i of this.inputs) {
      if (!modifiers.has(i)) {
        return false;
      } else {
        modifiers.delete(i);
      }
    }
    return { modifiers };
  }
}
