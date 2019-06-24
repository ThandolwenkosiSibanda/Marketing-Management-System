var express = require('express'),
    passport = require('passport');

var router = express.Router();
var User = require('../models/User');
var Region = require('../models/Region');



// ========================================================================
//  Dashboard Routes
//=========================================================================

//  Index

router.get('/', function (req, res) {
    Region.find({}, function (err, regions) {
        if (err) {
            console.log("ERROR! in Retrieving Data From The Database")
        } else {
            res.render('region/index', {
                regions: regions
            });

        }
    });

});




// ========================================================================
//  Auth Routes
//=========================================================================

//Register Route
router.get('/register', function (req, res) {
    res.render('register');
});

//handling users Registration
router.post('/register', function (req, res) {

    var newUser = new User({
        username: req.body.username
    });

    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/secret");
        });

    });


});


//Login Route
router.get('/login', function (req, res) {
    res.render('login');
});

//handling users Logins
router.post('/login', passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function (req, res) {});



router.get('/logout', function (req, res) {
    req.logOut();
    res.redirect('/');
});



//=========================================================================================================================================
// Middleware
//This is where we specify our middleware 
//isLoggedin to check if the user is logged in or not .Redirect to login page if not logged in
//=========================================================================================================================================
function isLoggedin(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');


}


module.exports = router;