var Region = require('../models/Region'),
    Category = require('../models/Category'),
    express = require('express');

var router = express.Router();

// ===========================================================================================================================================
//  Index
// To Display All the regions in the Database For A Given Region and Category
//============================================================================================================================================

router.get('/regions', function (req, res) {
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


// ===========================================================================================================================================
//  Create- New
// Show The Form For Creating A new Client
//============================================================================================================================================
router.get('/regions/new', function (req, res) {
    res.render('region/add');
});

// ===========================================================================================================================================
//  Store
//  Save the Details of a new client
//============================================================================================================================================
router.post('/regions/', function (req, res) {
    var region = req.body.region;

    Region.create(region, function (err, newRegion) {
        if (err) {
            return res.redirect('/regions/new');
        }
        res.redirect('/regions');
    });
});


// ===========================================================================================================================================
//  Show
//  Display the Full Details of a Region
//============================================================================================================================================
router.get('/regions/:id', function (req, res) {
    var id = req.params.id;

    Region.findById(id, function (err, foundRegion) {
        if (err) {
            return res.redirect('/regions');
        } else {
            Category.find({}, function (err, foundCategories) {
                res.render('region/show', {
                    region: foundRegion,
                    categories: foundCategories

                });

            });

        }

    });

});


// ===========================================================================================================================================
//  Edit
//  Show the Edit Form For The Client
//============================================================================================================================================
router.get('/regions/:id/edit', function (req, res) {
    res.send('Show The Form for edit');
});


// ===========================================================================================================================================
//  Update
//  Update the Details of the Client
//============================================================================================================================================
router.post('/regions/:id', function (req, res) {
    //Method PUT
    res.send('Show The Form for edit');
});


// ===========================================================================================================================================
//  Destroy
//============================================================================================================================================
router.post('/regions/:id', function (req, res) {
    //Method DELETE
    res.send('Delete the ');
});





module.exports = router;