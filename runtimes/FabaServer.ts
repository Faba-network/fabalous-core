/**
 * Created by joergwasmeier on 26.12.15.
 *
 *
 */

import FabaCore from "./../core/FabaCore";
import FabaValueObject from "./../core/FabaValueObject";
import FabaMongoConnection from "./../nodejs/mongodb/FabaMongoConnection";
import {trace} from "./../utils/Logger";

export default class FabaServer extends FabaCore{
  static db:FabaMongoConnection;

  //koa = require('koa');

  //express = require('express');
  app;

  //assign = require('object.assign').getPolyfill();

  constructor(){
    super();

    var http = require("http");
    var server = http.createServer(function(request, response) {
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write("Hallo");
      response.end();
    });

    server.listen(3150);


   // this.startServer();
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
    trace("Start server");
    this.app.use(function *test(){
      this.body = 'Hello World';
    });

    /*
    this.app.all('/api/', function(req:any, res:any, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    });

    this.app.post('/api/', (req, res) => {
      let body = JSON.parse(req.rawBody);
      let currentEvent = new SynapseApplication.events[body.identifyer];

      var h:any = this.assign(currentEvent, JSON.parse(req.rawBody));
      h = this.parseObject(h);

      h.dispatch((event) => {
        res.send(JSON.stringify(event));
      });
    });
    */
    var port = 3000;
    // @ifdef TEST
    port = 3000 + Math.floor((Math.random() * 1000) + 1);
    // @endif
    trace(port);
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