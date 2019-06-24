var Category = require('../models/Category'),
    Region = require('../models/Region'),
    Client = require('../models/Client'),
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
        var region = clients[0].region.name;
        var category = clients[0].category.name;

        clients.forEach(function (client) {


            if (client.region._id.equals(region_id) && client.category._id.equals(category_id)) {
                filteredClients.push(client);
            }

        });
        res.render('category/index', {
            clients: filteredClients,
            region: region,
            category: category
        });
    });




});


// ===========================================================================================================================================
//  Create- New
// Show The Form For Creating A new Client
//============================================================================================================================================
router.get('/categories/new', function (req, res) {
    res.render('category/add');
});

// ===========================================================================================================================================
//  Store
//  Save the Details of a new client
//============================================================================================================================================
router.post('/categories/', function (req, res) {
    var category = req.body.category;

    Category.create(category, function (err, newCategory) {
        if (err) {
            return res.redirect('/categories/new');
        }
        res.redirect('/categories');
    });
});


// ===========================================================================================================================================
//  Show
//  Display the Full Details of the region Category Client
//============================================================================================================================================
router.get('/categories/:id', function (req, res) {
    var id = req.params.id;

    Category.findById(id, function (err, foundCategory) {
        if (err) {
            console.log('error');
        }
        res.render('category/show', {
            category: foundCategory
        });

    });



});


// ===========================================================================================================================================
//  Edit
//  Show the Edit Form For The Client
//============================================================================================================================================
router.get('/categories/:id/edit', function (req, res) {
    res.send('Show The Form for edit');
});


// ===========================================================================================================================================
//  Update
//  Update the Details of the Client
//============================================================================================================================================
router.post('/categories/:id', function (req, res) {
    //Method PUT
    res.send('Show The Form for edit');
});


// ===========================================================================================================================================
//  Destroy
//============================================================================================================================================
router.post('/categories/:id', function (req, res) {
    //Method DELETE
    res.send('Delete the ');
});





module.exports = router;