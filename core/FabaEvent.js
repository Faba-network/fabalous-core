import FabaCore from "./FabaCore";
/**
 * Created by joergwasmeier on 26.12.15.
 *
 *
 */
export default class FabaEvent {
    constructor(identifyer) {
        //this.identifyer = this.hashCode(this.constructor.toString());
        this.identifyer = identifyer;
    }
    callBack() {
        if (this.cbs) {
            this.cbs(this);
        }
    }
    get name() {
        return this.identifyer;
    }
    getClassName() {
        if (this.identifyer != null)
            return this.identifyer;
        return this.constructor.toString().match(/\w+/g)[1];
    }
    dispatch(calb, result) {
        if (calb) {
            this.cbs = calb;
        }
        FabaCore.dispatchEvent(this, result);
    }
    hashCode(str) {
        var hash = "0", i, chr, len;
        if (str.length === 0)
            return hash;
        for (i = 0, len = str.length; i < len; i++) {
            chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }
    ;
}
