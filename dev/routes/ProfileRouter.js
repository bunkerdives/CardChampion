var Auth = require( '../controllers/Auth.js' );
var mongoose = require('mongoose');
var database = module.parent.exports.database;
var ProfileSchema = require('../schemas/ProfileSchema.js');
var DeckContainerSchema = require('../schemas/DeckContainerSchema.js');


var ProfileRouter = {
	
	init : function(app) {
		
		app.post( '/profileSettingData', function(req, res) {
    
		    // get the username
		    var user = req.user.username;
		    // TODO prevent guest
		    if( user == undefined /* || user == 'Guest' */ ) {
		        res.send( { status : "Error" } );
		        return;
		    }
    
		    // query the database for the user's profile object
		    mongoose.model( 'Profile', ProfileSchema, 'Profiles' );
		    database.model('Profile').findOne( { user : user }, function( err, profile ){
		        if( !err ) {
		            var profileSettings = {
		                fullName : profile.fullName
		                , location : profile.location
		                , description : profile.description
		                , thumb : profile.thumb
		                , thumbCardName : profile.thumbCardName
		            }
		            // respond to the client with the profile settings
		            res.send( { status : "Success", settings : JSON.stringify(profileSettings) } );
		        } else {
		            res.send( { status : "Error" } );
		        }
		    } );
    
		} );


		app.post( '/editprofile', function(req, res) {
    
		    // if client is a guest, return error //TODO make sure this or logic works
		    var username = req.user.username;
		    // TODO prevent guest
		    if( username == undefined /* || username == 'Guest' */ ) {
		        res.send( { status : "Error" } );
		        return;
		    }
    
		    // get the new profile settings from the post request
		    var body = req.body;
		    var thumb = body.thumb;
		    var thumbCardName = body.thumbCardName;
		    var fullName = body.fullName;
		    var description = body.description;
		    var location = body.location;
    
		    // TODO check the new settings for validity
		    // TODO check the new settings for security
    
		    // setup the update object, which will be passed to mongoose's update
		    var updateData = {};
		    if( thumb != undefined || thumb != '' ) {
		        updateData['thumb'] = thumb;
		    } if( thumbCardName != undefined || thumbCardName != '' ) {
		        updateData['thumbCardName'] = thumbCardName;
		    } if( fullName != undefined || fullName != '' ) {
		        updateData['fullName'] = fullName;
		    } if( description != undefined || description != '' ) {
		        updateData['description'] = description;
		    } if( location != undefined || location != '' ) {
		        updateData['location'] = location;
		    }
    	
		    // update the user's profile with the new settings
		    mongoose.model( 'Profile', ProfileSchema, 'Profiles' );
		    database.model('Profile').update(
		        //{ user : req.session.username } // TODO make sure this works!!
		        { user : username }
		        , updateData
		        , { multi : true }
		        , function( error ) {
		            // TODO add error message to the response
		            res.send( { status : 'Error' } );
		        }
		    )
    	
		    // return success status and username
		    res.send( { status : "Success", username : username } );
    
		} );
	
		app.get( '/:username', function( req, res ){
    
		    var username = req.params.username;
    
		    mongoose.model( 'Profile', ProfileSchema, 'Profiles' );
		    mongoose.model( 'DeckContainer', DeckContainerSchema, 'DeckContainers' );
    
		    var numDeckContainers = 0;
		    var numProcessedContainers = 0;
    
		    database.model('Profile').findOne( { user : username }, function(err, profile) {
        
		        if( profile != null ) {
            
		            numDeckContainers = profile.decks.length;
            
		            profile.decks.forEach( function( deckContainerId, index ) {
                
		                database.model('DeckContainer').findById( deckContainerId, function(err, deckContainer){
        
		                    if( !err ){
		                        profile.decks[ index ] = deckContainer;
		                        ++ numProcessedContainers;
		                    }
                    
		                    if( numProcessedContainers == numDeckContainers ) {
		                        // route the client to the profile page of the given user
		                        res.render( 'layout.jade', {
		                            templateName : JSON.stringify('Foyer')
		                            , options : JSON.stringify( {
		                                'subview' : 'ProfileDecks'
		                                , 'auth' : Auth.getAuthority( req )
		                                , 'user' : username
		                                , 'profile' : profile
		                            } )
		                        } );
		                    }
        
		                } );
            
		            } );
            
		        }
		        else {
		            res.render( 'layout.jade', {
		                templateName : JSON.stringify('Foyer')
		                , options : JSON.stringify( {
		                    'subview' : 'ProfileDecks'
		                    , 'auth' : Auth.getAuthority( req )
		                    , 'user' : username
		                    , 'profile' : {}
		                } )
		            } );
		        }
        
		    } );
    
		} );
		
	}
	
}

module.exports = ProfileRouter;