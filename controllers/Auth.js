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
    
    , login : function(req, res) {
        
        console.log("Auth.login " + req.user.username );
        
        res.send( 'OK' );

    }
    
    , register : function(req, res) {
        
        console.log("register " + req.body.username + " " + req.body.password );
            
        var username = req.body.username;
        var password = req.body.password;
        
        Account.register( new Account({ username : username }), password, function(err, account) {
            
            if (err) {
                return res.render( 'layout.jade', {
                    templateName: JSON.stringify('Splash')
                    , options: JSON.stringify('')
                } );
            }
            
            var ProfileModel = mongoose.model( 'Profile', Auth.Profile, 'Profiles' )
            if( ! Auth.userExists( username, ProfileModel ) ) {
                res.send( 'User already exists!' );
                Auth.newUser( username, ProfileModel );
            }

            res.send( 'OK' );
            
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