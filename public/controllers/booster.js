Booster = {
    
     newBooster : function( set ) {
    
        var booster = [];
        var i = 0;
        
        var card;
        for( ; i < 10; ++i ){
            while( card = Booster.randCommon( set ) ){
                if( $.inArray(card, booster) == -1 ){
                    booster[i] = card;
                    break;
                }
            }
        }
        for( ; i < 13; ++i ){
            while( card = Booster.randUncommon( set ) ){
                if( $.inArray(card, booster) == -1 ){
                    booster[i] = card;
                    break;
                }
            }   
        }
        for( ; i < 14; ++i ){
            while( card = Booster.randRare( set ) ){
                if( $.inArray(card, booster) == -1 ){
                    booster[i] = card;
                    break;
                }
            }   
            
        }
        
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
        
        /* pick a random index */
        var commons = set.commons;
        var idx = Math.floor( Math.random() * commons.length );
        
        /* return the random card's ID */
        return commons[ idx ];
        
    }
    
    , randUncommon : function( set ){
        
        /* pick a random index */
        var uncommons = set.uncommons;
        var idx = Math.floor( Math.random() * uncommons.length );
        
        /* return the random card's ID */
        return uncommons[ idx ];
        
    }
    
    , randRare : function( set ){
        
        if( Booster.chanceMythic() == false || set.mythics.length == 0 ){
            var rares = set.rares;
            var idx = Math.floor( Math.random() * rares.length );
            return rares[ idx ];
        }
        else{
            var mythics = set.mythics;
            var idx = Math.floor( Math.random() * mythics.length );
            return mythics[ idx ];
        }
        
    }

};