var mongoose = require('mongoose');

var DeckDataSchema = require('../schemas/DeckDataSchema.js');


var DeckDataModel = {
    
    init : function() {
        return mongoose.model( 'DeckData', DeckDataSchema, 'Decks' );
    }
    
}


module.exports = DeckDataModel;