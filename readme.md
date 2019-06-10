var bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    express = require('express'),
    app = express();



// =======================================================================================================================================
//  App Cpnfig
// 1. Connect To the Required Instance Of MongoDB
// 2.  Set up other needed configs such as 
//    a)view engine to avoid continously writing ejs on our views
//    b) enabling body parser to enable the collection of data from submitted forms
//=========================================================================================================================================
mongoose.connect('mongodb://localhost:27017/MolowehouDB', {
    useNewUrlParser: true
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

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


// Customer.create({
//     name: "Makhosi Zulu",
//     age: 34
// }, function (err, Customer) {
//     if (err) {
//         console.log("there was an error");
//     } else {
//         console.log(Customer);
//     }

// });

// Customer.find({}, function (err, Customers) {
//     if (err) {
//         console.log("there was an error");
//     } else {
//         console.log("All of the Customers");
//         console.log(Customers);
//     }

// });

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