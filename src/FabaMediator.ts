import {IFabaMediator} from "./IFabaMediator";
import FabaEvent from "./FabaEvent";

export interface ICmdList {
    event: any;
    cmd: any;
}

export default class FabaMediator {
    cmdList:Array<Array<ICmdList>> = [];

    constructor(){
        this.registerCommands();
    }

    registerCommands():void{
        throw ("Please override register Commands");
    }

    addCommand(event, command) {
        const h: FabaEvent = new event();
        if (!this.cmdList[event.name]){
            this.cmdList[event.name] = [];
        }
        this.cmdList[h.identifyer] = {event:event, commands:[]};

        this.cmdList[h.identifyer].push({cmd:command, event:event});
    }

    updateCommand(event, oldCommand, newCommand) {
        const h: FabaEvent = new event();

        this.cmdList[h.identifyer].map((item:ICmdList)=>{
            if (item.event === event && item.cmd === oldCommand){
                item.cmd = newCommand;
            }
        });
    }

    removeCommand(event, command) {
        const h: FabaEvent = new event();
        for (let i = 0; i < this.cmdList[h.identifyer].length; i++) {
            let obj = this.cmdList[h.identifyer][i];

            if (obj.event === event && obj.cmd === command){
                this.cmdList[h.identifyer].splice(i, 1);
            }
        }

        if (this.cmdList[h.identifyer].length === 0){
            delete this.cmdList[h.identifyer];
        }

    }

}
