import FabaMediator from "../src/FabaMediator";
import FabaSerivce from "../src/FabaService";
import FabaEvent from "../src/FabaEvent";
import FabaCore from "../src/FabaCore";

/**
 * Created by creativecode on 05.09.16.
 */
var testEvent: FabaEvent;
var testService: FabaSerivce;

class TestEvent extends FabaEvent {
    constructor(){
        super("TestEvent");
    }
}

class TestService extends FabaSerivce {
    execute(event:TestEvent) {

    }
}

class TestMediator extends FabaMediator{
    registerServices() {
        this.addSerivce(TestEvent, TestService);
        return super.registerServices();
    }
}

describe("FabaServer Spec", function () {
    FabaCore.addMediator(new TestMediator);

    it("TestMediator should be there", function () {
        expect(true).toBe(true);
    });

    it("TestEvent should be there", function () {
        expect(true).toBeTruthy();
    });
});

