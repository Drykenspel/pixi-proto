/* eslint-disable no-unused-vars */
export const enum ModifyType {
  BASE_ADD,
  BASE_MULTIPLY,
  STACKING_MULTIPLY,
}
/* eslint-enable no-unused-vars */

interface Modifier<T extends ModifyType> {
  amount: number;
  modType: T;
}

type ChangeListener = (attributeInstance: Attribute, oldValue: number) => void;

export default class Attribute {
  private baseValue: number;
  private readonly modifiers: { [mType in ModifyType]: Modifier<mType>[] };
  private readonly listeners: ChangeListener[];
  private cachedValue: number;
  private dirty: boolean;
  private min?: number;
  private max?: number;

  constructor(base: number, min?: number, max?: number) {
    this.baseValue = this.cachedValue = base;
    this.min = min;
    this.max = max;
    this.modifiers = [[], [], []];
    this.dirty = true;
    this.listeners = [];
  }

  public setRange(min: number, max?: number, base?: number): void {
    if (max !== undefined && min >= max) {
      throw Error(
        `Cannot set minimum attribute value higher than maximum: {min: ${min}, max: ${max}}`
      );
    }
    this.min = min;
    if (max !== undefined) {
      this.max = max;
    }
    if (base !== undefined) {
      this.baseValue = base;
      this.markDirty();
    } else if (
      this.min > this.value ||
      (this.max !== undefined && this.max < this.value)
    ) {
      this.markDirty();
    }
  }

  /*
   * @param {function} listener A function called whenever the value is changed.
   * Will recieve the attribute instance, and the old value as arguments.
   * The new value can be calculated and retrieved with `attribute.value`
   * @returns the same `listener` passed in for convenience.
   */
  public onChange(listener: ChangeListener): ChangeListener {
    this.listeners.push(listener);
    return listener;
  }
  public offChange(listener: ChangeListener): void {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  get value(): number {
    if (this.dirty) {
      let val = this.baseValue;
      let basemult = 1;
      let mult = 1;
      this.modifiers[ModifyType.BASE_ADD].forEach(m => (val += m.amount));
      this.modifiers[ModifyType.BASE_MULTIPLY].forEach(
        m => (basemult += m.amount)
      );
      this.modifiers[ModifyType.STACKING_MULTIPLY].forEach(
        m => (mult *= m.amount)
      );
      this.cachedValue = val * basemult * mult;
      this.dirty = false;
    }
    return this.cachedValue;
  }

  public addModifier<T extends ModifyType>(modifier: Modifier<T>): void {
    (this.modifiers[modifier.modType] as Modifier<T>[]).push(modifier);
    this.markDirty();
  }

  public removeModifier<T extends ModifyType>(modifier: Modifier<T>): boolean {
    const list = this.modifiers[modifier.modType] as Modifier<T>[];
    const index = list.indexOf(modifier);
    const flag = index > -1;
    if (flag) {
      list.splice(index, 1);
      this.markDirty();
    }
    return flag;
  }

  private markDirty(): void {
    this.dirty = true;
    this.listeners.forEach(l => l(this, this.cachedValue));
  }
}
