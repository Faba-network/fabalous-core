import { MongoClient } from "mongodb";
import { trace } from "../../utils/Logger";
export default class FabaMongoConnection {
    constructor(dbUrl) {
        this.dbUrl = dbUrl;
    }
    connect() {
        MongoClient.connect(this.dbUrl, (err, conDb) => {
            this.connectHandler(err, conDb);
        });
    }
    connectHandler(err, conDb) {
        if (err) {
            trace(err);
            trace("Could not connect to Database");
            setTimeout(() => {
                MongoClient.connect(this.dbUrl, null, (err, conDb) => {
                    this.connectHandler(err, conDb);
                });
            }, 1000);
            return;
        }
        this.dataBase = conDb;
        trace("Connect to Database");
    }
}
