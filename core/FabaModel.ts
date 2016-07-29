export default class FabaModel{

    bin:Array<any>;

    constructor(){
        this.bin = new Array<any>();
    }

    addChangeListener(name:string, cb:any) {
        this.bin.push({name:name, callback:cb});
    }

    removeChangeListener(name:string) {
        for (var prop in this.bin) {
            if (this.bin[prop].name == name){
                delete this.bin[prop];
            }
        }
    }

    invokeBindChange(){
        if (!this.bin) return;
        for (var prop in this.bin) {
            this.bin[prop].callback();
        }
    }
}



