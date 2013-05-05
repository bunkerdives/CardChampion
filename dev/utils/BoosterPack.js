var SetController = require('./SetController.js');
var $ = require('jQuery');

var BoosterPack = {
    
    newBooster : function( setAbbr ) {
		
		console.log("NEW SERVER BOOSTER")
        
		// if the set passed is not valid, return null
		if( ! SetController.validSet( setAbbr ) ) {
			return null;
		}
		
        var booster = [];
        var set = SetController.getSet( setAbbr );
        var i = 0;
        
        var card;
        for( ; i < 10; ++i ){
            while( card = this.randCommon( set ) ) {
                if( $.inArray( card, booster ) == -1 ) {
                    booster[i] = card;
                    break;
                }
            }
        }
        for( ; i < 13; ++i ){
            while( card = this.randUncommon( set ) ) {
                if( $.inArray( card, booster ) == -1 ) {
                    booster[i] = card;
                    break;
                }
            }   
        }
        for( ; i < 14; ++i ){
            while( card = this.randRare( set ) ){
                if( $.inArray( card, booster ) == -1 ){
                    booster[i] = card;
                    break;
                }
            }   
            
        }
		
		console.log(booster)
        
        // TODO add random chance of foil card
		
        return booster;
        
    }
    
    , chanceMythic : function(){
        var chance = Math.floor( Math.random() * 1000 );
        if( chance <= 125 ){
            return true;
        }
        return false;
    }
    
    , randCommon : function( set ){
        // return a random card's data
        var commons = set.commons;
        var idx = Math.floor( Math.random() * commons.length );
        var id = commons[ idx ];
        var cardData = set.card_data[ id ];
        return cardData;
    }
    
    , randUncommon : function( set ){
        // return a random card's data
        var uncommons = set.uncommons;
        var idx = Math.floor( Math.random() * uncommons.length );
        var id = uncommons[ idx ];
        var cardData = set.card_data[ id ];
        return cardData;
    }
    
    , randRare : function( set ){
        
        if( this.chanceMythic() == false || set.mythics.length == 0 ) {
			// return a random card's data
            var rares = set.rares;
            var idx = Math.floor( Math.random() * rares.length );
			var id = rares[ idx ];
            var cardData = set.card_data[ id ];
            return cardData;
        }
        else{
			// return a random card's data
            var mythics = set.mythics;
            var idx = Math.floor( Math.random() * mythics.length );
			var id = mythics[ idx ];
            var cardData = set.card_data[ id ];
            return cardData ;
        }
        
    }
    
};

module.exports = BoosterPack;