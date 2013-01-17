Booster = {
    
    newBoosterPack : function(set){
        
        console.log( GTC.card_data )
        console.log( "\n\n\n\n\n\n" )
        
        console.log( "newBooster" );
        
        var booster = [];
        
        if( set != 'GTC' ){
            return;
        }
        
        console.log("random common:")
        for( var i = 0; i < 10; ++i ){
        booster[i] = Booster.randCommon();
        }
        
        console.log("random uncommon:")
        booster[10] = Booster.randUncommon();
        booster[11] = Booster.randUncommon();
        booster[12] = Booster.randUncommon();
        
        console.log("random rare:")
        booster[13] = Booster.randRare();
        
        return booster;
    }
    
    , randCommon : function(){
        
        var num = GTC.commons.length;
        
        /* pick a random index */
        var idx = Math.floor( Math.random() * num );
        
        console.log( "random index: " + idx );
        console.log( "random ID: " + GTC.commons[ idx ] );
        
        /* return the random card's ID */
        return GTC.commons[ idx ];
        
    }
    
    , randUncommon : function(){
        
        var num = GTC.uncommons.length;
        
        /* pick a random index */
        var idx = Math.floor( Math.random() * num );
        
        console.log( GTC.uncommons[ idx ] )
        
        /* return the random card's ID */
        return GTC.uncommons[ idx ];
        
    }
    
    , randRare : function(){
        
        var num = GTC.rares.length;
        
        /* pick a random index */
        var idx = Math.floor( Math.random() * num );
        
        console.log( GTC.rares[ idx ] )
        
        /* return the random card's ID */
        return GTC.rares[ idx ];
        
    }
    
    , randMythic : function(){
        
        var num = GTC.mythics.length;
        
        /* pick a random index */
        var idx = Math.floor( Math.random() * num );
        
        console.log( GTC.mythics[ idx ] )
        
        /* return the random card's ID */
        return GTC.mythics[ idx ];
        
    }
};