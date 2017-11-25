const express = require('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/chat';

const _ = require('lodash');
const uuidv4 = require('uuid/v4');

let rooms = require('../data/rooms.json');
let messages = require('../data/messages.json');

module.exports = router;

router.get('/rooms', async (req, res) => {

    const connect = await MongoClient.connect(url);
    const rooms1 = await connect.collection('rooms').find().toArray();
    res.json(rooms1);
    await connect.close();

});

router.get('/rooms/:roomId/messages', (req, res) => {
    const roomId = req.params.roomId;
    let roomMessages = _.filter(messages, message => roomId === message.roomId);
    res.json(roomMessages);
});

router.post('/rooms/:roomId/messages', (req, res) => {
    const roomId = req.params.roomId;
    messages.push({
        text: req.body.text,
        roomId: roomId,
        userId: "523e8ff2-7ae7-49b4-93cf-41362c6028ea",
        id: uuidv4()
    });
    res.sendStatus(200);
});

router.delete('/rooms/:roomId/messages', (req, res) => {
    const roomId = req.params.roomId;

    res.sendStatus(200);
});