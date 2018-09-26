'use strict';
const ObjectId = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
let dbo;

function BaseFunction() {
    /**
     * Convert id relasi yang ada di table lain
     */
    this.convertToObjectId = function (entity) {
        let objEntity = [
         'id'
        ];
        if (Array.isArray(entity)) {
            for (let i = 0; i < entity.length; i++) {
                let dataEntity = entity[i];
                for (let key in dataEntity) {
                    let check = objEntity.includes(key);
                    if (check) {
                        let value = dataEntity[key];
                        dataEntity[key] = ObjectId(value);
                    }
                }
            }
        } else {
            for (let key in entity) {
                let check = objEntity.includes(key);
                if (check) {
                    let value = entity[key];
                    entity[key] = ObjectId(value);
                }
            }
        }
    }
}