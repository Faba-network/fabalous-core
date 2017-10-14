import FabaEvent from "./FabaEvent";
import FabaCoreCommand from "./FabaCoreCommand";
import FabaStore from "./store/FabaStore";
import FabaImmutableStore from "./store/FabaImmutableStore";

export interface IMediatorCmdList {
    event: FabaEvent;
    commands: Array<IMedaitorCmd>;
}

export interface IMedaitorCmd {
    event: any;
    cmd: any;
    permission: any;
    options: any;
}
export interface INameToValueMap extends Object {
    [key: string]: any;
}

export interface IFabaCoreMediator extends Object {
    registerCommands(): void;

    addCommand(event: typeof FabaEvent, command: typeof FabaCoreCommand): void;
    updateCommand(event: typeof FabaEvent, oldCommand: typeof FabaCoreCommand, newCommand: typeof FabaCoreCommand): void;
    removeCommand(event: typeof FabaEvent, command: typeof FabaCoreCommand): void;

    /*
     addCommand(event:{new():void;}, command: {new():void;}):void;
     updateCommand(event:{new():void;}, command: {new():void;}):void;
     removeCommand(event:{new():void;}, command: {new():void;}):void;
     */
}

/**
 * FabaCoreMediator should be extended by any Runtime
 *
 * Add / Remove and Update all commands
 *
 */

export default class FabaCoreMediator implements IFabaCoreMediator {
    cmdList: INameToValueMap = {};

    store : FabaImmutableStore<any> | FabaStore<any>;

    /**
     * Call the "registerCommands" function after create
     * Set module store
     */
    constructor(store? : FabaImmutableStore<any> | FabaStore<any>) {
        this.store = store;
        this.registerCommands();
    }

    /**
     * Function need to be overwrite by Mediator
     */
    registerCommands(): void {
        throw ("Please override register Commands");
    }

    /**
     * Add command and event to the Mediator
     *
     * @param event {FabaEvent}
     * @param command {FabaCoreCommand}
     */
    addCommand(event: typeof FabaEvent, command: typeof FabaCoreCommand, permission?:any): void {
        const h: FabaEvent = new event();
        if (!this.cmdList[event.name]) {
            this.cmdList[h.identifyer] = {event: event, commands: []};
        }

        this.cmdList[h.identifyer].commands.push({cmd: command, permission: {permission}, options: {}});
    }


    /**
     * Method can be used to update Event and Command and overwrite the prevoise registration
     *
     * @param event
     * @param oldCommand
     * @param newCommand
     */
    updateCommand(event: typeof FabaEvent, oldCommand: typeof FabaCoreCommand, newCommand: typeof FabaCoreCommand): void {
        const h: FabaEvent = new event();

        this.cmdList[h.identifyer].commands.map((item: IMedaitorCmd) => {
            if (item.cmd === oldCommand) {
                item.cmd = newCommand;
            }
        });
    }

    /**
     * Remove all registration form event // command
     *
     * @param event
     * @param command
     */
    removeCommand(event: typeof FabaEvent, command: typeof FabaCoreCommand): void {
        const h: FabaEvent = new event();
        for (let i = 0; i < this.cmdList[h.identifyer].commands.length; i++) {
            let obj = this.cmdList[h.identifyer].commands[i];

            if (obj.cmd === command) {
                this.cmdList[h.identifyer].commands.splice(i, 1);
            }
        }

        if (this.cmdList[h.identifyer].commands.length === 0) {
            delete this.cmdList[h.identifyer];
        }

    }

}
