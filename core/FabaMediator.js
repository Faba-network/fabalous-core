/**
 * Created by joergwasmeier on 26.12.15.
 *
 *
 */
import FabaWebApplication from "../runtimes/FabaWebApplication";
export default class FabaMediator {
    constructor() {
        this.cmdList = new Array();
        if (CLIENT) {
            this.registerCommands();
        }
        if (SERVER) {
            this.registerServices();
        }
    }
    addCommand(event, command) {
        var h = new event();
        this.cmdList.push({ event: event, cmd: command, id: h.identifyer });
        FabaWebApplication.events[h.identifyer] = event;
    }
    updateCommand(eventName, command) {
        this.cmdList = this.cmdList.map((md) => {
            if (md) {
                if (md.event != eventName)
                    return md;
            }
        });
        this.cmdList.push({ event: eventName, cmd: command });
        FabaWebApplication.events[eventName.name] = eventName;
    }
    addSerivce(event, command) {
        var h = new event();
        this.cmdList.push({ event: event, cmd: command, id: h.identifyer });
        FabaWebApplication.events[h.identifyer] = event;
    }
    registerCommands() {
    }
    registerServices() {
    }
}
