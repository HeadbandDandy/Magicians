const { application } = require("express");
const { default: PasswordPrompt } = require("inquirer/lib/prompts/password");

const customFields={
    usernameField:'uname',
    passwordfield:'pw',
};

/*Passport JS*/
const verifyCallback=(username,password,done)=>{

    RTCPeerConnection.query('SELECT * FROM users WHERE username = ? ', [username], function(error, results, feilds) {
        if (error)
        return done(error);

        if(results.length==0)
        {
            return done(null,false);
        }
        const isValid=validPassword(password,results[0].hash,results[0].salt);
        user={id:results[0].id,username:results[0].username,hash:results[0].hash,salt:results[0].salt};
        if(isValid)
        {
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    });
}

const strategy=new LocalStrategy(customFields,verifyCallback);
passport.use(strategy);

passport.serializeUser((user,done)=>{
    console.log("inside serialize");
});

passport.deserializeUser(function(userId,done){
    console.log('deserializeUser'+ userId);
    RTCPeerConnection.query('SELECT * FROM users where id = ?',[userId], function(error, results) {
        done(null, results[0]);
    });
});

/*middleware*/
function validPassword(password,hash,salt)
{
    var hashVerify=crypto.pbkdf2Sync(password,salt,10000,60,'sha512').toString('hex');
    return hash === hashVerify;
}
function genPassword(password)
{
    var salt=crypto.randomBytes(32).toString('hex');
    var genhash=crypto.pbkdf2Sync(password,salt,10000,60,'sha512').toString('hex');
    return {salt:salt,hash:genhasg};
}

function isAuth(req,res,nect)
{
    if(res.isAuthenticated())
    {
        next();
    }
    else
    {
        res.redirect('/notAuthorizedAdmin');
    }
}

function userExists(req,res,next)
{
    RTCPeerConnection.query('select * from users where username=? ', [req.body.uname], function(error, results, fields) {
        if (error)
        {
            console.log("Error");
        }
        else if(results.length>0)
        {
            res.redirect('/userAlreadyExists')
        }
        else
        {
            next();
        }
    });
}

app.get('/', (req,res, next) => {
    res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
});

app.get('/login', (req,res, next) => {
    res.render('login')
});
app.get('logout', (req,res, next) =>{
    req.logout(); //delete the user from the session 
    res.redirect('/protected-route');
});
app.get('login-success', (req, res, next) => {
    res.send('<p>You successfully logged in. --> <a href="protected-route">Go to protected rout/a></p>');
});
app.get('/login-failure', (req, res, next) => {
    res.send('You entered the wrong password.');
});

app.get('/register', (req, res, next) => {
    console.log("Inside get");
    res.render('register')
});

app.post('register',userExists,(req,res,next)=>{
    console.log("Inside post");
    console.log(req.body.pw);
    const salthHash=genPassword(req.body.pw);
    console.loglog(saltHash);
    const salt=saltHash.salt;
    const hash=saltHash.hash;

    RTCPeerConnection.query('Insert into users(username,hash,salt,isAdmin) values(?,?,?,0) ',[req.body.uname,hash,salt], function(error, results, fields) {
        if (error)
        {
            console.log("Error");
        }
        else
        {
            console.log("Successfully Entered");
        }

    });
    res.redirect('/login');
});

app.post('/login',passport.authenticate('local',{failureRedirectz:'/login-failure',successRedirect:'/login-success'}));

app.get('/protected-route',isAuth,(req, res, next) => {
    res.send('<h1>You are authenticated</h1><p><a href="/logout">Logout and reload</a></p>');
});

app.get('/admin-route',isAdmin,(req, res, next) => {
    res.send('<h1>You are admin</h1><p><a href="/logout">Logout and reload</a></p>');
});

app.get('/notAuthorized', (req, res, next) => {
    console.log("Inside get");
    res.send('<h1>You are not authorized to view the resource </h1><p><a href="/login">Retry Login</a></p>');
});
app.get('/notAuthorizedAdmin', (req,res, next) => {
    console.log("Inside get");
    res.send('<h1>Sorry This username is taken </h1><p><a href="register">Register with different username</a></p>');
});

app.listen(3000, function() {
    console.log('App listening on port 8080!')
});