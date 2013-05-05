var BoosterPack = {
    
    newBooster : function( setAbbr ) {
        
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
        
        // TODO add random chance of foil card
        
        return booster;
        
    }
    
    , chanceMythic : function() {
        
        var chance = Math.floor( Math.random() * 1000 );
        
        if( chance <= 125 ){
            return true;
        }
        return false;
        
    }
    
    , randCommon : function( set ) {
        
        // pick a random index
        var commons = set.commons;
        var idx = Math.floor( Math.random() * commons.length );
        
        // get the random card's ID
        var id = commons[ idx ];
        var cardData = set.card_data[ id ];
        
        // create a CardView object with the card's attributes
        return new CardViewModel( cardData );
        
    }
    
    , randUncommon : function( set ){
        
        // pick a random index
        var uncommons = set.uncommons;
        var idx = Math.floor( Math.random() * uncommons.length );
        
        // get the random card's ID
        var id = uncommons[ idx ];
        var cardData = set.card_data[ id ];
        
        // create a CardView object with the card's attributes
        return new CardViewModel( cardData );
        
    }
    
    , randRare : function( set ){
        
        if( this.chanceMythic() == false || set.mythics.length == 0 ){
            var rares = set.rares;
            var idx = Math.floor( Math.random() * rares.length );
            var id = rares[ idx ];
        
            // create a CardView object with the card's attributes
            var cardData = set.card_data[ id ];
            return new CardViewModel( cardData );
        }
        else{
            var mythics = set.mythics;
            var idx = Math.floor( Math.random() * mythics.length );
            var id = mythics[ idx ];
        
            // create a CardView object with the card's attributes
            var cardData = set.card_data[ id ];
            return new CardViewModel( cardData );
        }
        
    }
    
};