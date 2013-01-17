DeckBuilder = {
    
    collection : []
    
    , showBuilderInterface : function() {
		
        // hide the lobby interface
        $("#foyer").css( "display", "none" );
		
		// show the deck builder interface
		$("#builder").css( "display", "block" );
		
        // make standard the default format (select standard in format drop downs)
        
        // put all standard cards into an array and add each to the card pool
        
		// bind any buttons to their event handlers
        DeckBuilder.bindBtnEventHandlers();
        
	}
    
    , bindBtnEventHandlers : function() {
        
        /* bind the set selectors */
        $('#builder_set_opt').change( function(){
            
            switch( $(this).val() ){
                case "Return to Ravnica" :
                    DeckBuilder.selectSetForPool( 'RtR' );
                    break;
                default :
                    break;
            }
            
        } );
        
    }
    
    , getFormatCollection : function( format ) {
        
        if( format == "Standard" ){
            ;
        }
        
    }
    
    , addColorToPool : function() {
        
    }
    
    , searchCollection : function() {
        
    }
    
    , selectFormatForPool : function() {
        
    }
    
    , selectSetForPool : function( _set ) {
        
        console.log('adding cards to card pool');
        
        var set = Sets.getSetList( _set );
        var cardData = Sets.getCardData(set);
        
        /* get the list of cards and card data for the set */
        if( set == null || cardData == null ){
            return null;
        }
        
        /* get the body of the card pool */
        var tbody = $('#btbody_cardpool');
        
        /* insert each cards data into the pool table as a <tr> */
        for( var cardNum in set ){
            
            /* get the card data from the card number */
            var card = cardData[ cardNum ];
            
            /* create a <tr> */
            var tr = $('<tr>');
            
            /* create the name <td> */
            var name_td = $("<td class='btd btd_name'>");
            name_td.html( card['name'] );
            
            /* append the card elements to the card <td>, and the card <td> to the card pool table */
            tr.append( name_td );
            tbody.append( tr );
            
        }
        
    }
    
    , sortPoolByMana : function() {
        
    }
    
    , sortPoolByName : function() {
        
    }
    
    , sortPoolByRarity : function() {
        
    }
    
    , addCollectionToCardPool : function(collection) {
        
    }
    
    , addCardToMainboard : function() {
        
    }
    
    , addCardToSideboard : function() {
        
    }
	
};