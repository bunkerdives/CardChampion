Booster = {
    
     newBooster : function( set ) {
    
        var booster = [];
        var i = 0;
        
        if( set != 'GTC' ){
            return;
        }
        
        // TODO add dynamic support for other card sets
        
        console.log( "Creating a booster pack for the set " + GTC.set )
        
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
        var num = GTC.commons.length;
        var idx = Math.floor( Math.random() * num );
        
        /* return the random card's ID */
        return GTC.commons[ idx ];
        
    }
    
    , randUncommon : function(){
        
        /* pick a random index */
        var num = GTC.uncommons.length;
        var idx = Math.floor( Math.random() * num );
        
        /* return the random card's ID */
        return GTC.uncommons[ idx ];
        
    }
    
    , randRare : function( ){
        
        if( Booster.chanceMythic() == false ){
            var num = GTC.rares.length;
            var idx = Math.floor( Math.random() * num );
            return GTC.rares[ idx ];
        }
        else{
            var num = GTC.mythics.length;
            var idx = Math.floor( Math.random() * num );
            return GTC.mythics[ idx ];
        }
        
    }

};