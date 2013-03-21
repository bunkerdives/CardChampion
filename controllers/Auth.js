var mongoose = require('mongoose')
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId
, Account = require('../models/Account.js')

Auth = {
    
    Profile : new Schema( {
        user : String
        , email : String
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
                Auth.newUser( req.body, ProfileModel );
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
    
    , newUser : function( data, ProfileModel ) {
        
        var user = data.username;
        var email = data.email;
        var thumb = '';
        var joined = new Date();
        var description = 'Magic fiend';
        /*
        var decks = [
            {
                'name' : 'Boros Aggro'
                , 'thumb' : ''
                , 'colors' : {
                    'white' : true
                    , 'blue' : false
                    , 'black' : false
                    , 'red' : true
                    , 'green' : false
                }
                , 'format' : 'GTC Sealed'
                , 'user' : username
                , 'uuid' : 'vladdy'
                , 'cards' : [
                    {
                        'name' : ''
                        , 'rarity' : ''
                        , 'type' : ''
                        , 'color' : ''
                        , 'cost' : ''
                        , 'cmc' : ''
                        , 'pt' : ''
                        , 'multiverse' : ''
                    }
                ]
            }
        ] */
        
        
        var userInstance = new ProfileModel( {
            user : user
            , email : email
            , thumb : thumb
            , joined : joined
            , description : description
            //, decks : decks
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