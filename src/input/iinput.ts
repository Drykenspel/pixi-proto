export interface IInput {
  readonly id: string;
  name: string;
  abstract value(): number;
}

export class KeyBind implements IInput {
  constructor(id: string, name?: string) {
    this.id = id;
    this.name = name || id;
    this._value = false;
  }
  value(): number {
    return this._value ? 1 : 0;
  }
  setState(down: boolean): void {
    this._value = down;
  }
}
