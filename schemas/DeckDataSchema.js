var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DeckDataSchema = new Schema( {
    mainboard : {}
} );

module.exports = DeckDataSchema;