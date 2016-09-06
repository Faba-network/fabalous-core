import FabaCore from "./FabaCore";

export default class FabaEvent {

  identifyer:string;
  cbs:any;

  constructor(identifyer:string) {
    this.identifyer = identifyer;
  }

  callBack(){
    if (this.cbs) {
      this.cbs(this);
    }
  }

  get name():string {
    return this.identifyer;
  }

  dispatch(calb?:any, result?:boolean):void {
    if (calb) {
      this.cbs = calb;
    }

    FabaCore.dispatchEvent(this, result);
  }

  delayDispatch(delay:number, calb?:any, result?:boolean):void {
    setTimeout(()=>{
      if (calb) {
        this.cbs = calb;
      }

      FabaCore.dispatchEvent(this, result);
    },delay);
  }
}