var CardSort = {
    
	// alphabeticalSort() - sort two card view models alphabetically
    alphabeticalSort : function( a, b ) {
        return a.name.toUpperCase().localeCompare( b.name.toUpperCase() );
    }
    
	// costSort() - sort two card view models by their converted mana costs
    , costSort : function( a, b ) {
        return a.cmc - b.cmc;
    }
	
	// TODO sort two cards based on their type
    , typeSort : function( a, b ) {
        
    }
    
	// colorSort() - sort two card view models by color
    , colorSort : function( a, b ) {
        
        var aColor = a.color;
        var bColor = b.color;
        
		// the cards are 'equal' if they are of the same color
        if( aColor == bColor ){
            return 0;
        }
        
        switch( aColor ){
			// white
            case "W" :
                return -1;
			// blue
            case "U" :
                if( bColor == "W"){
                    return 1;
                } else{
                    return -1;
                }
			// black
            case "B" :
                if( bColor == "W" || bColor == "U" ){
                    return 1;
                } else{
                    return -1;
                }
			// red
            case "R" :
                if( bColor == "W" || bColor == "U" || bColor == "B" ){
                    return 1;
                } else{
                    return -1;
                }
			// green
            case "G" :
                if( bColor == "W" || bColor == "U" || bColor == "B" || bColor == "R" ){
                    return 1;
                } else{
                    return -1;
                }
			// multicolored
            case "M" :
                if( bColor == "W" || bColor == "U" || bColor == "B" || bColor == "R" || bColor == "G" ){
                    return 1;
                } else{
                    return -1;
                }
			// artifact/colorless (land falls under this category)
            case "A" :
                if( bColor == "W" || bColor == "U" || bColor == "B" || bColor == "R" || bColor == "G" || bColor == "M" ){
                    return 1;
                } else{
                    return -1;
                }
            default :
                return 1;
        }
        
    }
    
	// raritySort() - sort two card view models by rarity
    , raritySort : function( a, b ) {
        
        var aRarity = a.rarity;
        var bRarity = b.rarity;
        
		// the cards are 'equal' if they are of the same rarity
        if( aRarity == bRarity ) {
            return 0;
        }
        
        switch( aRarity ){
			// mythic rare
            case "M" :
                return -1;
			// rare
            case "R" :
                if( bRarity == "M"){
                    return 1;
                } else{
                    return -1;
                }
			// uncommon
            case "U" :
                if( bRarity == "M" || bRarity == "R" ){
                    return 1;
                } else{
                    return -1;
                }
			// common
            case "C" :
                if( bRarity == "M" || bRarity == "R" || bRarity == "U" ){
                    return 1;
                } else{
                    return -1;
                }
            default :
                return 1;
        }
    }
    
};