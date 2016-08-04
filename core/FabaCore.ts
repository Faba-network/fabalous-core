/**
 * Created by joergwasmeier on 26.12.15.
 *
 *
 */

import FabaMediator from "./FabaMediator";
import FabaEvent from "./FabaEvent";
import FabaModel from "fabalous-core/core/FabaModel";

export default class FabaCore{
  static mediators:Array<FabaMediator> = new Array<FabaMediator>();
  static events:any = {};
  static vos:any = {};

  static model:FabaModel;


  static addMediator(cls:FabaMediator):boolean {

    for (var i = 0; i < FabaCore.mediators.length; i++) {
      var obj = FabaCore.mediators[i];
      
      if (obj === cls){
        console.log("same");
        return false;
      }
    }

    FabaCore.mediators.push(cls);
    return true;
  }

  static dispatchEvent(event:FabaEvent, resu?:boolean) {
    for(var a:number = 0; a < this.mediators.length; a++){
      var routeItem:Array<any> = this.mediators[a].cmdList;

      for(var b:number = 0; b < routeItem.length; b++){
        if (routeItem[b] && routeItem[b].event && routeItem[b].id){
          if (routeItem[b].id === event.name){
            if (resu) new routeItem[b].cmd().result(event);
            else new routeItem[b].cmd().execute(event);
          }
        }
      }
    }
  }
}