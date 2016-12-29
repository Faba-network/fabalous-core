export interface IFabaMediator{
    addCommand(event:{new();}, command: {new();}):void;
    updateCommand(event:{new();}, command: {new();}):void;
    removeCommand(event:{new();}, command: {new();}):void;
}