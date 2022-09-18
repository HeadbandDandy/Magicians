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