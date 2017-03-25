export interface IFabaMediator{
    addCommand(event:{new():void;}, command: {new():void;}):void;
    updateCommand(event:{new():void;}, command: {new():void;}):void;
    removeCommand(event:{new():void;}, command: {new():void;}):void;
}