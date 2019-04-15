export enum InputType { ANALOG, DIGITAL };


interface IInputBinding {
  value(): number;
  matchContext(context: /*TODO: InputContext */ any): boolean;
}

interface DigitalInput {

}
interface AnalogInput {

}

class KeyBind implements DigitalInput {

}
class MouseBtnBind implements DigitalInput {

}
class MouseMoveBind implements AnalogInput {

}
/*class GamepadBind implements AnalogInput {

}*/
