import FabaMediator from "../src/FabaCoreMediator";
import FabaEvent from "../src/FabaEvent";
import FabaCommand from "../src/FabaCoreCommand";
import FabaCore from "../src/FabaCore";
import FabaImmutableStore from "../src/store/FabaImmutableStore";
import FabaStore from "../src/store/FabaStore";

/**
 * Created by creativecode on 29.12.16.
 */
class Store {
    test: boolean = false;
}

new FabaCore(new FabaImmutableStore<Store>(new Store()));

class TestEvent extends FabaEvent {
    constructor() {
        super("TestEvent");
    }
}

class TestCommand extends FabaCommand<Store> {
    execute(event: TestEvent) {
        //this.store.set("test", true);
        event.callBack();
        event.cbs();

    }
}

class TestCommand2 extends FabaCommand<Store> {
    execute(event: TestEvent) {
        event.cbs();
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
       // const command = new TestCommand(new FabaStore({}));
       // expect(command).toBeDefined();
    });

    it("Mediator should be registered", function () {
        FabaCore.addMediator(TestMediator);
        expect(FabaCore.mediators.length).toBeGreaterThan(0);
    });

    it("TestEvent should be called", function (done) {
        FabaCore.addMediator(TestMediator);
        new TestEvent().dispatch().then(() => {
            //console.log(FabaCore.store.serialize());
           done();
        });
    });

    it("TestEvent should be called", function (done) {
        //new FabaCore(store);
        FabaCore.addMediator(TestMediator);
        new TestEvent().delayDispatch(100).then(() => {
            done();
        });
    });

    /*
    it("TestEvent callback should be called", function (done) {
        new FabaCore(store);
        FabaCore.addMediator(TestMediator);
        new TestEvent().dispatch((e: TestEvent) => {
            done();
        });
    });
    */
});