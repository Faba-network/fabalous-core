/*
  Fabalos bundled with nodejs (muss os sein weil nur mit nodejs lässt sich javascript ausführen)
  Mongodb Rthindb etc sind erweiterungen und in einem eigenen Packet

  Bei Kompellierung wird nur geschaut ob service oder command

   If Service
    registerservice

   IF !Service
    if Runtime_WEB


    if Runtime_Native

 */



import {IFabaMediator} from "./IFabaMediator";
import FabaEvent from "./FabaEvent";
import FabaCommand from "./FabaCommand";
import {CLIENT, SERVER} from "./FabaCore";
import FabaSerivce from "./FabaService";

export default class FabaMediator implements IFabaMediator {
  cmdList = [];

  constructor() {
    if (CLIENT){
      this.registerCommands();
    }

    if (SERVER){
      this.registerServices();
    }
  }

  addCommand(event:any, command:any) {
    var ev:any = event.default;
    var cmd = command.default;
    var h:FabaEvent = new ev();

    this.cmdList.push({event: ev, cmd: cmd, id:h.identifyer});
    //FabaWebApplication.events[h.identifyer] = ev;
  }

  updateCommand(eventName, command) {
    this.cmdList = this.cmdList.map((md:any) => {
      if (md){
        if (md.event != eventName) return md;
      }
    });

    this.cmdList.push({event: eventName, cmd: command});
  }

  addSerivce(event, service) {
    var ev = event.default;
    var serv = service.default;
    var h:FabaEvent = new ev();

    this.cmdList.push({event: event, cmd: serv, id:h.identifyer});
  }

  registerCommands() {

  }

  registerServices() {

  }
}
