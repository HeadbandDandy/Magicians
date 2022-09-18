//below contains authentication to run Passport.Js

const passport = require("passport");
const { ConnectionAcquireTimeoutError } = require("sequelize");
const { resourceLimits } = require("worker_threads");



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


//below will serialize a user ID
passport.serializeUser((user, done) => {
    console.log('inside serialize');
    done(null, user.id)
})


//below will deserialize a user ID

passport.deserializeUser(function(userId, done) {
    console.log('deserializeUser' + userId);
    connection.query('SELECT * FROM users where id = ?', [userId], function(error, results){
        done(null, results[0])
    })
})

//functions as middleware below
function validPassword(password, hash, salt)
{
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 60, 'sha512').toString('hex');
    return hash === hashVerify;
}
function genPassword(password)
{
    var salt = crypto.randomBytes(32).toString('hex');
    var genhash = crypto.pbkdf2Sync(password, salt, 10000, 60, 'sha512').toString('hex');
    return {salt:salt, hash:genhash}
}


//redirects to notauthorized

function isAuthorized(req, res, next) 
{
    if(req.isAuthenticated())
    {
        next();
    }
    else
    {
        res.redirect('/notAuthorized')
    }
}

// checks if the user is an administrator
function isAdmin(req, res, next) 
{
    if(req.isAuthenticated() && req.userf.isAdmin == 1)
    {
        next();
    }
    else
    {
        res.redirect('/notAuthorizedAdmin')
    }
}

