var bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    passport = require('passport'),
    localStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    express = require('express'),
    app = express();


// =======================================================================================================================================
//  Include and register all Models
//    1. User
//    2. Clients
//    3.Visits
//=========================================================================================================================================
var User = require('./models/User'),
    Clients = require('./models/Client'),
    Visit = require('./models/Visit'),
    Region = require('./models/Region'),
    Category = require('./models/Category');

// =======================================================================================================================================
//  Include all Routes But they will be called at the very end
//    1. User
//    2. Clients
//    3. Visits
//=========================================================================================================================================
var clientsRoutes = require('./routes/clients'),
    indexRoutes = require('./routes/index'),
    visitsRoutes = require('./routes/visits'),
    regionsRoutes = require('./routes/regions'),
    categoriesRoutes = require('./routes/categories');


// =======================================================================================================================================
//  App Config
// 1. Connect To the Required Instance Of MongoDB
// 2.  Set up other needed configs such as 
//    a) View engine to avoid continously writing ejs on our views
//    b) Enabling body parser to enable the collection of data from submitted forms
//    c) Serving the Public directory to access it just like the views folder(The public dire)
//    d) Initialize Passport  for authentication
//=========================================================================================================================================

mongoose.connect('mongodb://localhost:27017/MarketingManagementSystemDB', {
    useNewUrlParser: true
});





// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://admin:%40thand0l2@molowehou-y3ip2.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//     useNewUrlParser: true
// });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(methodOverride("_method"));
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

// ============================================================================================================================================
//Function to ensure that all the routes are sent with: 
//     1. the logged in User Data
//     2. 
// ============================================================================================================================================
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});



// ===========================================================================================================================================
//  Secret Page To Test The effectiveness of User Authentication
//============================================================================================================================================
app.get('/secret', isLoggedin, function (req, res) {
    res.render('secret');
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


//============================================================================================================================================
//The Routes Have to be called last, otherwise they will not work
//They are however declared at the very top
//============================================================================================================================================

app.use(clientsRoutes);
app.use(indexRoutes);
app.use(visitsRoutes);
app.use(regionsRoutes);
app.use(categoriesRoutes);

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