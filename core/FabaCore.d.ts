/**
 * Created by joergwasmeier on 26.12.15.
 *
 *
 */
import FabaMediator from "./FabaMediator";
import FabaEvent from "./FabaEvent";
import FabaModel from "fabalous-core/core/FabaModel";
export interface IFabaMediatorList {
    cls: any;
    mediator: FabaMediator;
}
export default class FabaCore {
    static mediators: Array<IFabaMediatorList>;
    static events: any;
    static vos: any;
    static model: FabaModel;
    static addMediator(cls: any): boolean;
    static dispatchEvent(event: FabaEvent, resu?: boolean): void;
}
