export const enum ModifyType {
  BASE_ADD,
  BASE_MULTIPLY,
  STACKING_MULTIPLY,
}

interface Modifier<T extends ModifyType> {
  amount: number;
  modType: T;
}

type ChangeListener = (attributeInstance: Attribute, oldValue: number) => void;

export default class Attribute {
  private baseValue: number;
  private readonly modifiers: { [mType in ModifyType]: Array<Modifier<mType>> };
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
      this.modifiers[ModifyType.BASE_ADD].forEach((m) => (val += m.amount));
      this.modifiers[ModifyType.BASE_MULTIPLY].forEach(
        (m) => (basemult += m.amount)
      );
      this.modifiers[ModifyType.STACKING_MULTIPLY].forEach(
        (m) => (mult *= m.amount)
      );
      this.cachedValue = val * basemult * mult;
      this.dirty = false;
    }
    return this.cachedValue;
  }

  /*
   * @param {Object} modifier An object containing a "key" property and one or more of the following keys with numerical values:
   * @param {number} [modifier.baseAdd] Number to add to the base value before further calculations.
   * @param {number} [modifier.baseMult] Number to multiply the modified base value by. Does not stack, so 2 `2x` multipliers will be a `3x` multiplier in total.
   * @param {number} [modifier.stackingMult] Number to multiple the final value by. Stacks, so 2 `2x` multipliers will be a `4x` multiplier in total
   * @param {number} [baseAdd] If `modifier` was just the key, this will be the value used for the modifier baseAdd property
   * @param {number} [baseMult] If `modifier` was just the key, this will be the value used for the modifier baseMult property
   * @param {number} [stackingMult] If `modifier` was just the key, this will be the value used for the modifier stackingMult property
   *
   * @example  //Will increase the value by 3
   * attribute.addModifier({key: "exampleModifierKey", baseAdd: 3});
   * //Will multiply the (modified) base value by 2 (does not stack, so 2 *2 multipliers will be a x3 multiplier in total)
   * attribute.addModifier({key: "exampleModifierKey2", baseMult: 2});
   * //Will multiply the final value by 4 (stacks, so 2 *2 multipliers will be a *4 multiplier in total)
   * attribute.addModifier({key: "exampleModifierKey3", stackingMult: 4});
   */
  public addModifier<T extends ModifyType>(modifier: Modifier<T>): void {
    (this.modifiers[modifier.modType] as Array<Modifier<T>>).push(modifier);
    this.markDirty();
  }

  public removeModifier<T extends ModifyType>(modifier: Modifier<T>): boolean {
    const list = this.modifiers[modifier.modType] as Array<Modifier<T>>;
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
    this.listeners.forEach((l) => l(this, this.cachedValue));
  }
}
