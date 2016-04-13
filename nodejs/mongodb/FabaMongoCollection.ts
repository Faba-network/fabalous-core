import FabaServer from "../../runtimes/FabaServer";
import {Collection, Cursor} from "mongodb";
import {CollectionOptions} from "mongodb";

/**
 * Created by creativecode on 27.12.15.
 */

export default class FabaMongoCollection{

  protected collection:Collection;

  constructor(collectionName:string){
    try {
      this.collection = FabaServer.db.dataBase.collection(collectionName);
    } catch(e){
      throw Error("DB Is not Ready");
    }
  }

  find(selector: Object, options?: CollectionOptions, callback?: (err: Error, result: Cursor) => void): Cursor{
    //return this.collection.find(selector, options, callback);
    return this.collection.find({selector});
  }

  insert(query: any, options: { safe?: any; continueOnError?: boolean; keepGoing?: boolean; serializeFunctions?: boolean; }, callback: (err: Error, result: any) => void): void {
    //return this.collection.insert(query, options, callback);
  }

  update(selector: Object, document: any, options: { safe?: boolean; upsert?: any; multi?: boolean; serializeFunctions?: boolean; }, callback: (err: Error, result: any) => void): void {
    //return this.collection.update(selector, document, options, callback);
  }

}