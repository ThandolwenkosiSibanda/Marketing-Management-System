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
router.get('/clients/:client_id/visits/new', function (req, res) {
    var client_id = req.params.client_id;
    Client.findById(client_id).populate('region').populate('category').populate('visits').exec(function (err, foundClient) {
        if (err) {
            console.log('error');
        } else {
            res.render('visit/add', {
                client: foundClient
            });
        }
    });
});

// ===========================================================================================================================================
//  Store
//  Save the Details of a new client
//============================================================================================================================================
router.post('/visits', function (req, res) {
    var visit = req.body.visit;
    var id = req.body.visit.client;
    Visit.create(visit, function (err, newVisit) {
        if (err) {
            return res.redirect('/visits/new');
        } else {
            Client.findById(id, function (err, foundClient) {

                foundClient.visits.push(newVisit);
                foundClient.save(function (err, data) {
                    if (err) {
                        console.log(err);
                        return res.redirect('/clients');
                    } else {

                        return res.redirect('/clients/' + data._id);
                    }
                });
            });
        }

    });
});


// ===========================================================================================================================================
//  Show
//  Display the Full Details of a client
//============================================================================================================================================
router.get('/visits/:id', function (req, res) {
    Visit.findById(req.params.id).populate('client').exec(function (err, visit) {
        if (err) {
            console.log("ERROR! in Retrieving Data From The Database")
        } else {
            res.render('visit/show', {
                visit: visit
            });

        }



    });

});


// ===========================================================================================================================================
//  Edit
//  Show the Edit Form For The Client
//============================================================================================================================================
router.get('/visits/:id/edit', function (req, res) {
    Visit.findById(req.params.id).populate('client').exec(function (err, visit) {
        if (err) {
            console.log("ERROR! in Retrieving Data From The Database")
        } else {
            res.render('visit/edit', {
                visit: visit
            });

        }



    });

});


// ===========================================================================================================================================
//  Update
//  Update the Details of the Client
//============================================================================================================================================
router.put('/visits/:id', function (req, res) {
    //Method PUT
    var id = req.params.id;
    Visit.findByIdAndUpdate(id, req.body.visit, function (err, updatedVisit) {
        if (err) {
            console.log("ERROR! Updating the Record Please Try Again")
        } else {
            res.redirect('/visits/' + id);

        }

    });

});


// ===========================================================================================================================================
//  Destroy
//============================================================================================================================================
router.post('/visits/:id', function (req, res) {
    //Method DELETE
    res.send('Delete the ');
});





module.exports = router;