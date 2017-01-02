import FabaMediator from "../src/FabaCoreMediator";
import FabaEvent from "../src/FabaEvent";
import FabaCommand from "../src/FabaCoreCommand";
import FabaCore from "../src/FabaCore";
import FabaStore from "../src/FabaStore";

/**
 * Created by creativecode on 29.12.16.
 */
class Store {
    test: boolean = false;
}

const store: FabaStore<Store> = new FabaStore(new Store());

class TestEvent extends FabaEvent {
    constructor() {
        super("TestEvent");
    }
}

class TestCommand extends FabaCommand<Store> {
    execute(event: TestEvent) {
        //this.data.test = true;
    }
}

class TestCommand2 extends FabaCommand<Store> {
    execute(event: TestEvent) {
        event.callBack();
    }
}

class TestMediator extends FabaMediator {
    registerCommands(): void {
        this.addCommand(TestEvent, TestCommand);
        this.addCommand(TestEvent, TestCommand2);
    }
}

describe("Core", ()=>{
    it("Core should generate a list of events", function () {
        const core:FabaCore = new FabaCore(store);
        const testMediator:TestMediator = new TestMediator();

        FabaCore.addMediator(TestMediator);
        expect(FabaCore.events).toBeDefined();
    });
});