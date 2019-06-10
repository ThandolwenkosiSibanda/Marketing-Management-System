var bodyParser = require('body-parser'),
    passport = require('passport'),
    localStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    express = require('express'),
    app = express(),
    User = require('./Models/User');





// =======================================================================================================================================
//  App Cpnfig
// 1. Connect To the Required Instance Of MongoDB
// 2.  Set up other needed configs such as 
//    a)view engine to avoid continously writing ejs on our views
//    b) enabling body parser to enable the collection of data from submitted forms
//    c) Initialize Passport  for authentication
//=========================================================================================================================================

// mongoose.connect('mongodb://localhost:27017/MolowehouDB', {
//     useNewUrlParser: true
// });



const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:%40thand0l2@molowehou-y3ip2.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true
});
client.connect(err => {
    //const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});






app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


// Passport Config

app.use(require("express-session")({
    secret: 'Molowehou',
    resave: false,
    saveUninitialized: true

}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//MiddleWare to ensure that the routes are all sent with the logged in User Data
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});



// ==========================================================================================================================================
//  App Cpnfig

// 1. Define The Schema For the Objects Basically how the object is structured
// 2. Tie the schema to the Model (The database)
//==========================================================================================================================================
var CustomerSchema = new mongoose.Schema({
    name: String,
    age: Number
});

var Customer = mongoose.model('Customer', CustomerSchema);


// =======================================================================================================================================
//  Restful Routes 
//=========================================================================================================================================

// =============
//  Index
//==============

app.get('/', function (req, res) {
    Customer.find({}, function (err, customers) {
        if (err) {
            console.log("ERROR! in Retrieving Data From The Database")
        } else {
            res.render('index', {
                customers: customers
            });

        }
    });

});
// =============
//  New
//==============
app.get('/customers/new', function (req, res) {
    res.render('new');
});


// ========================================================================
//  Secret Page To Test The effectiveness of User Authentication
//=========================================================================
app.get('/secret', isLoggedin, function (req, res) {
    res.render('secret');
});


// ========================================================================
//  Auth Routes
//=========================================================================

//Register Route
app.get('/register', function (req, res) {
    res.render('register');
});

//handling users Registration
app.post('/register', function (req, res) {

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
app.get('/login', function (req, res) {
    res.render('login');
});

//handling users Logins
app.post('/login', passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function (req, res) {});



app.get('/logout', function (req, res) {
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



// =======================================================================================================================================
//  Start the Database at a Specified Port eg. port 3000 
//=========================================================================================================================================

app.listen(3000, function (err, message) {
    if (err) {
        console.log("There was an error in Connecting to the database.")
    } else {
        console.log("Database Successfully started")
    }
});