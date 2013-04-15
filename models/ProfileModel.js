var mongoose = require('mongoose');

var ProfileSchema = require('../schemas/ProfileSchema.js');


var ProfileModel = {
    
    init : function() {
        return mongoose.model( 'Profile', ProfileSchema, 'Profiles' );
    }
    
}


module.exports = ProfileModel;