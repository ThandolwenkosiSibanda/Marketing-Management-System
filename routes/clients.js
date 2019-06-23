var Client = require('../models/Client'),
    Category = require('../models/Category'),
    Region = require('../models/Region'),
    express = require('express');

var router = express.Router();

// ===========================================================================================================================================
//  Index
// To Display All the Clients in the Database For A Given Region and Category
//============================================================================================================================================

router.get('/clients', function (req, res) {
    Client.find({}).populate('region').populate('category').exec(function (err, clients) {
        if (err) {
            console.log("ERROR! in Retrieving Data From The Database")
        } else {
            res.render('client/index', {
                clients: clients
            });

        }

    });

});


// ===========================================================================================================================================
//  Create- New
// Show The Form For Creating A new Client
//============================================================================================================================================
router.get('/clients/new', function (req, res) {
    Category.find({}, function (err, categories) {
        if (err) {
            console.log("Check That the system is on");
        } else {
            Region.find({}, function (err, regions) {
                res.render('client/add', {
                    categories: categories,
                    regions: regions,

                });
            });

        }
    });
});

// ===========================================================================================================================================
//  Store
//  Save the Details of a new client
//============================================================================================================================================
router.post('/clients/', function (req, res) {
    var client = req.body.client;
    Client.create(client, function (err, newCustomer) {
        if (err) {
            return res.redirect('/clients/new');
        } else {
            newCustomer.save(function (err, data) {
                if (err) {
                    console.log(err);
                    return res.redirect('/clients');
                } else {
                    res.redirect('/clients');
                }


            });


        }


    });
});


// ===========================================================================================================================================
//  Show
//  Display the Full Details of a client
//============================================================================================================================================
router.get('/clients/:id', function (req, res) {
    var id = req.params.id;

    Client.findById(id).populate('region').populate('category').populate('visits').exec(function (err, foundClient) {
        if (err) {
            console.log('error');
        } else {
            res.render('client/show', {
                client: foundClient
            });
        }
    });

});


// ===========================================================================================================================================
//  Edit
//  Show the Edit Form For The Client
//============================================================================================================================================
router.get('/clients/:id/edit', function (req, res) {
    res.send('Show The Form for edit');
});


// ===========================================================================================================================================
//  Update
//  Update the Details of the Client
//============================================================================================================================================
router.post('/clients/:id', function (req, res) {
    //Method PUT
    res.send('Show The Form for edit');
});


// ===========================================================================================================================================
//  Destroy
//============================================================================================================================================
router.post('/clients/:id', function (req, res) {
    //Method DELETE
    res.send('Delete the ');
});





module.exports = router;