const { appendFile } = require('fs');

const router = require('express').Router();

//get routes for passPort

app.get('/', (req, res, next) => {
    res.send('<h1>Home</h1><p>Please <a href="/register"<a/></p>')
})

app.get('/login', (req, res, next) => {
    res.render('login')

})

app.get('/logout', (req, res, next) => {
    req.logout(); //removes user from session
    res.redirect('/protected-route')
})

app.get('/login-success', (req, res, next) => {
    res.send('<p>You Logged in Successfully! --> <a href= "/protected-route">Go to protected routes</a></p>')

})

app.get('/login-failure', (req, res, next) => {
    res.send('Something was entered incorrectly! Try again!')
})

app.get('/register', (req, res, next) => {
    console.log('Inside get');
    res.render('register')
})


// route below posts for registry and successful login 

app.post('/register', userExists, (req, res, next) => {
    console.log("inside post");
    console.log(req.body.password);
    const saltHash = genPassword(req.body.password);
    console.log(saltHash);
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    conncection.query('Insert into users(username, hash, salt, isAdmin) values(?, ?, ?, 0) ', [req.body.username, hash, salt], function(error, results, fields) {
        if(error)
        {
            console.log('Error')
        }
        else
        {
            console.log('Successfully Entered')
        }
    })

    res.redirect('/login')
})

app.post('/login', passport.authenticate('local', {failureRedirect: '/login-failure', successRedirect: '/login-success'}))


// below contains the get routes for admin/protection/authorized user

app.get('/protected-route', isAuthorized, (req, res, next) => {
    res.send('<h1>You are authenticated</h1><p> <a href="/logout">Logout and Refresh the Browser!</a></p>');


})


app.get('/admin-route', isAdmin, (req, res, next) => {
    res.send('<h1>You are an administrator!</h1><p> <a href="/logout">Log</a></p>')
})

//get routes below will contain unauthorized routes and the duplicate user routes

app.get('/notAuthorized',(req, res, next) => {
    console.log('inside get')
    res.send('<h1>You are not authorized to view this material</h1> <p> <a href="/login">Retry Logging In!</a></p>')
})

app.get('/notAuthoririzedAdmin', (req, res, next) => {
    console.log('inside get')
    res.send('<h1>You are not authorized to view this page</h1> <p> <a href="/login">Retry to log in as an administrator.</a></p>')
})


app.get('/userAlreadyExists', (req, res, next) => {
    console.log('inside get')
    res.send('<h1>Sorry this user already exists</h1> <p> <a href="/register">Register with your correct information!</a></p>')
})


