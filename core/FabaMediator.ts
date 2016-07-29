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

    addCommand(event, command) {
      var h:FabaEvent = new event();
      this.cmdList.push({event: event, cmd: command, id:h.identifyer});
      FabaWebApplication.events[h.identifyer] = event;
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

    addSerivce(event, command) {
      var h:FabaEvent = new event();

      this.cmdList.push({event: event, cmd: command, id:h.identifyer});
      FabaWebApplication.events[h.identifyer] = event;
    }

    registerCommands() {

    }

    registerServices() {

    }
}
