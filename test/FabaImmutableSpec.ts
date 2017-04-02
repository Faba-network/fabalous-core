import FabaImmutableStore from "../src/store/FabaImmutableStore";
import FabaCoreMediator from "../src/FabaCoreMediator";
import FabaStoreUpdateEvent from "../src/event/FabaStoreUpdateEvent";
import FabaCoreCommand from "../src/FabaCoreCommand";
import FabaCore from "../src/FabaCore";

interface ITestData{
    test:boolean
}

const testData:ITestData = {
    test:false
};

class TestMediator extends FabaCoreMediator {
    registerCommands(): void {
        this.addCommand(FabaStoreUpdateEvent, TestCommand);
    }
}

class TestCommand extends FabaCoreCommand<ITestData> {
    execute(event: FabaStoreUpdateEvent) {
        event.callBack();
    }
}

const store: FabaImmutableStore<ITestData> = new FabaImmutableStore<ITestData>(testData, {immutable:true});

describe("Immutablestore", ()=> {
    it("Immutable should be there", function () {
        expect(store).toBeDefined();
    });

    it("Testdata should be false", function () {
        expect(store.data.test).toBeFalsy();
    });

    it("Readonly data", function () {
        try{
            store.data.test = true;
        } catch (e){
            expect(e).toBeDefined();
        }
    });

    it("Update should be called after state changed", function (done) {
        new FabaCore(store);
        FabaCore.addMediator(TestMediator);
        new FabaStoreUpdateEvent({}).dispatch();
        store.set("test", false);

        setTimeout(()=>{
            done();
        }, 100);
    });
/*
    it("should serialize", function(){
       let ser:string = store.serialize();
       expect(ser).toBe({"test":false});
    });
    */
});