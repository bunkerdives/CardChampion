var mongoose = require('mongoose')
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;

Login = {
    
    connect : mongoose.connect('mongodb://localhost/CloudMagic')
    
    , User : new Schema( {
        email : String
        , thumb : String
        , joined : String
        , description : String
        , decks : []
        , id : ObjectId
    } )
    
    , login : function(req, res){

        var user = req.body.user;

        console.log("Login for user " + user)
        
        var UserModel = mongoose.model( 'User', Login.User, 'users' )
        
        if( ! Login.userExists( user, UserModel ) ) {
            Login.newUser( user, UserModel );
        }
        
        res.send( "OK" );

    }
    
    , newUser : function( user, UserModel ) {
        
        var userInstance = new UserModel( {
            email : user
            , thumb : ''
            , joined : '3/10/13'
            , description : 'Looooove magic!'
            , decks : []
        } );
        
        userInstance.save( function(err) {
            if(err) {
                console.log("Failed saving user.")
            } else {
                console.log("Saved user " + user + " successfully!");
            }
        } );
        
    }
    
    , userExists : function( user, UserModel ) {
        
        UserModel.find( { email : user }, function(err, data) {
            
            if( err ) {
                return false;
            } else {
                if( data == [] ) {
                    return false;
                } else {
                    return true;
                }
            }
            
        } );
        
    }

};

module.exports = Login;