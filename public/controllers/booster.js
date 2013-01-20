Booster = {
    
    newBoosterPack : function(set){
        
        var booster = [];
        
        if( set != 'GTC' ){
            return;
        }
        
        for( var i = 0; i < 10; ++i ){
            booster[i] = Booster.randCommon();
        }
        
        booster[10] = Booster.randUncommon();
        booster[11] = Booster.randUncommon();
        booster[12] = Booster.randUncommon();
        
        booster[13] = Booster.randRare();
        
        return booster;
        
    }
    
    , randCommon : function(){
        
        var num = GTC.commons.length;
        
        /* pick a random index */
        var idx = Math.floor( Math.random() * num );
        
        /* return the random card's ID */
        return GTC.commons[ idx ];
        
    }
    
    , randUncommon : function(){
        
        var num = GTC.uncommons.length;
        
        /* pick a random index */
        var idx = Math.floor( Math.random() * num );
        
        /* return the random card's ID */
        return GTC.uncommons[ idx ];
        
    }
    
    , randRare : function(){
        
        var num = GTC.rares.length;
        
        /* pick a random index */
        var idx = Math.floor( Math.random() * num );
        
        /* return the random card's ID */
        return GTC.rares[ idx ];
        
    }
    
    , randMythic : function(){
        
        var num = GTC.mythics.length;
        
        /* pick a random index */
        var idx = Math.floor( Math.random() * num );
        
        /* return the random card's ID */
        return GTC.mythics[ idx ];
        
    }
    
};