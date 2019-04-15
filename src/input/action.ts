import { InputType } from "./input";

type IDType = string;

/*const ACTIONS = new Map<IDType, InputAction>();

abstract class InputAction<T extends InputType> {
  readonly inputBindings = new Map<string, InputBinding>();
  constructor(readonly id: IDType, readonly type: T) {

    ACTIONS.set(id, this);
  }

  abstract value(): T extends InputType.ANALOG ? number : boolean;
}

class AnalogAction extends InputAction<InputType.ANALOG> {

}

class DigitalAction extends InputAction<InputType.DIGITAL> {

}*/
