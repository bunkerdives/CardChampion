var mongoose = require('mongoose');

var DeckContainerSchema = require('../schemas/DeckContainerSchema.js');


var DeckContainerModel = {
    
    init : function() {
        return mongoose.model( 'DeckContainer', DeckContainerSchema, 'DeckContainers' );
    }
    
}


module.exports = DeckContainerModel;