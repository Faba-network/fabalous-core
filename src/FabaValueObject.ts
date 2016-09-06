import FabaModel from "./FabaModel";

export default class FabaValueObject extends FabaModel {
  className:string;

  protected schema = {};

  constructor(){
    super();
  }

}
