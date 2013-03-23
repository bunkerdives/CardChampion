var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Account = require('../models/Account.js');
//var ProfileSchema = require('../schemas/ProfileSchema.js');
var ProfileModel = require('../models/ProfileModel.js');
var DeckContainerModel = require('../models/DeckContainerModel.js')

Auth = {
    
    guest : function( req, res ) {
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
            
            if( err ) {
                var data = {
                    success : false
                    , message : 'Error creating account!'
                }
                res.send("Error");
            }
            
            var profileModel = ProfileModel.newProfileModel();
            if( ! Auth.userExists( username, profileModel ) ) {
                Auth.newUser( req.body, profileModel );
            } else {
                res.render( 'layout.jade', {
                    templateName: JSON.stringify('Decks')
                    , options: JSON.stringify( {
                       'authOrGuest' : authOrGuest
                       , 'user' : 'null'
                    } )
                } );
            }

            req.session.authOrGuest = true;
            
            if( username == 'Guest' ){
                username = 'null';
            }
            
            res.send( username );
            
        } );
        
    }
    
    , newUser : function( data, profileModel ) {
        
        var user = data.username;
        var email = data.email;
        var thumb = 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=278058&type=card';
        var fullName = '';
        var location = 'Pittsburgh, PA';
        var joined = new Date();
        var description = 'Magic maniac!';
        
        var userInstance = new profileModel( {
            user : user
            , email : email
            , thumb : thumb
            , joined : joined
            , fullName : fullName
            , description : description
            , location : location
        } );
        
        // create a pretend deck
        var deckContainer = new DeckContainerModel( {
            title : 'Orzhov Removal'
            , thumb : 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=366452&type=card'
            , user : user
            , uuid : '1234567'
            , format : 'GTC Draft'
            , white : true
            , blue : false
            , black : true
            , red : false
            , green : false
        } );
        
        userInstance.decks[0] = deckContainer;
        
        userInstance.save( function(err) {
            if( err ) {
                console.log("Failed saving user.")
            } else {
                console.log("Saved user " + user + " successfully!");
            }
        } );
        
    }
    
    , userExists : function( user, profileModel ) {
        
        profileModel.find( { email : user }, function(err, data) {
            
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
    
    , authOrGuest : function( req ) {
        if( req.session.authOrGuest == undefined ) {
            return false;
        } else {
            return true;
        }
    }
    
    , getUsernameOrNull : function( req ) {
        if( req.user != undefined ) {
            return req.user.username;
        } else {
            return 'null';
        }
    }

};

module.exports = Auth;