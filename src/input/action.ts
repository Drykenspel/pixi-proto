export enum InputType { ANALOG, DIGITAL };

type IDType = string;

const ACTIONS = new Map<IDType, InputAction/*<any>*/>();

export abstract class InputAction/*<T extends InputType>*/ {
  /*public static Analog: typeof AnalogAction;
  public static Digital: typeof DigitalAction;*/

  //readonly inputBindings = new Map<string, InputBinding>();
  readonly id: IDType;
  readonly type: T;
  protected listeners: ((oldValue: number, action: this) => void)[];
  constructor(id: IDType, type: T) {
    this.id = id;
    this.type = type;
    ACTIONS.set(id, this);
  }

  abstract value(): number;
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
  constructor(id: IDType) {
    super(id, InputType.DIGITAL);
  }
  value(): number {
    throw new Error("Method not implemented.");
  }
}

InputAction.Analog = AnalogAction;
InputAction.Digital = DigitalAction;
