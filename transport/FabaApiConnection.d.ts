import FabaTransportBase from "./FabaTransportBase";
import FabaEvent from "../core/FabaEvent";
export default class FabaApiConnection extends FabaTransportBase {
    private url;
    constructor(url: any);
    private completeHandler(data);
    send(event: FabaEvent, timeoutTime?: number, timeOut?: boolean, compress?: boolean): void;
}
