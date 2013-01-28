Sealed = {
    
    numRows : 1
    
    , numCols : 7
    
    , numMainRows : 1
    
    , numMainUsedRows : 0
    
    , pool : []
    
    , deck : []
    
    , numLandsInDeck : 0
    
    , numCreaturesInDeck : 0
    
    , numCardsInDeck : 0
    
    , colSizePool : [
        0
        , 0
        , 0
        , 0
        , 0
        , 0
        , 0
    ]
    
    , colSize : [
        0
        , 0
        , 0
        , 0
        , 0
        , 0
        , 0
    ]
  
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
        
        var color = GTC.card_data[ packs[0] ].color;
        var col = 0;
        var row = 0;
        
        for( var i = 0; i < packs.length; ++i ){
            
            var id = packs[i];
            
            if( color != GTC.card_data[ id ].color ){
                // add the next card to the next column
                ++ col;
                row = 0;
            }
            else{
                if( row >= Sealed.numRows ){
                    Sealed.createNewPoolRow( row );
                    Sealed.numRows += 1;
                }
            }
            
            color = GTC.card_data[ id ].color;
            
            Sealed.addCardToPool( id, row, col );
            row += 1;
            
        }
        
    }
    
    , addCardToPool : function( id, row, col ) {
        
        var img = GTC.card_data[ id ].img;
        $( "#card-pool-" + row + "-" + col).css("background-image", 'url(' + img + ')' );
        $( "#card-pool-" + row + "-" + col).css("z-index", row);
        $( "#card-pool-" + row + "-" + col ).on( 'mouseover', { 'id' : id }, Sealed.cardZoom );
        $( "#card-pool-" + row + "-" + col ).dblclick( { 'id' : id, 'row' : row, 'col' : col }, Sealed.addCardToMain );
        $( "#card-pool-" + row + "-" + col ).attr( "data-card-id", id );
        resizeScreen();
        
        Sealed.colSizePool[ col ] += 1;
        
    }
    
    , addCardToPoolCallback : function( event ) {
        
        var id = event.data.id;
        var row = event.data.row;
        var col = event.data.col;
        
        // remove the card from the mainboard UI
        /*
        var elemID = "#deck-area-" + row + "-" + col;
        $(elemID).css("background-image", "none");
        $(elemID).css("z-index", "-1");
        $(elemID).off( 'click' );
        $(elemID).off( 'dblclick' );
        $(elemID).off( 'mouseover' );
        */
        
        // shift the remaining cards in the mainboard column up
        var colSize = Sealed.colSize[ col ];
        for( var i = row; i < colSize - 1; ++i ){
            // the id of the card we are replacing
            elemID =  "#deck-area-" + i + "-" + col;
            
            // the id of the card we are copying
            nextID = "#deck-area-" + (i+1) + "-" + col;
            
            // get the copied card's ID and img
            cId = $(nextID).attr("data-card-id");
            cImg = GTC.card_data[ cId ].img;
            
            $(elemID).css("background-image", 'url(' + cImg + ')' );
            $(elemID).css("z-index", i);
            $(elemID).off( 'dblclick' );
            $(elemID).off( 'mouseover' );
            $(elemID).on( 'mouseover', { 'id' : cId }, Sealed.cardZoom );
            $(elemID).dblclick( { 'id' : cId, 'row' : i, 'col' : col }, Sealed.addCardToPoolCallback );
            $(elemID).attr( "data-card-id", cId );
        }
        
        // hide the last card in the column
        elemID = "#deck-area-" + (colSize - 1) + "-" + col;
        $(elemID).attr( "data-card-id", "" );
        $(elemID).css("background-image", "none");
        $(elemID).css("z-index", "-1");
        $(elemID).off( 'click' );
        $(elemID).off( 'dblclick' );
        $(elemID).off( 'mouseover' );
        
        Sealed.colSize[ col ] -= 1;
        
        // get the color of the card
        var colIdx = GTC.card_data[id].color;
        switch(colIdx){
            case "W":
                colIdx = 0;
                break;
            case "U":
                colIdx = 1;
                break;
            case "B":
                colIdx = 2;
                break;
            case "R":
                colIdx = 3;
                break;
            case "G":
                colIdx = 4;
                break;
            case "M":
                colIdx = 5;
                break;
            case "A":
                colIdx = 6;
                break;
        }
        
        // get the row index based on the number of cards occupying that mana cost column
        var rowIdx = Sealed.colSizePool[ colIdx ];
        Sealed.colSizePool[ colIdx ] += 1;
        
        // add the card to the pool
        var img = GTC.card_data[ id ].img;
        $( "#card-pool-" + rowIdx + "-" + colIdx).css("background-image", 'url(' + img + ')' );
        $( "#card-pool-" + rowIdx + "-" + colIdx).css("z-index", rowIdx );
        $( "#card-pool-" + rowIdx + "-" + colIdx ).on( 'mouseover', { 'id' : id, 'row' : rowIdx, 'col' : colIdx }, Sealed.cardZoom );
        $( "#card-pool-" + rowIdx + "-" + colIdx ).dblclick( { 'id' : id, 'row' : rowIdx, 'col' : colIdx }, Sealed.addCardToMain );
        $( "#card-pool-" + rowIdx + "-" + colIdx ).attr( "data-card-id", id );
        
        // adjust the total, creature, and land counters
        Sealed.numCardsInDeck --;
        $( "#mainboard-total" ).html( (Sealed.numCardsInDeck) + "/40" );
        if( GTC.card_data[id].type == "Creature" || GTC.card_data[id].type == "Artifact Creature" ){
            Sealed.numCreaturesInDeck --;
            $("#mainboard-creatures").html( "Creatures: " + (Sealed.numCreaturesInDeck) );
        }
        else if( GTC.card_data[id].type == "Land" ){
            Sealed.numLandsInDeck --;
            $("#mainboard-lands").html( "Lands: " + (Sealed.numLandsInDeck) );
        }
        
    }
    
    , addCardToMain : function( event ) {
        
        var id = event.data.id;
        var row = event.data.row;
        var col = event.data.col;
        
        //console.log("Adding card " + id + " to row " + row + ", col " + col )
        
        // remove the card from the pool UI
        /*
        var elemID = "#card-pool-" + row + "-" + col;
        $(elemID).css("background-image", "none");
        $(elemID).css("z-index", "-1");
        $(elemID).off( 'click' );
        $(elemID).off( 'dblclick' );
        $(elemID).off( 'mouseover' );
        */
        
        // shift the remaining cards in the pool column up
        var colSize = Sealed.colSizePool[ col ];
        for( var i = row; i < colSize - 1; ++i ){
            // the id of the card we are replacing
            elemID =  "#card-pool-" + i + "-" + col;
            
            // the id of the card we are copying
            nextID = "#card-pool-" + (i+1) + "-" + col;
            
            // get the copied card's ID and img
            cId = $(nextID).attr("data-card-id");
            cImg = GTC.card_data[ cId ].img;
            
            $(elemID).css("background-image", 'url(' + cImg + ')' );
            $(elemID).css("z-index", i);
            $(elemID).off( 'dblclick' );
            $(elemID).off( 'mouseover' );
            $(elemID).on( 'mouseover', { 'id' : cId }, Sealed.cardZoom );
            $(elemID).dblclick( { 'id' : cId, 'row' : i, 'col' : col }, Sealed.addCardToMain );
            $(elemID).attr( "data-card-id", cId );
        }
        // hide the last card in the column
        elemID = "#card-pool-" + (colSize - 1) + "-" + col;
        $(elemID).attr( "data-card-id", "" );
        $(elemID).css("background-image", "none");
        $(elemID).css("z-index", "-1");
        $(elemID).off( 'dblclick' );
        $(elemID).off( 'mouseover' );
        
        Sealed.colSizePool[ col ] -= 1;
        
        // if a new mainboard row is needed, create it
        if( Sealed.numMainUsedRows == Sealed.numMainRows ){
            Sealed.createNewMainRow( Sealed.numMainRows );
            Sealed.numMainUsedRows += 1;
            Sealed.numMainRows += 1;
        }
        if( Sealed.numMainUsedRows == 0 ){
            Sealed.numMainUsedRows += 1;
        }
        
        // get the converted mana cost of the card, to be used as the column index
        var colIdx = GTC.card_data[id].cmc;
        
        // get the row index based on the number of cards occupying that mana cost column
        var rowIdx = Sealed.colSize[ colIdx ];
        Sealed.colSize[ colIdx ] += 1;
        
        // add the card to the mainboard
        var img = GTC.card_data[ id ].img;
        //console.log("Adding " + id + " to row " + rowIdx + ", col " + colIdx)
        $( "#deck-area-" + rowIdx + "-" + colIdx).css("background-image", 'url(' + img + ')' );
        $( "#deck-area-" + rowIdx + "-" + colIdx).css("z-index", rowIdx );
        $( "#deck-area-" + rowIdx + "-" + colIdx ).on( 'mouseover', { 'id' : id }, Sealed.cardZoom );
        $( "#deck-area-" + rowIdx + "-" + colIdx ).dblclick( { 'id' : id, 'row' : rowIdx, 'col' : colIdx }, Sealed.addCardToPoolCallback );
        $( "#deck-area-" + rowIdx + "-" + colIdx ).attr( "data-card-id", id );
        
        // adjust the total, creature, and land counters
        Sealed.numCardsInDeck ++;
        $( "#mainboard-total" ).html( (Sealed.numCardsInDeck) + "/40" );
        if( GTC.card_data[id]['type'] == "Creature" || GTC.card_data[id]['type'] == "Artifact Creature" ){
            Sealed.numCreaturesInDeck ++;
            $("#mainboard-creatures").html( "Creatures: " + (Sealed.numCreaturesInDeck) );
        }
        else if( GTC.card_data[id]['type'] == "Land" ){
            Sealed.numLandsInDeck ++;
            $("#mainboard-lands").html( "Lands: " + (Sealed.numLandsInDeck) );
        }
        
    }
    
    , createNewPoolRow : function( rowIdx ) {
        
        var row = $('<div>').attr("id", "card-pool-row-" + rowIdx);
        row.addClass("card-pool-row");
        $("#card-pool-inner").append(row);
            
        for( var i = 0; i < 7; ++i ){
                
            var img = $("<div>");
            img.addClass( "card" ).addClass("stack");
            img.attr("id", "card-pool-" + rowIdx + "-" + i );
            img.css("z-index", "-1");
            $(row).append( img );
            
        }
        
    }
    
    , createNewMainRow : function( rowIdx ){
        
        var row = $('<div>').attr("id", "deck-area-row-" + rowIdx);
        row.addClass("card-pool-row");
        $("#deck-area-inner").append(row);
            
        for( var i = 0; i < 7; ++i ){
                
            var img = $("<div>");
            img.addClass( "card" ).addClass("stack");
            img.attr("id", "deck-area-" + rowIdx + "-" + i );
            img.css("z-index", "-1");
            $(row).append( img );
            
        }
        
    }
    
    , cardZoom : function(event) {
        
        var id = event.data.id;
        var img = GTC.card_data[ id ].img;
        $("#img-preview").css( "background-image", 'url(' + img + ')' );
        
    }
    
    , sortCardsIntoUIByType : function( ui, type ) {
        
        var sorted = [];
        var split;
        
        var unsorted;
        switch( ui ){
            case "pool":
                unsorted = Sealed.pool;
                break;
            case "deck":
                unsorted = Sealed.deck;
                break;
            default:
                return;
        }
        
        switch( type ){
            case "cost":
                sorted = unsorted.sort( Sealed.costSort );
                split = Sealed.splitByCost( sorted );
                break;
            default:
                return;
        }
        
        switch( ui ){
            case "pool":
                Sealed.insertSplitCardsIntoPool( split );
                break;
            default:
                return;
        }
        
        return sorted;
        
        
    }
    
    , insertSplitCardsIntoPool : function( split ) {
        
        var numSplits = split.length;
        
        for( var i = 0; i < numSplits; ++i ){
            
        }
        
    }
    
    , costSort : function( a, b ) {
        
        var aCost = GTC.card_data[a].cmc;
        var bCost = GTC.card_data[b].cmc;
        
        return aCost - bCost;
        
    }
    
    , splitByCost : function( sorted ) {
        
        var numCards = sorted.length;
        if( numCards == 0 ){
            return sorted;
        }
        
        var split = [ [] ];
        var color = GTC.card_data[ sorted[0] ].cmc;
        var colorIdx = 0;
        for( var i = 0; i < numCards; ++i ){
            var id = sorted[i];
            var tmpColor = GTC.card_data[ id ].cmc;
            if( tmpColor != color ){
                color = tmpColor;
                split.push( [] );
                colorIdx ++;
            }
            // add the card to the appropriate split column
            split[ colorIdx ].push( id );
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