export class FabaLogger{

    constructor(){

    }

    public log(){

    }

    public error(){

    }

    public info(){

    }

}


export var trace:any;

// @ifdef CLIENT
trace = function(){};

//trace = console.log.bind(console);
// @endif

// @ifdef SERVER
trace = require('tracer').colorConsole().log;
// @endif

// @ifdef SILENT
trace = function(){};
// @endif
