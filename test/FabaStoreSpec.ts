import FabaStore from "../src/FabaStore";
/**
 * Created by creativecode on 30.11.16.
 */

interface ITestJson {
    readonly test: string;
}

var testJson = {
    test: "test"
};

class TestData {
    readonly test: string;
}


interface ExtStore extends FabaStore<TestData> {
}

var testStore: ExtStore = new FabaStore<TestData>(new TestData());

testStore.set("test", "dfdddf");
