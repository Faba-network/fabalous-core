import {IFabaMediator} from "./IFabaMediator";
import FabaEvent from "./FabaEvent";
import FabaCoreCommand from "./FabaCoreCommand";

export interface IMediatorCmdList {
    event: FabaEvent;
    commands: Array<IMedaitorCmd>;
}

export interface IMedaitorCmd {
    event: any;
    cmd: any;
}
export interface INameToValueMap extends Object
{
    [key: string]: any;
}

export default class FabaCoreMediator {
    cmdList:INameToValueMap = {};

    constructor(){
        this.registerCommands();
    }

    registerCommands():void{
        throw ("Please override register Commands");
    }

    addCommand(event: typeof FabaEvent, command: typeof FabaCoreCommand) {
        const h: FabaEvent = new event();
        if (!this.cmdList[event.name]){
            this.cmdList[h.identifyer] = {event:event, commands:[]};
        }

        this.cmdList[h.identifyer].commands.push({cmd:command, options:{}});
    }

    updateCommand(event: typeof FabaEvent, oldCommand:typeof FabaCoreCommand, newCommand:typeof FabaCoreCommand) {
        const h: FabaEvent = new event();
        
        this.cmdList[h.identifyer].commands.map((item:IMedaitorCmd)=>{
            if (item.cmd === oldCommand){
                item.cmd = newCommand;
            }
        });
    }

    removeCommand(event: typeof FabaEvent, command:typeof FabaCoreCommand) {
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
