var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DeckDataSchema = new Schema( {
    creatures : []
    , lands : []
    , sorceries : []
    , instants : []
    , planeswalkers : []
    , enchantments : []
    , artifacts : []
    , sideboard : []
} );

module.exports = DeckDataSchema;