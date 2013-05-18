var CardPoolViewModel = function( type ) {
    
    this.type = type;
    this.columns = ko.observableArray( [ ] );
    
    this.newCardPoolInstance = function( cards ) {
        // sort the cards by cmc
        if( cards != '' && cards != undefined ){
            cards = cards.sort( CardSort.costSort );
            var ColumnView = new ColumnViewModel( cards );
            this.columns.push( ColumnView );
            this.sortPoolByType( "cmc", "name" );
        }
    };
    
    this.addCardToPool = function( card, colSortType, cardSortType ) {
        
        if( this.columns().length == 0 ){
            var newColumn = new ColumnViewModel( [ card ] );
            newColumn.setCmc( card.cmc );
            this.columns.push( newColumn );
            return;
        }
        
        var cardCost = card.cmc;
        var curCol;
        
        for( var i = 0 ; i < this.columns().length; ++i ) {
            
            var column = this.columns()[i];
            colCost = column.cmc;
            
            // add to this column
            if( cardCost == colCost ) {
                this.columns()[i].cards.push(card);
                this.columns()[i].sortColumnByType( cardSortType );
                this.sortPoolByType( "cmc", cardSortType );
                return;
            }
            else if( cardCost < colCost ) {
                var newColumn = new ColumnViewModel( [ card ] );
                newColumn.setType( colSortType, cardCost );
                this.columns().splice( i, 0, newColumn );
                this.columns()[i].sortColumn();
                this.columns.push();
                this.sortPoolByType( "cmc", cardSortType );
                return;
            }
            
        }
        
        // if the code has reached this point, the new card has no columns to go into
        // and its respectable column's cmc is larger than all the others
        // Create a new column for the card and add it to the end of this CardPoolViewModel's columns observableArray
        var newColumn = new ColumnViewModel( [ card ] );
        newColumn.setType( colSortType, card[ colSortType ] );
        this.columns.push( newColumn );
        this.sortPoolByType( "cmc", cardSortType );
        
    };
    
    this.removeCardFromPool = function( view, col ) {
        this.columns()[col].cards.remove(view);
    };
    
    this.sortCardsByType = function( cards, type ) {
        
        var sortFcn;
        switch( type ) {
            case "cmc" :
                sortFcn = CardSort.costSort;
                break;
            case "color" :
                sortFcn = CardSort.colorSort;
                break;
            case "rarity" :
                sortFcn = CardSort.raritySort;
                break;
            case "type" :
                sortFcn = CardSort.typeSort;
        }
        
        return cards.sort( sortFcn );
        
    };
    
    this.sortPoolByType = function( colSortType, cardSortType ) {
        
        // get the columns as a single list
        var cards = [];
        for( var i = 0; i < this.columns().length; ++i ) {
            $.merge( cards, this.columns()[i].cards() );
        }
        
        // sort by type
        cards = this.sortCardsByType( cards, colSortType );
        
        var curCard, curType;
        if( this.columns().length > 0 ) {
            curType = cards[0][ colSortType ];
        }
        
        var column = [];
        var columns = [];
        
        for( var i = 0; i < cards.length; ++i ) {
            
            curCard = cards[i];
            
            if( curCard[ colSortType ] == curType ) {
                column.push( curCard );
            }
            else {
                var ColumnView = new ColumnViewModel( column );
                ColumnView.setType( colSortType, curCard[colSortType] );
                ColumnView.sortColumnByType( cardSortType );
                columns.push( ColumnView );
                column = [];
                column.push( curCard );
                curType = curCard[ colSortType ];
            }
            
        }
        
        var ColumnView = new ColumnViewModel( column );
        ColumnView.setType( colSortType, curCard[colSortType] );
        ColumnView.sortColumnByType( "name" );
        columns.push( ColumnView );
        
        this.columns( columns );
        this.columns().push();
        
    };
    
};