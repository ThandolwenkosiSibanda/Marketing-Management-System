var mongoose = require('mongoose');


// ==========================================================================================================================================
// 1. Define The Schema For the Visit Basically how the data is structured
// 2. Tie the schema to the Model (The database)
// 3.Export The Model Using Module Exports so it can be used in other files. (If export is not used the Model Cannot be used in other files)
//==========================================================================================================================================

var VisitSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client"
    },
    contactTitle: String,
    contactName: String,
    contactSurname: String,
    contactPhone: String,
    contactAltPhone: String,
    contactEmail: String,
    visitDate: String,
    keyInterests: String,
    samplesGiven: String,
    visitNotes: String,
    nextVisitDate: String,


});



module.exports = mongoose.model('Visit', VisitSchema);