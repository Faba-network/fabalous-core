/**
 * Created by joergwasmeier on 26.12.15.
 *
 *
 */
import { IFabaMediator } from "./IFabaMediator";
export default class FabaMediator implements IFabaMediator {
    cmdList: Object[];
    constructor();
    addCommand(eventName: any, command: any): void;
    updateCommand(eventName: any, command: any): void;
    addSerivce(eventName: any, command: any): void;
    registerCommands(): void;
    registerServices(): void;
}
