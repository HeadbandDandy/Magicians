//const passport = require('passport')
//const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const express = require('express');
// const bodyParser = require(body-parser);
const mysql = ('mysql');
const crypto = require('crypto');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const { Sequelize } = require('sequelize');

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

const hbs = exphbs.create({});
// const helpers = require('./utils/authorization')

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//express MiddleWare
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controller'));


sequelize.sync({force: false }).then(() => {
    app.listen(PORT, () => console.log('Now Listening'))
})