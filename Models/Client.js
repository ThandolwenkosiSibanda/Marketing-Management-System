var mongoose = require('mongoose');


// ==========================================================================================================================================
// 1. Define The Schema For the Clients Basically how the data is structured
// 2. Tie the schema to the Model (The database)
// 3.Export The Model Using Module Exports so it can be used in other files. (If export is not used the Model Cannot be used in other files)
//==========================================================================================================================================

var ClientSchema = new mongoose.Schema({
    name: String,
    address: String,
    phone: String,
    altPhone: String,
    email: String,
    contactTitle: String,
    contactName: String,
    contactSurname: String,
    contactPhone: String,
    contactAltPhone: String,
    contactEmail: String,
    Category: String,
    region: String,
    specialNote: String,
    visits: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Visit"
    }],


});



module.exports = mongoose.model('Client', ClientSchema);