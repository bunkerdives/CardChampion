var SaveDeckController = {
    
    saveDeck : function() {
        
    }
    
    , saveDeckAs : function() {
        
        console.log("saveDeckAs")
        
        // TODO add logic to make sure all the fields are entered... if not, display error msg
        
        var deckData = SaveDeckController.formatDeckData();
        var deckContainer = SaveDeckController.formatDeckContainer( deckData );
        
        var requestData = {
            deckContainer : deckContainer
            , deckData : deckData
        };
        
        LoadingWheelController.start();
        
        var newDeckRequest = $.post(
            '/newDeckList'
            , requestData
            , function( data ) {
                // on success, display success briefly and hide the profile settings lightbox
                LoadingWheelController.stop();
                LightboxController.closeSaveLightbox();
                // TODO display error message in lightbox if there was a problem saving
                if( data == 'Success' ) {
                    console.log("Success saving new deck!")
                } else {
                    console.log("Failure saving new deck!")
                }
            }
        );
        
        newDeckRequest.error(
            function( jqxhr, status, error ) {
                // TODO process error from server for retrieving the profile settings
                console.log("Failure saving new deck!");
                LoadingWheelController.stop();
                LightboxController.closeSaveLightbox();
            }
        );
        
    }
    
    , formatDeckData : function() {
        
        var creatures = [];
        var lands = [];
        var artifacts = [];
        var instants = [];
        var sorceries = [];
        var enchantments = [];
        var planeswalkers = [];
        var sideboard = [];
        
        // loop through each card in the mainboard
        var mainboard = ViewModel.mainboard()[0];
        var numCols = mainboard.columns().length;
        
        for( var i = 0; i < numCols; ++i ) {
            
            var column = mainboard.columns()[i];
            var numCards = column.cards().length;
            
            for( var j = 0; j < numCards; ++j ) {
                
                var card = column.cards()[j];
                var cardData = {
                    'name' : card.name
                    , 'rarity' : card.rarity
                    , 'color' : card.color
                    , 'cost' : card.cost
                    , 'cmc' : card.cmc
                    , 'multiverse' : card.multiverse
                    , 'type' : card.type
                    , 'pt' : card.pt
                }
                
                var type = SaveDeckController.getCardType( card );
                
                switch( type ) {
                    case 'Creature':
                        SaveDeckController.updateTypeArrayWithCard( creatures, cardData );
                        break;
                    case 'Land':
                        SaveDeckController.updateTypeArrayWithCard( lands, cardData );
                        break;
                    case 'Instant':
                        SaveDeckController.updateTypeArrayWithCard( instants, cardData );
                        break;
                    case 'Sorcery':
                        SaveDeckController.updateTypeArrayWithCard( sorceries, cardData );
                        break;
                    case 'Artifact':
                        SaveDeckController.updateTypeArrayWithCard( artifacts, cardData );
                        break;
                    case 'Enchantment':
                        SaveDeckController.updateTypeArrayWithCard( enchantments, cardData );
                        break;
                    case 'Planeswalker':
                        SaveDeckController.updateTypeArrayWithCard( planeswalkers, cardData );
                }
                
            }
            
        }
        
        
        // loop through each card in the sideboard
        var _sideboard = ViewModel.sideboard()[0];
        numCols = _sideboard.columns().length;
        
        for( var i = 0; i < numCols; ++i ) {
            
            var column = _sideboard.columns()[i];
            var numCards = column.cards().length;
            
            for( var j = 0; j < numCards; ++j ) {
                
                var card = column.cards()[j];
                var cardData = {
                    'name' : card.name
                    , 'rarity' : card.rarity
                    , 'color' : card.color
                    , 'cost' : card.cost
                    , 'cmc' : card.cmc
                    , 'multiverse' : card.multiverse
                    , 'type' : card.type
                    , 'pt' : card.pt
                }
                
                var type = SaveDeckController.getCardType( card );
                
                SaveDeckController.updateTypeArrayWithCard( sideboard, cardData );
                
            }
            
        }
        
        // finally, construct the deck data object
        var deckDataObj = {
            creatures : creatures
            , lands : lands
            , instants : instants
            , sorceries : sorceries
            , enchantments : enchantments
            , artifacts : artifacts
            , planeswalkers : planeswalkers
            , sideboard : sideboard
        };
        
        console.log("Done formatting deck data!")
        
        return deckDataObj;
        
    }
    
    , formatDeckContainer : function( deckData ) {
        
        var deckTitle = $("#save-deck-title").val();
        var uTitle = deckTitle.split(' ').join('');
        
        var description = $("#save-deck-description").val();
        
        var publicDeck = true;
        
        if( $("#save-deck-public").attr('checked') == undefined ) {
            publicDeck = false;
        }
        
        var format = $('#save-deck-format-span').html();
        
        // TODO thumbnail image
        var thumb = "url(http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=366467&type=card)";
        
        // set the date of the deck creation
        var date = new Date();
        var curDate = ( date.getMonth() + 1 ) + "/" + date.getDate() + "/" + date.getFullYear();
        
        // get the colors of this deck
        var colors = SaveDeckController.getDeckColors( deckData );
        var white = colors.white;
        var blue = colors.blue;
        var black = colors.black;
        var red = colors.red;
        var green = colors.green;
        
        var deckContainer = {
            title : deckTitle
            , uTitle : uTitle
            , thumb : thumb
            , description : description
            , format : format
            , date : curDate
            , _public : publicDeck
            , white : white
            , blue : blue
            , black : black
            , red : red
            , green : green
        }
        
        console.log("Done formatting deck container!")
        
        return deckContainer;
        
    }
    
    , getCardType : function( card ) {
        
        if( ( /Creature/g ).test( card.type ) ) {
            return 'Creature';
        }
        
        if( ( /Land/g ).test( card.type ) ) {
            return 'Land';
        }
        
        if( ( /Instant/g ).test( card.type ) ) {
            return 'Instant';
        }
        
        if( ( /Sorcery/g ).test( card.type ) ) {
            return 'Sorcery';
        }
        
        if( ( /Artifact/g ).test( card.type ) ) {
            return 'Artifact';
        }
        
        if( ( /Enchantment/g ).test( card.type ) ) {
            return 'Enchantment';
        }
        
        if( ( /Planeswalker/g ).test( card.type ) ) {
            return 'Planeswalker';
        }
        
    }
    
    , updateTypeArrayWithCard : function( array, cardData ) {
        
        // loop through the card data container hashes in the type array
        for( var i = 0; i < array.length; ++i ) {
            
            var container = array[i];
            
            if( container.card.multiverse == cardData.multiverse ) {
                // update the total by one
                var total = container.total + 1;
                container.total = total;
                return;
            }
            
        }
        
        // if execution reaches this point, the card does not exist in the type array, so add it!
        array.push( {
            total : 1
            , card : cardData
        } );
        
    }
    
    , getDeckColors : function( deckData ) {
        
        var white = false;
        var blue = false;
        var black = false;
        var red = false;
        var green = false;
        
        // loop through each card in the deckData and check the colors
        
        for( var i = 0; i < deckData['creatures'].length; ++i ) {
            var container = deckData['creatures'][i];
            var colors = container.card.color;
            
            if( ( /W/g ).test( colors ) ) {
                white = true;
            }
            if( ( /U/g ).test( colors ) ) {
                blue = true;
            }
            if( ( /B/g ).test( colors ) ) {
                black = true;
            }
            if( ( /R/g ).test( colors ) ) {
                red = true;
            }
            if( ( /G/g ).test( colors ) ) {
                green = true;
            }
            
        }
        
        for( var i = 0; i < deckData['instants'].length; ++i ) {
            var container = deckData['instants'][i];
            var colors = container.card.color;
            
            if( ( /W/g ).test( colors ) ) {
                white = true;
            }
            if( ( /U/g ).test( colors ) ) {
                blue = true;
            }
            if( ( /B/g ).test( colors ) ) {
                black = true;
            }
            if( ( /R/g ).test( colors ) ) {
                red = true;
            }
            if( ( /G/g ).test( colors ) ) {
                green = true;
            }
            
        }
        
        for( var i = 0; i < deckData['sorceries'].length; ++i ) {
            var container = deckData['sorceries'][i];
            var colors = container.card.color;
            
            if( ( /W/g ).test( colors ) ) {
                white = true;
            }
            if( ( /U/g ).test( colors ) ) {
                blue = true;
            }
            if( ( /B/g ).test( colors ) ) {
                black = true;
            }
            if( ( /R/g ).test( colors ) ) {
                red = true;
            }
            if( ( /G/g ).test( colors ) ) {
                green = true;
            }
            
        }
        
        for( var i = 0; i < deckData['planeswalkers'].length; ++i ) {
            var container = deckData['planeswalkers'][i];
            var colors = container.card.color;
            
            if( ( /W/g ).test( colors ) ) {
                white = true;
            }
            if( ( /U/g ).test( colors ) ) {
                blue = true;
            }
            if( ( /B/g ).test( colors ) ) {
                black = true;
            }
            if( ( /R/g ).test( colors ) ) {
                red = true;
            }
            if( ( /G/g ).test( colors ) ) {
                green = true;
            }
            
        }
        
        for( var i = 0; i < deckData['enchantments'].length; ++i ) {
            var container = deckData['enchantments'][i];
            var colors = container.card.color;
            
            if( ( /W/g ).test( colors ) ) {
                white = true;
            }
            if( ( /U/g ).test( colors ) ) {
                blue = true;
            }
            if( ( /B/g ).test( colors ) ) {
                black = true;
            }
            if( ( /R/g ).test( colors ) ) {
                red = true;
            }
            if( ( /G/g ).test( colors ) ) {
                green = true;
            }
            
        }
        
        for( var i = 0; i < deckData['sideboard'].length; ++i ) {
            var container = deckData['sideboard'][i];
            var colors = container.card.color;
            
            if( ( /W/g ).test( colors ) ) {
                white = true;
            }
            if( ( /U/g ).test( colors ) ) {
                blue = true;
            }
            if( ( /B/g ).test( colors ) ) {
                black = true;
            }
            if( ( /R/g ).test( colors ) ) {
                red = true;
            }
            if( ( /G/g ).test( colors ) ) {
                green = true;
            }
            
        }
        
        return {
            white : white
            , blue : blue
            , black : black
            , red : red
            , green : green
        };
        
    }
    
};