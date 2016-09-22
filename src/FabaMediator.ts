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

export interface ICmdList {
    event: any;
    cmd: any;
    id: string;
}

export default class FabaMediator implements IFabaMediator {
    cmdList: Array<ICmdList> = [];

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
  }

  updateCommand(eventName, command) {
    this.cmdList = this.cmdList.map((md:any) => {
      if (md){
        if (md.event != eventName) return md;
      }
    });

      this.cmdList.push({event: eventName, cmd: command, id: "update"});
  }

  addSerivce(event, service) {
      let identifier: string = new event.default().identifyer;
      this.cmdList.push({event: event, cmd: service.default, id: identifier});
  }

  registerCommands() {

  }

  registerServices() {

  }
}
