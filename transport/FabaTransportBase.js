export default class FabaTransportBase {
    constructor() {
        this.runningQuerysNew = [];
    }
    prepareEventToSend(event, compress = true) {
        var qId = Math.random();
        this.runningQuerysNew.push({ e: event, q: qId, v: 0, clb: event.callBack });
        var serilizedData = JSON.stringify(event);
        return serilizedData;
    }
    messageHandler(incomingMsg) {
        //data = JSON.parse(incomingMsg);
    }
}
