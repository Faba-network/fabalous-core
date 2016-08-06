/**
 * Created by joergwasmeier on 26.12.15.
 *
 *
 */

import {IFabaMediator} from "./IFabaMediator";
import FabaWebApplication from "../runtimes/FabaWebApplication";
import FabaEvent from "./FabaEvent";

export default class FabaMediator implements IFabaMediator {
  cmdList = new Array<Object>();

  constructor() {
    if (CLIENT){
      this.registerCommands();
    }

    if (SERVER){
      this.registerServices();
    }
  }

  addCommand(event:any, command:any) {
    var ev = event.default;
    var cmd = command.default;
    var h:FabaEvent = new ev();

    this.cmdList.push({event: ev, cmd: cmd, id:h.identifyer});
    FabaWebApplication.events[h.identifyer] = ev;
  }

  updateCommand(eventName, command) {
    this.cmdList = this.cmdList.map((md:any) => {
      if (md){
        if (md.event != eventName) return md;
      }
    });

    this.cmdList.push({event: eventName, cmd: command});
    FabaWebApplication.events[eventName.name] = eventName;
  }

  addSerivce(event, service) {
    var ev = event.default;
    var serv = service.default;
    var h:FabaEvent = new ev();

    this.cmdList.push({event: event, cmd: serv, id:h.identifyer});
    FabaWebApplication.events[h.identifyer] = ev;
  }

  registerCommands() {

  }

  registerServices() {

  }
}
