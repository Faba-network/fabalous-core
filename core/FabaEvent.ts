import FabaCore from "./FabaCore";
/**
 * Created by joergwasmeier on 26.12.15.
 *
 *
 */

export default class FabaEvent {

  identifyer:string;

  public callBack:any;

  public cbs:any;

  constructor() {
  }

  get name():string {
    return this.identifyer;
  }

  getClassName():string {
    if (this.identifyer != null) return this.identifyer;
    return this.constructor.toString().match(/\w+/g)[1];
  }

  dispatch(calb?:any, result?:boolean):void {
    if (calb) {
      if (!this.callBack) {

        this.callBack = function () {
          this.cbs(this);
        };
      }
      this.cbs = calb;
    }

    FabaCore.dispatchEvent(this, result);
  }
}
