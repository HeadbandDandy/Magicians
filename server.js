const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const exphbs = require('express-handlebars');
//const routes = require('./controllers/')
//const passport = require('passport')

const PORT = process.env.PORT || 3006;
const app = express();


app.use(bodyParser.urlencoded({
    extended: false
  }))

//require('./authentication').init(app)

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//const { Sequelize } = require('sequelize');

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

// app.use(passport.initialize())
// app.use(passport.session())

const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);


app.set('view engine', 'handlebars');

app.use(express.static('images'));
app.use(express.static('public'))

//express MiddleWare
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));


// sequelize.sync({force: true }).then(() => {
//     app.listen(PORT, () => console.log('Now Listening'))
// })

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });