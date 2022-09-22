const withAuth = (req, res, next) => {
    if(!req.session.user_id) {
        //login file needs to be created and routed
        res.redirect('/login')
    } else {
        next();

        //We need to redirect the user back to the page if the password/email is incorrect
        //If they log in correctly they need to be able to see their budget
    }
};

module.exports = withAuth;