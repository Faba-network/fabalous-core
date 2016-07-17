import {trace} from "../utils/Logger";
import FabaTransportBase from "./FabaTransportBase";
import FabaWebApplication from "../runtimes/FabaWebApplication";
import FabaEvent from "../core/FabaEvent";
import {log} from "util";
/**
 * Created by creativecode on 25.12.15.
 */
declare var require;
export default class FabaApiConnection extends FabaTransportBase {
  private url:string;

  private sendEventList:Array<FabaEvent>;

  constructor(url) {
    super();
    this.url = url;
    this.sendEventList = [];
  }

  private completeHandler(data:any):void {
    var assign = require('object.assign').getPolyfill();

    console.log("assign");
    console.log(assign);


    let jsonString:string = data.target.response;
    var json = JSON.parse(jsonString);

    console.log(this.sendEventList);

    let currentEvent = this.sendEventList[0];
    var h:any = assign(currentEvent, json);



    h.dispatch(null, true);
  }

  public send(event:FabaEvent, timeoutTime:number = 5000, timeOut:boolean = true, compress:boolean = true) {
    console.log(event);
    this.sendEventList.push(event);

    var nRequest:XMLHttpRequest = new XMLHttpRequest();
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