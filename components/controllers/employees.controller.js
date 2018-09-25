'use strict';
const MongoClient = require('mongodb').MongoClient;

const config = require('../configurations/config');
let dbo;

module.exports = exports = function (server, name) {
    const route = '/api/' + name;
    server.post(route, (req, res, next) => {
        MongoClient.connect(config.dbconn, async function (err, db) {
            if (err) throw err;
            let entity = req.body;
            
            dbo = db.db(config.dbname);
            await dbo.collection(name).insert(entity, function (err, response) {
                if (err) throw err;
                res.send(201, response);
                db.close();
            });
        });
    });

    server.get(route, (req, res, next) => {
        MongoClient.connect(config.dbconn, async function (err, db) {
            if (err) throw err;   
            dbo = db.db(config.dbname);
            await dbo.collection(name).find({}).toArray(function (err, response) {
                if (err) throw err;
                res.send(200, response);
                db.close();
            });
        });
    });

    server.get(route + '/:id', (req, res, next) => {
        MongoClient.connect(config.dbconn, async function (err, db) {
            if (err) throw err;
            let id = req.params.id;
            dbo = db.db(config.dbname);
            await dbo.collection(name).findOne({ 'id': id}, function (err, response){
                if (err) throw err;
                res.send(200, response);
                db.close();
            });
        });
    });

    server.put(route + '/:id', (req, res, next) => {
        MongoClient.connect(config.dbconn, async function (err, db) {
            if (err) throw err;
            let id = req.params.id;
            let entity = req.body;
            dbo = db.db(config.dbname);
            await dbo.collection(name).update({ 'id': id }, entity, function (err, response) {
                if (err) throw err;
                res.send(200, response);
                db.close();
            });
        });
    });

    server.del(route + '/:id', (req, res, next) => {
        MongoClient.connect(config.dbconn, async function (err, db) {
            if (err) throw err;            
            let id = req.params.id;
            dbo = db.db(config.dbname);
            await dbo.collection(name).deleteOne({ 'id': id}, function (err, response)  {
                if (err) throw err;
                res.send(200, response);
                db.close();
            });
        });
    });

}