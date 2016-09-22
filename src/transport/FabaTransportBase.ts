import FabaEvent from "./../FabaEvent";

export default class FabaTransportBase {
    private evnid: string;

    private runningQuerysNew: Array<any> = [];
    private runningQuerys: Array<any>;

    constructor() {
    }

    protected prepareEventToSend(event: FabaEvent, compress: boolean = true): string {
        var qId = Math.random();

        this.runningQuerysNew.push({e: event, q: qId, v: 0, clb: event.callBack});

        var serilizedData: string = JSON.stringify(event);
        return serilizedData;
    }

    protected messageHandler(incomingMsg: any): void {
        //data = JSON.parse(incomingMsg);
    }

    public send(event: FabaEvent) {

    }

}