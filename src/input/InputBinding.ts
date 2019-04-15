type IInput = any;

interface IBindingMatcher {
  match(against: Set<IInput>): IBindingMatch | false;
}

interface IBindingMatch {
  modifiers: Iterable<IInput>;
}

class TriggerMatcher implements IBindingMatcher {
  readonly input: IInput;
  match(against: Set<any>): IBindingMatch | false {
    throw new Error("Method not implemented.");
  }
}

class ModifierMatcher implements IBindingMatcher {
  readonly input: IInput;
  match(against: Set<IInput>): IBindingMatch | false {
    return this.input in against ?
      {
        modifiers: [...against].filter(i => i !== this.input),
      }
      : false;
  }
}

class MultiModifierMatcher implements IBindingMatcher {
  constructor(inputs: Iterable<IInput>);
  constructor(readonly inputs: Set<IInput>){};
  match(against: Set<IInput>): IBindingMatch | false {
    return [...this.inputs].some(i => !against.has(i)) ?
      {
        modifiers: [...against].filter(i => !this.inputs.has(i)),
      }
      : false;
  }
}
