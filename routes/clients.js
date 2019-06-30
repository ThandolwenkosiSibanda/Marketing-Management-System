var Client = require('../models/Client'),
    Category = require('../models/Category'),
    Region = require('../models/Region'),
    express = require('express');

var router = express.Router();

// ===========================================================================================================================================
//  Index
// To Display All the categories in the Database For A Given Region and Category
//============================================================================================================================================

router.get('/regions/:region_id/categories/:category_id', function (req, res) {
    var region_id = req.params.region_id;
    var category_id = req.params.category_id;

    Client.find({}).populate('region').populate('category').exec(function (err, clients) {
        var filteredClients = [];
        clients.forEach(function (client) {

            if ((client.region._id.equals(region_id)) && client.category._id.equals(category_id)) {
                filteredClients.push(client);
            }

        });

        res.render('category/index', {
            clients: filteredClients,
            region_id: region_id
        });
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
router.get('/regions/:region_id/categories/:category_id/clients/:id', function (req, res) {
    var id = req.params.id;
    var region_id = req.params.region_id;
    var category_id = req.params.category_id;

    Client.findById(id).populate('region').populate('category').populate('visits').exec(function (err, foundClient) {
        if (err) {
            console.log('error');
        } else {
            res.render('client/show', {
                client: foundClient,
                region_id: region_id,
                category_id: category_id

            });
        }
    });

});


// ===========================================================================================================================================
//  Edit
//  Show the Edit Form For The Client
//============================================================================================================================================
router.get('/clients/:id/edit', function (req, res) {
    var id = req.params.id;

    Client.findById(id).populate('region').populate('category').populate('visits').exec(function (err, foundClient) {

        Category.find({}, function (err, categories) {
            if (err) {
                console.log("error");
            } else {
                Region.find({}, function (err, regions) {
                    res.render('client/edit', {
                        categories: categories,
                        regions: regions,
                        client: foundClient

                    });
                });

            }
        });








    });
});


// ===========================================================================================================================================
//  Update
//  Update the Details of the Client
//============================================================================================================================================
router.put('/clients/:id', function (req, res) {

    var id = req.params.id;
    Client.findByIdAndUpdate(id, req.body.client, function (err, updatedClient) {
        if (err) {
            console.log("ERROR! Updating the Record Please Try Again")
        } else {
            res.redirect('/clients/' + id);

        }

    });

});


// ===========================================================================================================================================
//  Destroy
//============================================================================================================================================
router.post('/clients/:id', function (req, res) {
    //Method DELETE
    res.send('Delete the ');
});





module.exports = router;