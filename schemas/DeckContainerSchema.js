var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var DeckContainerSchema = new Schema( {
    
    'title' : String
    , 'uTitle' : String
    , 'thumb' : String
    , 'deckUrl' : String
    , 'user' : String
    , 'deckDataId' : ObjectId
    , 'description' : String
    , 'format' : String
    , 'date' : String
    , '_public' : Boolean
    , 'white' : Boolean
    , 'blue' : Boolean
    , 'black' : Boolean
    , 'red' : Boolean
    , 'green' : Boolean
    
} );

module.exports = DeckContainerSchema;