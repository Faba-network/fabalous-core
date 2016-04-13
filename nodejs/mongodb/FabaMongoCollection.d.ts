import { Collection, Cursor } from "mongodb";
import { CollectionOptions } from "mongodb";
/**
 * Created by creativecode on 27.12.15.
 */
export default class FabaMongoCollection {
    protected collection: Collection;
    constructor(collectionName: string);
    find(selector: Object, options?: CollectionOptions, callback?: (err: Error, result: Cursor) => void): Cursor;
    insert(query: any, options: {
        safe?: any;
        continueOnError?: boolean;
        keepGoing?: boolean;
        serializeFunctions?: boolean;
    }, callback: (err: Error, result: any) => void): void;
    update(selector: Object, document: any, options: {
        safe?: boolean;
        upsert?: any;
        multi?: boolean;
        serializeFunctions?: boolean;
    }, callback: (err: Error, result: any) => void): void;
}
