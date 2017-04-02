/**
 ** Implementation of FabaCoreTransportBase
 **/

import FabaEvent from "../FabaEvent";

export interface IFabaCoreTransportBase {
    messageHandler(incomingMsg: any):void;
    send(event: FabaEvent):void;
}