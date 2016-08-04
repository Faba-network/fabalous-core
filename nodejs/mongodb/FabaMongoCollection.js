import FabaServer from "../../runtimes/FabaServer";
/**
 * Created by creativecode on 27.12.15.
 */
export default class FabaMongoCollection {
    constructor(collectionName) {
        try {
            this.collection = FabaServer.db.dataBase.collection(collectionName);
        }
        catch (e) {
            throw Error("DB Is not Ready");
        }
    }
    find(selector, options, callback) {
        //return this.collection.find(selector, options, callback);
        return this.collection.find({ selector });
    }
    insert(query, options, callback) {
        //return this.collection.insert(query, options, callback);
    }
    update(selector, document, options, callback) {
        //return this.collection.update(selector, document, options, callback);
    }
}
