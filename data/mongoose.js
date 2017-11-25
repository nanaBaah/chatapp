const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/chat';

mongoClient.connect(url).then((err, db) => {

    db.collection('messages').insertMany([
        {
            "text": "test",
            "roomId": "7344e6b5-02d5-4eb9-89b5-7d334edc370c",
            "userId": "523e8ff2-7ae7-49b4-93cf-41362c6028ea"
        },
        {
            "text": "wes",
            "roomId": "7344e6b5-02d5-4eb9-89b5-7d334edc370c",
            "userId": "523e8ff2-7ae7-49b4-93cf-41362c6028ea"
        },
        {
            "text": "Really, hello guys",
            "roomId": "7344e6b5-02d5-4eb9-89b5-7d334edc370c",
            "userId": "523e8ff2-7ae7-49b4-93cf-41362c6028ea"
        }
    ]);

    db.close();
});
