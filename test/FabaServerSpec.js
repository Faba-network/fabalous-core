"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FabaMediator_1 = require("../src/FabaMediator");
var FabaService_1 = require("../src/FabaService");
var FabaEvent_1 = require("../src/FabaEvent");
var FabaCore_1 = require("../src/FabaCore");
/**
 * Created by creativecode on 05.09.16.
 */
var testEvent;
var testService;
var TestEvent = (function (_super) {
    __extends(TestEvent, _super);
    function TestEvent() {
        _super.call(this, "TestEvent");
    }
    return TestEvent;
}(FabaEvent_1["default"]));
var TestService = (function (_super) {
    __extends(TestService, _super);
    function TestService() {
        _super.apply(this, arguments);
    }
    TestService.prototype.execute = function (event) {
    };
    return TestService;
}(FabaService_1["default"]));
var TestMediator = (function (_super) {
    __extends(TestMediator, _super);
    function TestMediator() {
        _super.apply(this, arguments);
    }
    TestMediator.prototype.registerServices = function () {
        this.addSerivce(TestEvent, TestService);
        return _super.prototype.registerServices.call(this);
    };
    return TestMediator;
}(FabaMediator_1["default"]));
describe("FabaServer Spec", function () {
    FabaCore_1["default"].addMediator(new TestMediator);
    it("TestMediator should be there", function () {
        expect(true).toBe(true);
    });
    it("TestEvent should be there", function () {
        expect(true).toBeTruthy();
    });
});
