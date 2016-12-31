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
        this.data.test = true;
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

describe("Event Command Flow", () => {
    it("Event should be there", function () {
        const event = new TestEvent();
        expect(event).toBeDefined();
    });

    it("Command should be there", function () {
        const command = new TestCommand(store);
        expect(command).toBeDefined();
    });

    it("Mediator should be registered", function () {
        FabaCore.addMediator(TestMediator);
        expect(FabaCore.mediators.length).toBeGreaterThan(0);
    });

    fit("Test store should be true", function (done) {
        new FabaCore(store);
        FabaCore.addMediator(TestMediator);
        new TestEvent().dispatch(()=>{
        }).then(() => {
            expect(store.data.test).toBeTruthy();
            done();
        });
    });
});