import FabaTransportBase from "./FabaTransportBase";
export default class FabaApiConnection extends FabaTransportBase {
    constructor(url) {
        super();
        this.url = url;
        this.sendEventList = [];
    }
    completeHandler(data) {
        var assign = require('object.assign').getPolyfill();
        console.log("assign");
        console.log(assign);
        let jsonString = data.target.response;
        var json = JSON.parse(jsonString);
        console.log(this.sendEventList);
        let currentEvent = this.sendEventList[0];
        var h = assign(currentEvent, json);
        h.dispatch(null, true);
    }
    send(event, timeoutTime = 5000, timeOut = true, compress = true) {
        console.log(event);
        this.sendEventList.push(event);
        var nRequest = new XMLHttpRequest();
        nRequest.addEventListener("load", this.completeHandler.bind(this), false);
        nRequest.open("POST", this.url, true);
        //nRequest.setRequestHeader('Content-Type', 'text/plain');
        nRequest.send(super.prepareEventToSend(event));
        //var sessionId = (CoreModel.instance.user != null) ? CoreModel.instance.user.sessionId : null;
        //if (CoreWebAppModel.instance.mobile == true)
        //compress = false;
        //var nRequest = new SynapseXmlRequest(evnid, this.url, prepareSendData(event, compress), timeOut, sessionId);
        //nRequest.addEventListener(SynapseXmlRequest.LOAD_EVENT, completeHandler);
        //nRequest.addEventListener(SynapseXmlRequest.TIMEOUT_EVENT, timeOutHandler);
        //nRequest.addEventListener(SynapseXmlRequest.TIMEOUT_EVENT, timeOutHandler);
        //return nRequest;
    }
}
