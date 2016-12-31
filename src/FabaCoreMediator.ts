import {IFabaMediator} from "./IFabaMediator";
import FabaEvent from "./FabaEvent";

export interface IMediatorCmdList {
    event: FabaEvent;
    commands: Array<IMedaitorCmd>;
}

export interface IMedaitorCmd {
    event: any;
    cmd: any;
}

export default class FabaCoreMediator {
    cmdList:Array<IMediatorCmdList> = [];

    constructor(){
        this.registerCommands();
    }

    registerCommands():void{
        throw ("Please override register Commands");
    }

    addCommand(event, command) {
        const h: FabaEvent = new event();
        if (!this.cmdList[event.name]){
            this.cmdList[h.identifyer] = {event:event, commands:[]};
        }

        this.cmdList[h.identifyer].commands.push({cmd:command, options:{}});
    }

    updateCommand(event, oldCommand, newCommand) {
        const h: FabaEvent = new event();
        
        this.cmdList[h.identifyer].commands.map((item:IMedaitorCmd)=>{
            if (item.cmd === oldCommand){
                item.cmd = newCommand;
            }
        });
    }

    removeCommand(event, command) {
        const h: FabaEvent = new event();
        for (let i = 0; i < this.cmdList[h.identifyer].commands.length; i++) {
            let obj = this.cmdList[h.identifyer].commands[i];

            if (obj.cmd === command){
                this.cmdList[h.identifyer].commands.splice(i, 1);
            }
        }

        if (this.cmdList[h.identifyer].commands.length === 0){
            delete this.cmdList[h.identifyer];
        }

    }

}
