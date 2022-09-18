//below contains authentication to run Passport.Js

const passport = require("passport");
const { ConnectionAcquireTimeoutError } = require("sequelize")



const customFields = {
    username: 'username',
    password: 'password'
}

//below verifies callback for correct/incorrect username/password 
const verifyCallback = (username, password, done) => {
    connection.query('SELECT * FROM users WHERE username = ? ', [username], function(error, results, fields) {
        if (error)
            return done(error);
        if (results.length == 0 )
        {
            return done(null, false);
        }
        const isValid = validPassword(password, results[0].hash, results[0].salt);
        user = {id: results[0].id, username:results[0].username, hash:results[0], salt:results[0].salt};
        if(isValid)
        {
            return done(null, user);
        }
        else {
            return done(null, false)
        }
    });
}


//below inits app

const strategy = new LocalStrategy(customFields, verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => {
    console.log('inside serialize');
    done(null, user.id)
})