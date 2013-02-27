var CardSort = {
    
    alphabeticalSort : function( a, b ) {
        return a.name.toUpperCase().localeCompare( b.name.toUpperCase() );
    }
    
    , costSort : function( a, b ) {
        return a.cmc - b.cmc;
    }
    
    , colorSort : function( a, b ) {
        
        var aColor = a.color;
        var bColor = b.color;
        
        switch( aColor ){
            case "W" :
                return -1;
            case "U" :
                if( bColor == "W"){
                    return 1;
                } else{
                    return -1;
                }
            case "B" :
                if( bColor == "W" || bColor == "U" ){
                    return 1;
                } else{
                    return -1;
                }
            case "R" :
                if( bColor == "W" || bColor == "U" || bColor == "B" ){
                    return 1;
                } else{
                    return -1;
                }
            case "G" :
                if( bColor == "W" || bColor == "U" || bColor == "B" || bColor == "R" ){
                    return 1;
                } else{
                    return -1;
                }
            case "M" :
                if( bColor == "W" || bColor == "U" || bColor == "B" || bColor == "R" || bColor == "G" ){
                    return 1;
                } else{
                    return -1;
                }
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
    
    , raritySort : function( a, b ) {
        
        var aRarity = a.rarity;
        var bRarity = b.rarity;
        
        switch( aRarity ){
            case "M" :
                return -1;
            case "R" :
                if( bRarity == "M"){
                    return 1;
                } else{
                    return -1;
                }
            case "U" :
                if( bRarity == "M" || bRarity == "R" ){
                    return 1;
                } else{
                    return -1;
                }
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
    
    , typeSort : function( a, b ) {
        console.log( "sortCardsByType" );
    }
    
};