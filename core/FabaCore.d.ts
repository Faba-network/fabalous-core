/**
 * Created by joergwasmeier on 26.12.15.
 *
 *
 */
import FabaMediator from "./FabaMediator";
import FabaEvent from "./FabaEvent";
import FabaModel from "fabalous-core/core/FabaModel";
export default class FabaCore {
    static mediators: Array<FabaMediator>;
    static events: any;
    static vos: any;
    static model: FabaModel;
    static addMediator(cls: FabaMediator): boolean;
    static dispatchEvent(event: FabaEvent, resu?: boolean): void;
}
