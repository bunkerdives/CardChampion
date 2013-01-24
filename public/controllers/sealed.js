Sealed = {
    
    numRows : 1
    
    , numCols : 7
  
    , startSealed : function(set){
        
        Sealed.showSealedInterface();
        
        var packs = Sealed.createSealedPool();
        
        Sealed.addPacksToPool( packs );
        
    }

    , showSealedInterface : function(data){
        
 		// untoggle visibility of the lobby interface
      	$("#foyer").css( "display", "none" );
		  
		// toggle visibility of the draft interface
		$('#draft-builder').css( "display", "block" );
        
    }
    
    , createSealedPool : function() {
        
        var boosters = [];
        
        for( var i = 0; i < 6; ++i ){
            $.merge( boosters, Booster.newBooster('GTC') );
        }
        
        return boosters;
    }
    
    // add packs to pool, sorted by color, first column White, 2nd Blue, 3B, 4R, 5G 
    , addPacksToPool : function(packs) {
        
        packs = packs.sort( Sealed.sortPoolByColor );
        
        for( var i = 0; i < packs.length; ++i ){
            console.log( GTC.card_data[ packs[i] ].name );
        }
        
        var color = GTC.card_data[ packs[0] ].color;
        var col = 0;
        var row = 0;
        
        for( var i = 0; i < packs.length; ++i ){
            
            var id = packs[i];
            
            console.log( "addPacksToPool " + i + " " + id )
            
            if( color != GTC.card_data[ id ].color ){
                // add the next card to the next column
                console.log( "add the next card to the next column" )
                ++ col;
                row = 0;
            }
            else{
                if( row >= Sealed.numRows ){
                    console.log( "create a new row" )
                    Sealed.createNewPoolRow( row );
                    Sealed.numRows += 1;
                }
            }
            
            color = GTC.card_data[ id ].color;
            
            console.log("Adding " + id + " to card pool with row = " + row + ", col = " + col );
            Sealed.addCardToPool( id, row, col );
            row += 1;
            
        }
        
    }
    
    , addCardToPool : function( id, rowIdx, colIdx ) {
        
        var img = GTC.card_data[ id ].img;
        console.log("addCardToPool " + img + ", row = " + rowIdx + ", col = " + colIdx )
        console.log( "#card-pool-" + rowIdx + "-" + colIdx + "\n\n" )
        $("#card-pool-" + rowIdx + "-" + colIdx).css("background-image", 'url(' + img + ')' );
        
    }
    
    , createNewPoolRow : function( rowIdx ) {
        
        var row = $('<div>').attr("id", "card-pool-row-" + rowIdx);
        $("#card-pool-inner").append(row);
            
        for( var i = 0; i < 7; ++i ){
                
            var img = $("<div>");
            img.addClass( "card" ).addClass("stack");
            img.attr("id", "card-pool-" + rowIdx + "-" + i );
            $(row).append( img );
            
        }
        
    }
    
    , sortPoolByColor : function( a, b ) {
        
        var aCol = GTC.card_data[a].color;
        var bCol = GTC.card_data[b].color;
        
        switch( aCol ){
            case "W" :
                return -1;
            case "U" :
                if( bCol == "W"){
                    return 1;
                }
                else{
                    return -1;
                }
            case "B" :
                if( bCol == "W" || bCol == "U" ){
                    return 1;
                }
                else{
                    return -1;
                }
            case "R" :
                if( bCol == "W" || bCol == "U" || bCol == "B" ){
                    return 1;
                }
                else{
                    return -1;
                }
            case "G" :
                if( bCol == "W" || bCol == "U" || bCol == "B" || bCol == "R" ){
                    return 1;
                }
                else{
                    return -1;
                }
            case "M" :
                if( bCol == "W" || bCol == "U" || bCol == "B" || bCol == "R" || bCol == "G" ){
                    return 1;
                }
                else{
                    return -1;
                }
            case "A" :
                if( bCol == "W" || bCol == "U" || bCol == "B" || bCol == "R" || bCol == "G" || bCol == "M" ){
                    return 1;
                }
                else{
                    return -1;
                }
            default :
                return 1;
        }
        
    }
    
};