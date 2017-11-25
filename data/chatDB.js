const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017/chat';

const connect = MongoClient.connect(url);

module.exports = {
    connect: connect
};
