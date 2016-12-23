'use strict';

let mongoClient = require('mongodb').MongoClient;

let dbPool = {};
module.exports = {
    connect: (url, dbname) => {
        let db = dbPool[dbname];
        if (!db) {
            db = mongoClient.connect(url).then(db => {
                console.log("Connect mongo db: " + url);
                return db;
            }).catch(err => {
                console.log("Connect mongo db: " + url + " error." + err);
            });
            dbPool[dbname] = db;
        }
        return db;

    },
    get: dbname => {
        return dbPool[dbname];
    }
};
