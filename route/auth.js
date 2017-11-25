const express = require('express');
const passport = require('passport');
const router = express.Router();

router.route('/login')
    .get((req, res) => {
        res.render('login');
    })
    .post(passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

module.exports = router;