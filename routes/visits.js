var Visit = require('../models/Visit'),
    express = require('express'),
    Client = require('../models/Client');

var router = express.Router();

// ===========================================================================================================================================
//  Index
// To Display All the Visits in the Database 
//============================================================================================================================================

router.get('/visits', function (req, res) {
    Visit.find({}, function (err, visits) {
        if (err) {
            console.log("ERROR! in Retrieving Data From The Database")
        } else {
            res.render('visit/index', {
                visits: visits
            });

        }
    });

});


// ===========================================================================================================================================
//  Create- New
// Show The Form For Creating A new Client
//============================================================================================================================================
router.get('/visits/new', function (req, res) {
    res.render('visit/add');
});

// ===========================================================================================================================================
//  Store
//  Save the Details of a new client
//============================================================================================================================================
router.post('/visits/', function (req, res) {
    var visit = req.body.visit;

    Visit.create(visit, function (err, newVisit) {
        if (err) {
            return res.redirect('/visits/new');
        }
        Client.findById('5cff97fac8ef6e52a4304a24', function (err, foundClient) {
            foundClient.visits.push(newVisit);
            foundClient.save(function (err, data) {
                if (err) {
                    console.log(err);
                    return res.redirect('/visits');
                } else {
                    console.log(data);
                    return res.redirect('/visits');
                }
            });
        });

    });
});


// ===========================================================================================================================================
//  Show
//  Display the Full Details of a client
//============================================================================================================================================
router.get('/visits/:id', function (req, res) {
    res.send('Show the Client Full Details');
});


// ===========================================================================================================================================
//  Edit
//  Show the Edit Form For The Client
//============================================================================================================================================
router.get('/visits/:id/edit', function (req, res) {
    res.send('Show The Form for edit');
});


// ===========================================================================================================================================
//  Update
//  Update the Details of the Client
//============================================================================================================================================
router.post('/visits/:id', function (req, res) {
    //Method PUT
    res.send('Show The Form for edit');
});


// ===========================================================================================================================================
//  Destroy
//============================================================================================================================================
router.post('/visits/:id', function (req, res) {
    //Method DELETE
    res.send('Delete the ');
});





module.exports = router;