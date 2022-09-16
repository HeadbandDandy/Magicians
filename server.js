const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const express = require('express');
const bodyParser = require(body-parser);
const mysql = ('mysql');
const crypto = require('crypto');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('');
const { Sequelize } = require('sequelize');

const sess = {
    secret: '',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })

};

app.use(session(sess));


//express MiddleWare
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require(''))


sequelize.sync({force: false }).then(() => {
    app.listen(PORT, () => console.log('Now Listening'))
})