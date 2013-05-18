var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ProfileSchema = new Schema( {
    user : String
    , email : String
    , thumb : String
    , thumbCardName : String
    , fullName : String
    , joined : String
    , location : String
    , description : String
    , decks : Array
} );

module.exports = ProfileSchema;