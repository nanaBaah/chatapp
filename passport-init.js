const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const _ = require('lodash');
const users = require('./data/users.json');

passport.use(new LocalStrategy(
    (username, password, done) => {
        const user = _.find(users, user => username === user.name);
        return (!user || user.password !== password) ? done(null, false) : done(null, user);
    }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    const userId = _.find(users, user => id === user.id);
    done(null, userId);
});