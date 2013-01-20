var GTC = require('../public/sets/gtc.js');

BoosterPack = {

    newBooster : function( set ) {
    
        var booster = [];
        var i = 0;
        
        if( set != 'GTC' ){
            return;
        }
        
        for( ; i < 10; ++i ){
            booster[i] = Booster.randCommon( set );
        }
        for( ; i < 13; ++i ){
            booster[i] = Booster.randUncommon( set );
        }
        for( ; i < 14; ++i ){
            booster[13] = Booster.randRare( set );
        }
        // TODO add random chance of foil card
        
        return booster;
    
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
    
    , randRare : function(){
        
        /* pick a random index */
        var num = GTC.rares.length;
        var idx = Math.floor( Math.random() * num );
        
        /* return the random card's ID */
        return GTC.rares[ idx ];
        
    }
    
    , randMythic : function(){
        
        /* pick a random index */
        var num = GTC.mythics.length;
        var idx = Math.floor( Math.random() * num );
        
        /* return the random card's ID */
        return GTC.mythics[ idx ];
        
    }

};

module.exports = BoosterPack;