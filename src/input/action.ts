import { InputType } from "./input";

type IDType = string;

const ACTIONS = new Map<IDType, InputAction<any>>();

export abstract class InputAction<T extends InputType> {
  static Analog: typeof AnalogAction;
  static Digital: typeof DigitalAction;
  //readonly inputBindings = new Map<string, InputBinding>();
  constructor(readonly id: IDType, readonly type: T) {
    ACTIONS.set(id, this);
  }

  abstract value(): T extends InputType.ANALOG ? number : boolean;
}

export class AnalogAction extends InputAction<InputType.ANALOG> {
  constructor(id: IDType) {
    super(id, InputType.ANALOG);
  }
  value(): number {
    throw new Error("Method not implemented.");
  }
}

export class DigitalAction extends InputAction<InputType.DIGITAL> {
  constructor(id: IDType, ) {
    super(id, InputType.DIGITAL);
  }
  value(): boolean {
    throw new Error("Method not implemented.");
  }
}

InputAction.Analog = AnalogAction;
InputAction.Digital = DigitalAction;
