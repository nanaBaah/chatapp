const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');

require('./passport-init');
const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('./node_modules/bootstrap/dist'));
app.use(express.static('./node_modules/jquery/dist'));
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('./route/auth.js'));
//app.use((req, res, next) => !req.isAuthenticated() ? res.redirect('login') : next());

app.get('/', (req, res) => {
    res.render('home');
});

app.use('/api', require('./route/api.js'));
app.use('/admin', require('./route/admin.js'));

app.listen(`${app.get('port')}`, () => {
    console.log(`Server is running on port ${app.get('port')}`);
});