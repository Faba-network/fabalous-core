import FabaCore from "./FabaCore";

/**
 * Created by joergwasmeier on 26.12.15.
 *
 *
 */

export default class FabaEvent {

  identifyer:string;
  private cbs:any;

  constructor() {
    this.identifyer = this.hashCode(this.constructor.toString());
  }

  callBack(){
    if (this.cbs) {
      this.cbs();
    }
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
      this.cbs = calb;
    }

    FabaCore.dispatchEvent(this, result);
  }

  hashCode(str:string):string {
    var hash:any = "0", i, chr, len;
    if (str.length === 0) return hash;
    for (i = 0, len = str.length; i < len; i++) {
      chr   = str.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };

}
