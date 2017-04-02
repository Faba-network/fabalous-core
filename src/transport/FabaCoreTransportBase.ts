import FabaEvent from "./../FabaEvent";

/**
 * This class is used by all Fabalous Endpoints ansd should be extended by a new Transport method like Rest or Websocket.
 */
export default class FabaCoreTransportBase {
    /** TODO: Check if needed
    private evnid: string;
    private runningQuerysNew: Array<any> = [];
    private runningQuerys: Array<any>;

    constructor() {
    }

    /**
     * Serialize the FabaEvent
     *
     * @param event
     * @param compress
     * @returns {string}
     */
    protected prepareEventToSend(event: FabaEvent, compress: boolean = true): string {
        // TODO: Check if needed

        var qId = Math.random();
        //this.runningQuerysNew.push({e: event, q: qId, v: 0, clb: event.callBack});

        var serilizedData: string = JSON.stringify(event);
        return serilizedData;
    }

    /**
     * Need to Override
     * @param incomingMsg
     */
    protected messageHandler(incomingMsg: any): void {
        //data = JSON.parse(incomingMsg);
    }

    /**
     * Need to override
     * @param event
     */
    public send(event: FabaEvent) {
    }

}