var mongoose = require('mongoose');


// ==========================================================================================================================================
// 1. Define The Schema For the Category Basically how the data is structured
// 2. Tie the schema to the Model (The database)
// 3.Export The Model Using Module Exports so it can be used in other files. (If export is not used the Model Cannot be used in other files)
//==========================================================================================================================================

var CategorySchema = new mongoose.Schema({
    name: String
});



module.exports = mongoose.model('Category', CategorySchema);