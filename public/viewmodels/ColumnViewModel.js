var ColumnViewModel = function( cards ) {
  
    this.cards = ko.observableArray( cards );
    
    this.colType;
    
    this.cmc;
    this.color;
    this.rarity;
    this.type;
    
    this.setType = function( type, typeFigure ) {
        
        this.colType = type;
        
        switch( type ) {
            case "cmc" :
                this.cmc = typeFigure;
                break;
            case "color" :
                this.color = typeFigure;
                break;
            case "rarity" :
                this.rarity = typeFigure;
                break;
            case "type" : 
                this.type = typeFigure;
        }
        
    };
    
    this.setCmc = function( cmc ) {
        this.cmc = cmc;
    };
    
    this.sortColumnByType = function( type ) {
        
        switch( type ){
            case "name" :
                this.cards.sort( CardSort.alphabeticalSort );
                break;
            case "cmc" :
                this.cards.sort( CardSort.costSort );
                break;
            case "color" :
                this.cards.sort( CardSort.colorSort );
                break;
            case "rarity" :
                this.cards.sort( CardSort.raritySort );
                break;
            case "type" :
                this.cards.sort( CardSort.typeSort );
                break;
        }
        
    };
    
    this.sortColumn = function() {
        this.cards.sort( CardSort.alphabeticalSort );
    };
    
};