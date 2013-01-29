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
        
        showSealedInterface();
        
        var packs = Sealed.createSealedPool();
        
        Sealed.addPacksToPool( packs );
        
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
                    createNewPoolRow( row );
                    Sealed.numRows += 1;
                }
            }
            
            color = GTC.card_data[ id ].color;
            img = GTC.card_data[ id ].img;
            element = $( "#card-pool-" + row + "-" + col);
            addCardToUI( element, id, img, row, col, 'pool' );
            Sealed.colSizePool[ col ] += 1;
            row += 1;
            
        }
        
    }
    
    , addCardToPoolCallback : function( event ) {
        
        var id = event.data.id;
        var row = event.data.row;
        var col = event.data.col;
        
        // shift the remaining cards in the mainboard column up
        var colSize = Sealed.colSize[ col ];
        for( var i = row; i < colSize - 1; ++i ){
            
            // the id of the card we are replacing
            element =  $( "#deck-area-" + i + "-" + col );
            
            // the id of the card we are copying
            nextID = "#deck-area-" + (i+1) + "-" + col;
            
            // get the copied card's ID and img
            cId = $(nextID).attr("data-card-id");
            cImg = GTC.card_data[ cId ].img;
            
            removeCardFromUI( element );
            
            addCardToUI( element, cId, cImg, i, col, 'main' );
            
        }
        
        // hide the last card in the column
        var element = $( "#deck-area-" + (colSize - 1) + "-" + col );
        removeCardFromUI( element );
        
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
        element = $( "#card-pool-" + rowIdx + "-" + colIdx );
        addCardToUI( element, id, img, rowIdx, colIdx, 'pool' );
        
        // adjust the total, creature, and land counters
        Sealed.numCardsInDeck --;
        adjustCardCounterUI(-1, GTC.card_data[id].type);
        
    }
    
    , addCardToMain : function( event ) {
        
        var id = event.data.id;
        var row = event.data.row;
        var col = event.data.col;
        
        // shift the remaining cards in the pool column up
        var colSize = Sealed.colSizePool[ col ];
        for( var i = row; i < colSize - 1; ++i ){
            // the card element we are replacing
            var element =  $( "#card-pool-" + i + "-" + col );
            
            // the id of the card we are copying
            nextID = "#card-pool-" + (i+1) + "-" + col;
            
            // get the copied card's ID and img
            cId = $(nextID).attr("data-card-id");
            cImg = GTC.card_data[ cId ].img;
            
            removeCardFromUI( element );
            
            addCardToUI( element, cId, cImg, i, col, 'pool' );
            
        }
        // hide the last card in the column
        var element = $( "#card-pool-" + (colSize - 1) + "-" + col );
        removeCardFromUI( element );
        
        Sealed.colSizePool[ col ] -= 1;
        
        // if a new mainboard row is needed, create it
        if( Sealed.numMainUsedRows == Sealed.numMainRows ){
            createNewMainRow( Sealed.numMainRows );
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
        element = $( "#deck-area-" + rowIdx + "-" + colIdx );
        addCardToUI( element, id, img, rowIdx, colIdx, 'main' );
        
        // adjust the total, creature, and land counters
        Sealed.numCardsInDeck ++;
        adjustCardCounterUI(1, GTC.card_data[id].type);
        
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
        
        var split;
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
        
        // remove the source images from all html card elements, making the table of cards 'empty'
        var rows = Sealed.numRows;
        var cols = Sealed.numCols;
        for( var i = 0; i < rows; ++i ){
            for( var j = 0; j < cols; ++j ){
                var elemID = $( "card-pool-" + i + "-" + j );
                elemID.attr( "data-card-id", "" );
                elemID.css( "background-image", "none" );
                elemID.css( "z-index", "-1" );
                elemID.off( 'dblclick' );
                elemID.off( 'mouseover' );
            }
        }
        
        // add the subsorted cards into their respectable UI card element
        var numSplits = split.length;
        for( var i = 0; i < numSplits; ++i ){
            var sizeSub = numSplits[i].length;
            for( var j = 0; j < sizeSub; ++j ){
                // add the card to the pool
                var id = split[i][j];
                var row = j;
                var col = GTC.card_info[ id ].cmc;
                var img = GTC.card_data[ id ].img;
                $( "#card-pool-" + row + "-" + col ).css( "background-image", 'url(' + img + ')' );
                $( "#card-pool-" + row + "-" + col ).css( "z-index", j );
                $( "#card-pool-" + row + "-" + col ).on( 'mouseover', { 'id' : id, 'row' : row, 'col' : col }, Sealed.cardZoom );
                $( "#card-pool-" + row + "-" + col ).dblclick( { 'id' : id, 'row' : row, 'col' : col }, Sealed.addCardToMain );
                $( "#card-pool-" + row + "-" + col ).attr( "data-card-id", id );
            }
            
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