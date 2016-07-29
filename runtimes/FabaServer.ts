/**
 * Created by joergwasmeier on 26.12.15.
 *
 *
 */
import FabaCore from "./../core/FabaCore";
import FabaValueObject from "./../core/FabaValueObject";
import FabaMongoConnection from "./../nodejs/mongodb/FabaMongoConnection";
import {trace} from "./../utils/Logger";
import {Express} from "express";
import Response = Express.Response;
import Request = Express.Request;

export default class FabaServer extends FabaCore{
  static db:FabaMongoConnection;
  express = require('express');
  app:Express;
  koa = require('koa');
  assign = require('object.assign').getPolyfill();

  constructor(){
    super();
    this.app = this.express();
    this.startServer();
  }

  addDatabaseConnection(db:FabaMongoConnection){
    FabaServer.db = db;
    FabaServer.db.connect();
  }

  parseObject(obj){
    for (var key in obj) {
      if (obj[key] != null && obj[key].className != null){
        let vo:FabaValueObject = obj[key];
        try {

          let neVoInst:any = new FabaCore.vos[vo.className];
          obj[key] = this.assign(neVoInst, vo);

          obj[key] = this.parseObject(obj[key]);

        } catch(e){
          throw e;
        }
      }
    }


    return obj;
  }

  private startServer(){
    this.app.use(function(req:any, res, next){
      var data = "";
      req.on('data', function(chunk){ data += chunk});
      req.on('end', function(){
        req.rawBody = data;
        next();
      })
    });

    this.app.all('/', function(req:any, res:any, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    });

    this.app.get('/',function (req:any, res:any) {
      res.send("Hallo welt");
    });

    this.app.post('/', (req:any, res:any) => {
      let body = JSON.parse(req.rawBody);
      let currentEvent = new FabaCore.events[body.identifyer]();
      var h:any = this.assign(currentEvent, JSON.parse(req.rawBody));

      h = this.parseObject(h);

      h.dispatch((event) => {
        console.log(event);
        res.send(JSON.stringify(event));
      });
    });

    var port = 3120;

    this.app.listen(port);
  }

  private rawBody(req, res, next) {
    req.setEncoding('utf8');
    req.rawBody = '';
    req.on('data', function(chunk) {
      req.rawBody += chunk;
    });
    req.on('end', function(){
      next();
    });
  }

  private rawData(req, res, next) {
    req.setEncoding('utf8');
    req.rawBody = '';
    req.on('data', function(chunk) {
      req.rawBody += chunk;
    });
    req.on('end', function(){
      next();
    });
  }
}