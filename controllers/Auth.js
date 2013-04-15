var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Account = require('../models/Account.js');
var ProfileModel = require('../models/ProfileModel.js');
var DeckContainerModel = require('../models/DeckContainerModel.js');
var DeckDataModel = require('../models/DeckDataModel.js');


var nayaAggroDeck;
var wolfRunBantDeck;
var delverDeck;

var nayaAggroContainer;
var wolfRunContainer;
var delverContainer;

var finishedAsyncThreads = 0;



var updateFinishedThreadCount = function() {
    // update our count of completed async database operations out of the pool of available ones;
    // when the main thread finishes all, main db setup will be complete
    ++ finishedAsyncThreads;
}

var removeAccounts = function() {
    Account.remove( {}, function(err) {
    
        if( err ) {
            console.log("Error removing all users!");
        } else {
            console.log("Successfully removed all users!");
        }
        
        removeProfiles();
    
    } );
}


var removeProfiles = function() {
    ProfileModel.init().remove( {}, function(err) {
    
        if( err ) {
            console.log("Error removing all profiles!");
        } else {
            console.log("Successfully removed all profiles!");
        }
        
        removeDeckContainers();
    
    } );
}

var removeDeckContainers = function() {
    DeckContainerModel.init().remove( {}, function(err) {
    
        if( err ) {
            console.log("Error removing all deck containers!");
        } else {
            console.log("Successfully removed all deck containers!");
        }
        
        removeDecks();
    
    } );
}

var removeDecks = function() {
    DeckDataModel.init().remove( {}, function(err) {
    
        if( err ) {
            console.log("Error removing all decks!");
        } else {
            console.log("Successfully removed all decks!");
        }
    
    } );
    
    createSampleDeckData();
    
}


var getDate = function() {
    var date = new Date();
    var curDate = ( date.getMonth() + 1 ) + "/" + date.getDate() + "/" + date.getFullYear();
    return curDate;
};




var Auth = {
    
    login : function( req, res ) {
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
            
            var profileModel = ProfileModel.init();
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
            req.session.username = username;
            
            res.send( username );
            
        } );
        
    }
    
    , newUser : function( data, profileModel ) {
        
        var userInstance = new profileModel( {
            user : data.username
            , email : data.email
            , thumb : 'url(http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=278058&type=card)'
            , thumbCardName : 'Cavern of Souls'
            , joined : getDate()
            , fullName : 'Jace Beleren'
            , description : 'Magic maniac!'
            , location : 'Pittsburgh, PA'
            , decks : []
        } );
        
        // add the deck IDs to the user's decks array
        userInstance.decks[0] = nayaAggroContainer._id;
        userInstance.decks[1] = wolfRunContainer._id;
        userInstance.decks[2] = delverContainer._id;
        
        userInstance.save( function(err) {
            if( err ) {
                console.log("Failed saving user.")
            } else {
                console.log("Saved user " + data.username + " successfully!");
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



var NayaAggroContainer = function() {
    
    var deckContainerModel = DeckContainerModel.init();
    
    nayaAggroContainer = new deckContainerModel( {
        title : 'Naya Aggro'
        , uTitle : 'NayaAggro'
		, thumb : "url(http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=366467&type=card)"
        , deckUrl : '/decklists?user=Guest&deck=NayaAggro'
        , user : 'Guest'
        , deckDataId : nayaAggroDeck._id
        , description : 'Naya Aggro'
        , format : 'Standard'
        , date : getDate()
        , white : true
        , blue : false
        , black : false
        , red : true
        , green : true
    } );
    
    nayaAggroContainer.save( function(err) {
        if( err ) {
            console.log("Failed saving deck container.")
        } else {
            console.log("Saved deck container successfully!");
        }
    } );
    
    updateFinishedThreadCount();
    
};


var WolfRunBantContainer = function() {
    
    var deckContainerModel = DeckContainerModel.init();
    
    wolfRunContainer = new deckContainerModel( {
        title : 'Wolf Run Bant'
        , uTitle : 'WolfRunBant'
		, thumb : "url(http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=233256&type=card)"
        , deckUrl : '/decklists?user=Guest&deck=WolfRunBant'
        , user : 'Guest'
        , deckDataId : wolfRunBantDeck._id
        , description : 'Wolf Run Bant'
        , format : 'Standard'
        , date : getDate()
        , white : true
        , blue : true
        , black : false
        , red : true
        , green : true
    } );
    
    wolfRunContainer.save( function(err) {
        if( err ) {
            console.log("Failed saving deck container.")
        } else {
            console.log("Saved deck container successfully!");
        }
    } );
    
    updateFinishedThreadCount();
    
};


var DelverContainer = function() {
    
    var deckContainerModel = DeckContainerModel.init();
    
    delverContainer = new deckContainerModel( {
        title : 'Delver'
        , uTitle : 'Delver'
		, thumb : "url(http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=226749&type=card)"
        , deckUrl : '/decklists?user=Guest&deck=Delver'
        , user : 'Guest'
        , deckDataId : delverDeck._id
        , description : 'Delver'
        , format : 'Pauper'
        , date : getDate()
        , white : false
        , blue : true
        , black : false
        , red : true
        , green : false
    } );
    
    delverContainer.save( function(err) {
        if( err ) {
            console.log("Failed saving deck container.")
        } else {
            console.log("Saved deck container successfully!");
        }
    } );
    
    updateFinishedThreadCount();
    
};



var newWolfRunBantDeck = function() {
    
    var deckDataModel = DeckDataModel.init();
    
    wolfRunBantDeck = new deckDataModel( {
        
        mainboard : {
            
            creatures : [
                {
                    total : 3
                    , card : {
                        'name' : 'Augur of Bolas'
                        , 'rarity' : 'U'
                        , 'color' : 'U'
                        , 'cost' : '1U'
                        , 'cmc' : '2'
                        , 'multiverse' : '249676'
                        , 'type' : 'Creature  — Merfolk Wizard'
                        , 'pt' : '(1/3)'
                    }
                }
                , {
                    total : 3
                    , card : {
                        'name' : 'Restoration Angel'
                        , 'rarity' : 'R'
                        , 'color' : 'W'
                        , 'cost' : '3W'
                        , 'cmc' : '4'
                        , 'multiverse' : '240096'
                        , 'type' : 'Creature  — Angel'
                        , 'pt' : '(3/4)'
                    }
                }
                , {
                    total : 4
                        , card : {
                            'name' : 'Thragtusk'
                            , 'rarity' : 'R'
                            , 'color' : 'G'
                            , 'cost' : '4G'
                            , 'cmc' : '5'
                            , 'multiverse' : '249685'
                            , 'type' : 'Creature  — Beast'
                            , 'pt' : '(5/3)'
                        }
                }
            ]
            
            , lands : [
                {
                    total : 2
                    , card : {
                        'name' : 'Breeding Pool'
                        , 'rarity' : 'R'
                        , 'color' : 'A'
                        , 'cost' : ''
                        , 'cmc' : '0'
                        , 'multiverse' : '366291'
                        , 'type' : 'Land  ‚Äî Forest Island'
                        , 'pt' : ''
                    }
                }
                , {
                    total : 4
                    , card : {
                        'name' : 'Glacial Fortress'
                        , 'rarity' : 'R'
                        , 'color' : 'A'
                        , 'cost' : ''
                        , 'cmc' : '0'
                        , 'multiverse' : '249722'
                        , 'type' : 'Land'
                        , 'pt' : ''
                    }
                }
                , {
                    total : 4
                    , card : {
                        'name' : 'Hallowed Fountain'
                        , 'rarity' : 'R'
                        , 'color' : 'A'
                        , 'cost' : ''
                        , 'cmc' : '0'
                        , 'multiverse' : '253684'
                        , 'type' : 'Land  — Plains Island'
                        , 'pt' : ''
                    }
                }
                , {
                    total : 4
                    , card : {
                        'name' : 'Hinterland Harbor'
                        , 'rarity' : 'R'
                        , 'color' : 'A'
                        , 'cost' : ''
                        , 'cmc' : '0'
                        , 'multiverse' : '241988'
                        , 'type' : 'Land'
                        , 'pt' : ''
                    }
                }
                , {
                    total : 1
                    , card : {
                        'name' : 'Island'
                        , 'rarity' : 'L'
                        , 'color' : 'A'
                        , 'cost' : ''
                        , 'cmc' : '0'
                        , 'multiverse' : '201964'
                        , 'type' : 'Basic Land  ‚Äî Island'
                        , 'pt' : ''
                    }
                }
                , {
                    total : 2
                    , card : {
                        'name' : 'Kessig Wolf Run'
                        , 'rarity' : 'R'
                        , 'color' : 'A'
                        , 'cost' : ''
                        , 'cmc' : '0'
                        , 'multiverse' : '233256'
                        , 'type' : 'Land'
                        , 'pt' : ''
                    }
                }
                , {
                    total : 1
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
                    total : 1
                    , card : {
                        'name' : 'Steam Vents'
                        , 'rarity' : 'R'
                        , 'color' : 'A'
                        , 'cost' : ''
                        , 'cmc' : '0'
                        , 'multiverse' : '253682'
                        , 'type' : 'Land  — Island Mountain'
                        , 'pt' : ''
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
                    total : 3
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
            ]
            
            , instants : [
                {
                    total : 4
                    , card : {
                        'name' : 'Azorius Charm'
                        , 'rarity' : 'U'
                        , 'color' : 'M'
                        , 'cost' : 'WU'
                        , 'cmc' : '2'
                        , 'multiverse' : '270962'
                        , 'type' : 'Instant'
                        , 'pt' : ''
                    }
                }
                , {
                    total : 3
                    , card : {
                        'name' : 'Dissipate'
                        , 'rarity' : 'U'
                        , 'color' : 'U'
                        , 'cost' : '1UU'
                        , 'cmc' : '3'
                        , 'multiverse' : '241985'
                        , 'type' : 'Instant'
                        , 'pt' : ''
                    }
                }
                , {
                    total : 4
                    , card : {
                        'name' : 'Sphinx\'s Revelation'
                        , 'rarity' : 'M'
                        , 'color' : 'M'
                        , 'cost' : 'XWUU'
                        , 'cmc' : '3'
                        , 'multiverse' : '253534'
                        , 'type' : 'Instant'
                        , 'pt' : ''
                    }
                }
                , {
                    total : 1
                    , card : {
                        'name' : 'Syncopate'
                        , 'rarity' : 'U'
                        , 'color' : 'U'
                        , 'cost' : 'XU'
                        , 'cmc' : '1'
                        , 'multiverse' : '270369'
                        , 'type' : 'Instant'
                        , 'pt' : ''
                    }
                }
                , {
                    total : 2
                    , card : {
                        'name' : 'Think Twice'
                        , 'rarity' : 'C'
                        , 'color' : 'U'
                        , 'cost' : '1U'
                        , 'cmc' : '2'
                        , 'multiverse' : '230626'
                        , 'type' : 'Instant'
                        , 'pt' : ''
                    }
                }
            ]
            
            , sorceries : [
                {
                    total : 4
                    , card : {
                        'name' : 'Farseek'
                        , 'rarity' : 'C'
                        , 'color' : 'G'
                        , 'cost' : '1G'
                        , 'cmc' : '2'
                        , 'multiverse' : '277824'
                        , 'type' : 'Sorcery'
                        , 'pt' : ''
                    }
                }
                , {
                    total : 4
                    , card : {
                        'name' : 'Supreme Verdict'
                        , 'rarity' : 'R'
                        , 'color' : 'M'
                        , 'cost' : '1WWU'
                        , 'cmc' : '4'
                        , 'multiverse' : '253512'
                        , 'type' : 'Sorcery'
                        , 'pt' : ''
                    }
                }
            ]
            
            , planeswalkers : [
                {
                    total : 1
                    , card : {
                        'name' : "Jace, Memory Adept"
                        , 'rarity' : 'M'
                        , 'color' : 'U'
                        , 'cost' : '3UU'
                        , 'cmc' : '5'
                        , 'multiverse' : '254107'
                        , 'type' : 'Planeswalker  — Jace'
                        , 'pt' : ''
                    }
                }
                , {
                    total : 1
                    , card : {
                        'name' : 'Tamiyo, the Moon Sage'
                        , 'rarity' : 'M'
                        , 'color' : 'U'
                        , 'cost' : '3UU'
                        , 'cmc' : '5'
                        , 'multiverse' : '240070'
                        , 'type' : 'Planeswalker  — Tamiyo'
                        , 'pt' : ''
                    }
                }
            ]
            
        }
        
    } );

    wolfRunBantDeck.save( function(err) {
        if( err ) {
            console.log("Failed saving deck data.")
        } else {
            console.log("Saved deck data successfully!");
        }
    } );
    
    updateFinishedThreadCount();
    
};

var newDelverDeck = function() {
    
    var deckDataModel = DeckDataModel.init();
    
    delverDeck = new deckDataModel( {
        
        mainboard : {
            
            creatures : [
                {
                    total : 4
                    , card : {
                        'name' : 'Delver of Secrets'
                        , 'rarity' : 'C'
                        , 'color' : 'U'
                        , 'cost' : 'U'
                        , 'cmc' : '1'
                        , 'multiverse' : '226749'
                        , 'type' : 'Creature  — Human Wizard'
                        , 'pt' : '(1/1)'
                    }
                }
                ,{
                    total : 4
                    , card : {
                        'name' : 'Frostburn Weird'
                        , 'rarity' : 'C'
                        , 'color' : 'M'
                        , 'cost' : '(U/R)(U/R)'
                        , 'cmc' : '2'
                        , 'multiverse' : '289230'
                        , 'type' : 'Creature  — Weird'
                        , 'pt' : '(1/4)'
                    }
                }
                ,{
                    total : 4
                    , card : {
                        'name' : 'Goblin Electromancer'
                        , 'rarity' : 'C'
                        , 'color' : 'M'
                        , 'cost' : 'UR'
                        , 'cmc' : '2'
                        , 'multiverse' : '253548'
                        , 'type' : 'Creature  — Goblin Wizard'
                        , 'pt' : '(2/2)'
                    }
                }
                ,{
                    total : 4
                    , card : {
                        'name' : 'Stitched Drake'
                        , 'rarity' : 'C'
                        , 'color' : 'U'
                        , 'cost' : '1UU'
                        , 'cmc' : '3'
                        , 'multiverse' : '220652'
                        , 'type' : 'Creature  — Zombie Drake'
                        , 'pt' : '(3/4)'
                    }
                }
            ]
            
            , lands : [
                {
                    total : 4
                    , card : {
                        'name' : 'Evolving Wilds'
                        , 'rarity' : 'C'
                        , 'color' : 'A'
                        , 'cost' : ''
                        , 'cmc' : '0'
                        , 'multiverse' : '269666'
                        , 'type' : 'Land'
                        , 'pt' : ''
                    }
                }
                ,{
                    total : 4
                    , card : {
                        'name' : 'Izzet Guildgate'
                        , 'rarity' : 'C'
                        , 'color' : 'A'
                        , 'cost' : ''
                        , 'cmc' : '0'
                        , 'multiverse' : '270961'
                        , 'type' : 'Land  — Gate'
                        , 'pt' : ''
                    }
                }
                ,{
                    total : 8
                    , card : {
                        'name' : 'Island'
                        , 'rarity' : 'L'
                        , 'color' : 'A'
                        , 'cost' : ''
                        , 'cmc' : '0'
                        , 'multiverse' : '201964'
                        , 'type' : 'Basic Land  ‚Äî Island'
                        , 'pt' : ''
                    }
                }
                ,{
                    total : 4
                    , card : {
                        'name' : 'Mountain'
                        , 'rarity' : 'L'
                        , 'color' : 'A'
                        , 'cost' : ''
                        , 'cmc' : '0'
                        , 'multiverse' : '201967'
                        , 'type' : 'Basic Land  ‚Äî Mountain'
                        , 'pt' : ''
                    }
                }
            ]
            
            , instants : [
                {
                    total : 4
                    , card : {
                        'name' : 'Brimstone Volley'
                        , 'rarity' : 'C'
                        , 'color' : 'R'
                        , 'cost' : '2R'
                        , 'cmc' : '3'
                        , 'multiverse' : '233253'
                        , 'type' : 'Instant'
                        , 'pt' : ''
                    }
                }
                ,{
                    total : 2
                    , card : {
                        'name' : 'Essence Scatter'
                        , 'rarity' : 'C'
                        , 'color' : 'U'
                        , 'cost' : '1U'
                        , 'cmc' : '2'
                        , 'multiverse' : '276209'
                        , 'type' : 'Instant'
                        , 'pt' : ''
                    }
                }
                ,{
                    total : 2
                    , card : {
                        'name' : 'Negate'
                        , 'rarity' : 'C'
                        , 'color' : 'U'
                        , 'cost' : '1U'
                        , 'cmc' : '2'
                        , 'multiverse' : '254114'
                        , 'type' : 'Instant'
                        , 'pt' : ''
                    }
                }
                ,{
                    total : 4
                    , card : {
                        'name' : 'Searing Spear'
                        , 'rarity' : 'C'
                        , 'color' : 'R'
                        , 'cost' : '1R'
                        , 'cmc' : '2'
                        , 'multiverse' : '249684'
                        , 'type' : 'Instant'
                        , 'pt' : ''
                    }
                }
                ,{
                    total : 4
                    , card : {
                        'name' : 'Think Twice'
                        , 'rarity' : 'C'
                        , 'color' : 'U'
                        , 'cost' : '1U'
                        , 'cmc' : '2'
                        , 'multiverse' : '230626'
                        , 'type' : 'Instant'
                        , 'pt' : ''
                    }
                }
                ,{
                    total : 4
                    , card : {
                        'name' : 'Thought Scour'
                        , 'rarity' : 'C'
                        , 'color' : 'U'
                        , 'cost' : 'U'
                        , 'cmc' : '1'
                        , 'multiverse' : '262838'
                        , 'type' : 'Instant'
                        , 'pt' : ''
                    }
                }
            ]
            
            , sorceries : [
                {
                    total : 4
                    , card : {
                        'name' : 'Pillar of Flame'
                        , 'rarity' : 'C'
                        , 'color' : 'R'
                        , 'cost' : 'R'
                        , 'cmc' : '1'
                        , 'multiverse' : '240013'
                        , 'type' : 'Sorcery'
                        , 'pt' : ''
                    }
                }
            ]
            
        }
        
    } );

    delverDeck.save( function(err) {
        if( err ) {
            console.log("Failed saving deck data.")
        } else {
            console.log("Saved deck data successfully!");
        }
    } );

    updateFinishedThreadCount();
    
};

var newNayaAggroDeck = function() {
    
    var deckDataModel = DeckDataModel.init();
    nayaAggroDeck = new deckDataModel( {
        
        mainboard : {
            
            creatures : [
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
                    total : 4
                    , card : {
                        'name' : 'Flinthoof Boar'
                        , 'rarity' : 'U'
                        , 'color' : 'G'
                        , 'cost' : '1G'
                        , 'cmc' : '2'
                        , 'multiverse' : '249712'
                        , 'type' : 'Creature  — Boar'
                        , 'pt' : '(2/2)'
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
            ]
            
            , lands : [
                {
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
            ]
            
            , instants : [
                {
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
            ]
            
            , sorceries : [ ]
            
            , enchantments : [
                {
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
            ]
            
        }
        
    } );

    nayaAggroDeck.save( function(err) {
        if( err ) {
            console.log("Failed saving deck data.")
        } else {
            console.log("Saved deck data successfully!");
        }
    } );

    updateFinishedThreadCount();
    
};

var setupDB = function() {
    
    console.log("Setting up database");
    
    removeAccounts();
    
}

var createSampleDeckData = function() {
    
    console.log("Creating sample decks")
    
    // create and insert the sample decks for a guest account
    finishedAsyncThreads = 0;
    var numPendingAsyncThreads = 3;
    
    newNayaAggroDeck();
    newDelverDeck();
    newWolfRunBantDeck();
    
    while( finishedAsyncThreads < numPendingAsyncThreads ) {
        setTimeout( function(){;}, 100 );
    }
    
    console.log("Creating deck containers for sample decks")
    
    // create and insert the sample deck containers 
    finishedAsyncThreads = 0;
    var numPendingAsyncThreads = 3;
    
    NayaAggroContainer();
    WolfRunBantContainer();
    DelverContainer();
    
    while( finishedAsyncThreads < numPendingAsyncThreads ) {
        setTimeout( function(){;}, 100 );
    }
    
    // create the Guest PassportJS account
    var username = "Guest";
    var password = "Guest";
    Account.register( new Account({ username : username }), password, function(err, account) {
        if( !err ) {
            console.log("Success creating the Guest account!");
        } else {
            console.log("Failure creating the Guest account!");
        }
    } );
    
    // create the Guest profile account (which has references to the sample decks we just created)
    console.log("Creating the Guest profile!");
    Auth.newUser( {
        username : 'Guest'
        , email : 'guest@cardfiend.com'
    }, ProfileModel.init() );
    
    
}


setupDB();

