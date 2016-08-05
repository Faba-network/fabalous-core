/**
 * Created by joergwasmeier on 26.12.15.
 *
 *
 */
export default class FabaCore {
    static addMediator(cls) {
        for (var i = 0; i < FabaCore.mediators.length; i++) {
            var obj = FabaCore.mediators[i].cls;
            if (obj == cls) {
                return false;
            }
        }
        FabaCore.mediators.push({ cls: cls, mediator: new cls });
        return true;
    }
    static dispatchEvent(event, resu) {
        for (var a = 0; a < this.mediators.length; a++) {
            var routeItem = this.mediators[a].mediator.cmdList;
            for (var b = 0; b < routeItem.length; b++) {
                if (routeItem[b] && routeItem[b].event && routeItem[b].id) {
                    if (routeItem[b].id === event.name) {
                        if (resu)
                            new routeItem[b].cmd().result(event);
                        else
                            new routeItem[b].cmd().execute(event);
                    }
                }
            }
        }
    }
}
FabaCore.mediators = new Array();
FabaCore.events = {};
FabaCore.vos = {};
