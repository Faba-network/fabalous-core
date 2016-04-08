import FabaEvent from "../core/FabaEvent";
export default class FabaTransportBase {
    private evnid;
    private runningQuerysNew;
    private runningQuerys;
    constructor();
    protected prepareEventToSend(event: FabaEvent, compress?: boolean): string;
    protected messageHandler(incomingMsg: any): void;
}
