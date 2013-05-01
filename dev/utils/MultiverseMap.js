var MultiverseMap = {
    
    multiverseToSetCard : {}
    
    , mapMultiverseToCardData : function( multiverse ) {
        
    }
    
    , createMap : function() {
        
        var map = {};
        var SetController = require('./SetController.js');
        
        // loop through each set
        for( var setAbbr in SetController.setList ) {
            
            // grab the set's card_data mapping
            var CardMap = SetController.setList[setAbbr].card_data;
            
            // loop through each card in this set
            for( var cardNum in CardMap ) {
                // map the multiverse to the brief card data
                var multiverse = cardHash[cardNum].multiverse;
                map[multiverse] = {
                    set : setAbbr
                    , num : cardNum
                };
            }
            
        }
        
        return map;
        
    }
    
}