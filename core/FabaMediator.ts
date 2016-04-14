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
        // @ifdef CLIENT
        this.registerCommands();
        // @endif

        // @ifdef SERVER
        this.registerServices();
        // @endif
    }

    addCommand(event, command) {
      var h:FabaEvent = new event();
      console.log("addCommand");
      console.log(h.identifyer);
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
