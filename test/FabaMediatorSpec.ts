import FabaMediator from "../src/FabaCoreMediator";
import FabaEvent from "../src/FabaEvent";
import FabaCommand from "../src/FabaCoreCommand";

class store{

}

class TestEvent extends FabaEvent{
    constructor(){
        super("TestEvent");
    }
}

class TestCommand extends FabaCommand<store>{
    execute(event:TestEvent){
        event.callBack();
    }
}

class TestCommand2 extends FabaCommand<store>{
    execute(event:TestEvent){
        event.callBack();
    }
}

class TestMediator extends FabaMediator{
    registerCommands(): void {

    }
}

describe("Mediator", ()=>{
    it("Mediator should be there", function () {
        const testMediator:TestMediator = new TestMediator();
        expect(testMediator).toBeDefined();
    });

    it("Mediator should add a Command", function () {
        const testMediator:TestMediator = new TestMediator();
        testMediator.addCommand(TestEvent, TestCommand);
        expect(testMediator.cmdList["TestEvent"]).toBeDefined();
    });

    it("Mediator should update a Command", function () {
        const testMediator:TestMediator = new TestMediator();
        testMediator.addCommand(TestEvent, TestCommand);

        testMediator.updateCommand(TestEvent, TestCommand, TestCommand2);
        expect(testMediator.cmdList["TestEvent"].commands[0].cmd).toEqual(TestCommand2);
    });

    it("Mediator should remove a Command", function () {
        const testMediator:TestMediator = new TestMediator();
        testMediator.addCommand(TestEvent, TestCommand);

        testMediator.removeCommand(TestEvent, TestCommand);
        expect(testMediator.cmdList["TestEvent"]).toBeUndefined();
    });

    it("Mediator should remove only 1 Command", function () {
        const testMediator:TestMediator = new TestMediator();
        testMediator.addCommand(TestEvent, TestCommand);
        testMediator.addCommand(TestEvent, TestCommand2);

        testMediator.removeCommand(TestEvent, TestCommand);
        expect(testMediator.cmdList["TestEvent"]).toBeDefined();
    });


});