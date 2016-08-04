export class FabaLogger {
    constructor() {
    }
    log() {
    }
    error() {
    }
    info() {
    }
}
export var trace;
// @ifdef CLIENT
trace = function () { };
//trace = System.import('tracer').colorConsole().log;
// @endif
// @ifdef SILENT
trace = function () { };
// @endif
