var RtR = require('../public/sets/rtr.js');

BoosterPack = {

    newBooster : function( set ) {
    
        // the to be populated list of card IDs in the booster pack
        var cards = [];
        
        // use the appropriate set data structure
        var setData;
        switch( set ) {
            case "RtR":
                setData = RtR;
                break;
        }
        
        // get the list of cards for each rarity
        var common = RtR.common;
        var uncommon = RtR.uncommon;
        var rare = RtR.rare;
        var mythic = RtR.mythic
        
        // calculate the number of cards for each rarity
        var num_common = common.length;
        var num_uncommon = uncommon.length;
        var num_rare = rare.length;
        var num_mythic = mythic.length;
    
        // randomly select 10 commons
        var i, ran;
        for( i = 0; i < 10; ++i ) {
            ran = Math.floor( Math.random() * num_common );
            cards[i] = commons[ ran ];
        }
        
        // randomly select 3 uncommons
        for( ; i < 13; ++i ) {
            ran = Math.floor( Math.random() * num_uncommon );
            cards[i] = uncommons[ ran ];
        }
        
        // randomly select a rare ** TODO add random chance for mythic
        ran = Math.floor( Math.random() * num_rare );
        cards[13] = rares[ ran ];
        
        // randomly select a land ** TODO add random chance for foil c/u/r/m
        cards[14] = randomLand();
        
        return cards;
    
    },
    
    randomLand : function() {
        
        var ran = Math.floor( Math.random() * 5 );
        
        switch( ran ) {
            case 0:
                return 'plains';
            case 1:
                return 'island';
            case 2:
                return 'swamp';
            case 3:
                return 'mountain';
            case 4:
                return 'forest';
        }
        
    }

};

module.exports = BoosterPack;