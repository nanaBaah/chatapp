
(async () => {
    const MongoClient = require('mongodb').MongoClient;

    const url = 'mongodb://localhost:27017/chat';

    const connect = await MongoClient.connect(url);
    const rooms = await connect.collection('rooms').find().toArray();
    console.log(rooms);
    connect.close();

})();


/*
MongoClient.connect(url, async function (error, db) {

    db.collection('rooms').find().toArray(function (error, result) {
        console.log(result);
    });

    db.close();
});
*/