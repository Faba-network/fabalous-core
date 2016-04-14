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

    addCommand(event:FabaEvent, command) {
        this.cmdList.push({event: event, cmd: command});
        FabaWebApplication.events[event.identifyer] = event;
    }

    updateCommand(eventName, command) {
        this.cmdList = this.cmdList.map((md:any) => {
            if (md){
                if (md.event != eventName) return md;
            }
        });

        console.log(this.cmdList);

        this.cmdList.push({event: eventName, cmd: command});
        FabaWebApplication.events[eventName.name] = eventName;
    }

    addSerivce(event:FabaEvent, command) {
      this.cmdList.push({event: event, cmd: command});
      FabaWebApplication.events[event.identifyer] = event;
    }



    registerCommands() {

    }

    registerServices() {

    }
}
