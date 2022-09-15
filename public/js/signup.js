passport.use('local-signup', new passportlocal.Strategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, email, password, done){
connection.query("select * from userInfo where email = '"+email+"'", function(err, res){       
    if(err){
        console.error('error');
        // done(null, null);
        return done(null, false, { message: req.flash('error', 'Please fill your data correctly') });
        // return;
    }
    if (res.length) {
        console.log('user exist');
        return done(null, false, { message: req.flash('error', 'That email is already registered.') });
    }
    else{                
        // create the user
        var newUserMysql = new Object();
        newUserMysql.email = email;
        newUserMysql.password = password;
        newUserMysql.firstName = req.firstName;

        console.log(newUserMysql.firstName);

        var insertQuery = "INSERT INTO userInfo ( email, password, firstName ) values ('" + email +"','"+ password +"','"+ firstName +"')";

        connection.query(insertQuery,function(err,rows){
        newUserMysql.id = rows.insertId;

        // send mail with defined transport object
        app.locals.mailer.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });

        return done(null, newUserMysql);
        }); 

    }
})
})); 