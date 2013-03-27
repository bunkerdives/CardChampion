var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Account = require('../models/Account.js');
var ProfileModel = require('../models/ProfileModel.js');
var DeckContainerModel = require('../models/DeckContainerModel.js')
var DeckList = require('../models/DeckContainerModel.js')

Auth = {
    
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
            
            res.send( username );
            
        } );
        
    }
    
    , newUser : function( data, profileModel ) {
        
        var date = new Date();
        var curDate = ( date.getMonth() + 1 ) + "/" + date.getDate() + "/" + date.getFullYear();
        
        var user = data.username;
        var email = data.email;
        var thumb = 'url(http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=278058&type=card)';
        var fullName = 'Jace Beleren';
        var location = 'Pittsburgh, PA';
        var description = 'Magic maniac!';
        var joined = curDate;
        
        var userInstance = new profileModel( {
            user : user
            , email : email
            , thumb : thumb
            , joined : joined
            , fullName : fullName
            , description : description
            , location : location
            , decks : []
        } );
        
        // create a pretend deck
        var deckContainer = new DeckContainerModel( {
            title : 'Naya Aggro'
			, thumb : "url(http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=366467&type=card)"
            , deckUrl : '/decklists?user=' + user + '&deck=NayaAggro'
            , user : user
            , uuid : '12345678'
            , format : 'Standard'
            , date : curDate
            , white : true
            , blue : false
            , black : false
            , red : true
            , green : true
        } );
        
        var deckContainer1 = new DeckContainerModel( {
            title : 'Jund'
			, thumb : "url(http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=262847&type=card)"
            , deckUrl : '/decklists?user=' + user + '&deck=Jund'
            , user : user
            , uuid : '123456789'
            , format : 'Standard'
            , date : curDate
            , white : false
            , blue : false
            , black : true
            , red : true
            , green : true
        } );
        
        var deckContainer2 = new DeckContainerModel( {
            title : 'Wolf Run Bant'
			, thumb : "url(http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=233256&type=card)"
            , deckUrl : '/decklists?user=' + user + '&deck=WolfRunBant'
            , user : user
            , uuid : '123456789'
            , format : 'Standard'
            , date : curDate
            , white : true
            , blue : true
            , black : false
            , red : true
            , green : true
        } );
        
        var deckContainer3 = new DeckContainerModel( {
            title : 'Delver'
			, thumb : "url(http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=226749&type=card)"
            , deckUrl : '/decklists?user=' + user + '&deck=Delver'
            , user : user
            , uuid : '123456789'
            , format : 'Pauper'
            , date : curDate
            , white : false
            , blue : true
            , black : false
            , red : true
            , green : false
        } );
        
        userInstance.decks[0] = deckContainer;
        userInstance.decks[1] = deckContainer1;
        userInstance.decks[2] = deckContainer2;
        userInstance.decks[3] = deckContainer3;
        
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
    
    , newDeckList : function(deck) {
        
        switch( deck ) {
            case 'NayaAggro':
                return this.newNayaAggroDeck();
            case 'WolfRunBant':
                return this.newWolfRunBantDeck();
            case 'Delver':
                return this.newDelverDeck();
            default:
                return this.newNayaAggroDeck();
        }
        
    }
    
    , newJundDeck : function() {
        
        return {
            
            uuid : '12345678'
            , title : 'Jund Midrange'
            , author : 'Guest'
            , description : 'Standard Jund'
            , thumb : "url(http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=262847&type=card)"
            
            , white : false
            , blue : false
            , black : true
            , red : true
            , green : true
            
            , mainboard : {
                
                creatures : [
                
                ]
                
                , lands : [
                
                ]
                
                , instants : [
                
                ]
                
                , sorceries : [
                
                ]
                
                , enchantments : [
                
                ]
                
                , artifacts : [
                
                ]
                
                , planeswalkers : [
                
                ]
            }
            
        };
        
    }
    
    , newWolfRunBantDeck : function() {
        
        return {
            
            uuid : '12345678'
            , title : 'Wolf Run Bant'
            , author : 'Guest'
            , description : 'Standard Wolf Run Bant'
            , thumb : "url(http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=233256&type=card)"
            
            , white : true
            , blue : true
            , black : false
            , red : true
            , green : true
            
            , mainboard : {
                
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
                
                , enchantments : [
                
                ]
                
                , artifacts : [
                
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
            
        }
        
    }
    
    , newDelverDeck : function() {
        
        return {
            
            uuid : '12345678'
            , title : 'Delver'
            , author : 'Guest'
            , description : 'Pauper Delver'
            , thumb : "url(http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=226749&type=card)"
            
            , white : false
            , blue : true
            , black : false
            , red : true
            , green : false
            
            , mainboard : {
                
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
                
                , enchantments : [
                
                ]
                
                , artifacts : [
                
                ]
                
                , planeswalkers : [
                
                ]
            }
            
        }
        
    }
    
    , newNayaAggroDeck : function() {
            
        var deckList = {
        
            uuid : '12345678'
            , title : 'Naya Aggro'
            , author : 'Guest'
            , description : 'Standard Naya Aggro'
            , thumb : "url(http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=366467&type=card)"
            
            , white : true
            , blue : false
            , black : false
            , red : true
            , green : true
            
            , mainboard : {
                
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
                
                , sorceries : []
                
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
                
                , artifacts : []
                
                , planeswalkers : []
                
            }
        
        };
            
        return deckList;
        
    }

};

module.exports = Auth;