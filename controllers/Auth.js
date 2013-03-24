var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Account = require('../models/Account.js');
//var ProfileSchema = require('../schemas/ProfileSchema.js');
var ProfileModel = require('../models/ProfileModel.js');
var DeckContainerModel = require('../models/DeckContainerModel.js')
var DeckList = require('../models/DeckContainerModel.js')

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
            title : 'Naya Aggro'
            , thumb : 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=366467&type=card'
            , user : user
            , uuid : '12345678'
            , format : 'GTC Draft'
            , date : new Date()
            , white : true
            , blue : false
            , black : false
            , red : true
            , green : true
        } );
        
        //var deckList = this.newDeckList();
        
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
    
    , newDeckList : function() {
            
        var deckList = new DeckList( {
        
            uuid : '12345678'
            , cards : [
                {
                    total : 4
                    , card : {
                        'name' : 'Boros Elite'
                        , 'rarity' : 'U'
                        , 'color' : 'W'
                        , 'cost' : 'W'
                        , 'cmc' : '1'
                        , 'multiverse' : '366369'
                        , 'type' : 'Creature  ‚Äî Human Soldier'
                        , 'pt' : '(1/1)'
                    }
                }
                , {
                    total : 4
                    , card : {
                        'name' : 'Burning-Tree Emissary'
                        , 'rarity' : 'U'
                        , 'color' : 'M'
                        , 'cost' : '(R/G)(R/G)'
                        , 'cmc' : '2'
                        , 'multiverse' : '366467'
                        , 'type' : 'Creature  ‚Äî Human Shaman'
                        , 'pt' : '(2/2)'
                    }
                }
                , {
                    total : 4
                    , card : {
                        'name' : 'Experiment One'
                        , 'rarity' : 'U'
                        , 'color' : 'G'
                        , 'cost' : 'G'
                        , 'cmc' : '1'
                        , 'multiverse' : '366441'
                        , 'type' : 'Creature  ‚Äî Human Ooze'
                        , 'pt' : '(1/1)'
                    }
                }
                , {
                    total : 3
                    , card : {
                        'name' : 'Frontline Medic'
                        , 'rarity' : 'R'
                        , 'color' : 'W'
                        , 'cost' : '2W'
                        , 'cmc' : '3'
                        , 'multiverse' : '366460'
                        , 'type' : 'Creature  ‚Äî Human Cleric'
                        , 'pt' : '(3/3)'
                    }
                }
                , {
                    total : 4
                    , card : {
                        'name' : 'Sacred Foundry'
                        , 'rarity' : 'R'
                        , 'color' : 'A'
                        , 'cost' : ''
                        , 'cmc' : '0'
                        , 'multiverse' : '366439'
                        , 'type' : 'Land  ‚Äî Mountain Plains'
                        , 'pt' : ''
                    }
                }
                , {
                    total : 4
                    , card : {
                        'name' : 'Stomping Ground'
                        , 'rarity' : 'R'
                        , 'color' : 'A'
                        , 'cost' : ''
                        , 'cmc' : '0'
                        , 'multiverse' : '366232'
                        , 'type' : 'Land  ‚Äî Mountain Forest'
                        , 'pt' : ''
                    }
                }
                , {
                    total : 4
                    , card : {
                        'name' : 'Temple Garden'
                        , 'rarity' : 'R'
                        , 'color' : 'A'
                        , 'cost' : ''
                        , 'cmc' : '0'
                        , 'multiverse' : '253681'
                        , 'type' : 'Land  — Forest Plains'
                        , 'pt' : ''
                    }
                }
                , {
                    total : 4
                    , card : {
                        'name' : 'Giant Growth'
                        , 'rarity' : 'C'
                        , 'color' : 'G'
                        , 'cost' : 'G'
                        , 'cmc' : '1'
                        , 'multiverse' : '289213'
                        , 'type' : 'Instant'
                        , 'pt' : ''
                    }
                }
                , {
                    total : 4
                    , card : {
                        'name' : 'Champion of the Parish'
                        , 'rarity' : 'R'
                        , 'color' : 'W'
                        , 'cost' : 'W'
                        , 'cmc' : '1'
                        , 'multiverse' : '262861'
                        , 'type' : 'Creature  — Human Soldier'
                        , 'pt' : '(1/1)'
                    }
                }
                , {
                    total : 4
                    , card : {
                        'name' : 'Mayor of Avabruck'
                        , 'rarity' : 'R'
                        , 'color' : 'G'
                        , 'cost' : '1G'
                        , 'cmc' : '2'
                        , 'multiverse' : '222189'
                        , 'type' : 'Creature  — Human Advisor Werewolf'
                        , 'pt' : '(1/1)'
                    }
                }
                , {
                    total : 4
                    , card : {
                        'name' : 'Sunpetal Grove'
                        , 'rarity' : 'R'
                        , 'color' : 'A'
                        , 'cost' : ''
                        , 'cmc' : '0'
                        , 'multiverse' : '249736'
                        , 'type' : 'Land'
                        , 'pt' : ''
                    }
                }
                , {
                    total : 1
                    , card : {
                        'name' : 'Rootbound Crag'
                        , 'rarity' : 'R'
                        , 'color' : 'A'
                        , 'cost' : ''
                        , 'cmc' : '0'
                        , 'multiverse' : '249735'
                        , 'type' : 'Land'
                        , 'pt' : ''
                    }
                }
                , {
                    total : 4
                    , card : {
                        'name' : 'Rancor'
                        , 'rarity' : 'U'
                        , 'color' : 'G'
                        , 'cost' : 'G'
                        , 'cmc' : '1'
                        , 'multiverse' : '253686'
                        , 'type' : 'Enchantment  — Aura'
                        , 'pt' : ''
                    }
                }
                , {
                    total : 4
                    , card : {
                        'name' : 'Lightning Mauler'
                        , 'rarity' : 'U'
                        , 'color' : 'R'
                        , 'cost' : '1R'
                        , 'cmc' : '2'
                        , 'multiverse' : '271119'
                        , 'type' : 'Creature  — Human Berserker'
                        , 'pt' : '(2/1)'
                    }
                }
                , {
                    total : 4
                    , card : {
                        'name' : 'Cavern of Souls'
                        , 'rarity' : 'R'
                        , 'color' : 'A'
                        , 'cost' : ''
                        , 'cmc' : '0'
                        , 'multiverse' : '278058'
                        , 'type' : 'Land'
                        , 'pt' : ''
                    }
                }
            ]
        
        } );
            
        return deckList;
        
    }

};

module.exports = Auth;