const express = require('express');
const ObjectID = require('mongodb').ObjectID;
const chatDB = require('../data/chatDB.js');

const router = express.Router();

module.exports = router;

router.get('/rooms', async (req, res) => {
    const connect = await chatDB.connect;
    const rooms = await connect.collection('rooms').find().toArray();

    res.render('rooms', {
        title: 'Home',
        rooms: rooms
    });
});

router.route('/rooms/edit/:roomId')
    .all(async (req, res, next) => {
        const filter = {"_id": new ObjectID(req.params.roomId)};
        const connect = await chatDB.connect;
        res.locals.room = await connect.collection('rooms').findOne(filter);
        next();
    })
    .get((req, res) => {
        res.render('edit', {
            title: 'Edit'
        });
    })
    .post(async (req, res) => {
        const filter = {"_id": new ObjectID(req.params.roomId)};
        const connect = await chatDB.connect;
        await connect.collection('rooms').updateOne(filter, req.body);
        res.redirect(`${req.baseUrl}/rooms`)
    });

router.get('/rooms/delete/:roomId', async (req, res) => {
    const filter = {"_id": new ObjectID(req.params.roomId)};
    const connect = await chatDB.connect;
    const result = await connect.collection('rooms').deleteOne(filter);
    res.redirect(`${req.baseUrl}/rooms`);
});

router.route('/rooms/add')
    .get((req, res) => {
        res.render('add', {
            title: 'Add Room'
        });
    })
    .post(async (req, res) => {
        const connect = await chatDB.connect;
        await connect.collection('rooms').insertOne(req.body);
        res.redirect(`${req.baseUrl}/rooms`);
    });