/**
 * Created by joergwasmeier on 26.12.15.
 *
 *
 */

import FabaMediator from "./FabaMediator";
import FabaEvent from "./FabaEvent";

export interface IFabaMediatorList{
  cls:any,
  mediator:FabaMediator
}

export default class FabaCore{
  static mediators:Array<IFabaMediatorList> = [];
  static events:any = {};
  static vos:any = {};

  static addMediator(cls:any):boolean {
    for (var i = 0; i < FabaCore.mediators.length; i++) {
      var obj = FabaCore.mediators[i].cls;

      if (obj == cls){
        return false;
      }
    }

    FabaCore.mediators.push({cls:cls, mediator:new cls});
    return true;
  }

  static dispatchEvent(event:FabaEvent, resu?:boolean) {
    for(var a:number = 0; a < this.mediators.length; a++){
      var routeItem:Array<any> = this.mediators[a].mediator.cmdList;

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

export declare var CLIENT;
export declare var SERVER;