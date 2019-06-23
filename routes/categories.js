var Category = require('../models/Category'),
    Region = require('../models/Region'),
    Client = require('../models/Client'),
    express = require('express');

var router = express.Router();

// ===========================================================================================================================================
//  Index
// To Display All the categories in the Database For A Given Region and Category
//============================================================================================================================================

router.get('/categories', function (req, res) {
    Category.find({}, function (err, categories) {
        if (err) {
            console.log("ERROR! in Retrieving Data From The Database")
        } else {
            res.render('category/index', {
                categories: categories
            });

        }
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