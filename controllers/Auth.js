var mongoose = require('mongoose')
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId
, Account = require('../models/Account.js')

Auth = {
    
    Profile : new Schema( {
        email : String
        , thumb : String
        , joined : String
        , description : String
        , decks : []
        , id : ObjectId
    } )
    
    , guest : function( req, res ) {
        req.session.authOrGuest = true;
        res.send('null');
    }
    
    , login : function( req, res ) {
        req.session.authOrGuest = true;
        res.send( req.user.username );
    }
    
    , register : function( req, res ) {
            
        var username = req.body.username;
        var password = req.body.password;
        
        Account.register( new Account({ username : username }), password, function(err, account) {
            
            if (err) {
                res.send("Error");
            }
            
            var ProfileModel = mongoose.model( 'Profile', Auth.Profile, 'Profiles' )
            if( ! Auth.userExists( username, ProfileModel ) ) {
                Auth.newUser( username, ProfileModel );
            }

            req.session.authOrGuest = true;

            if( username == 'Guest' ){
                username = 'null';
            }
            res.send( username );
            
        } );
        
    }
    
    , newUser : function( user, ProfileModel ) {
        
        var userInstance = new ProfileModel( {
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
    
    , userExists : function( user, ProfileModel ) {
        
        ProfileModel.find( { email : user }, function(err, data) {
            
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

module.exports = Auth;