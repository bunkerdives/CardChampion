var TypeaheadController = {
    
    chosenCard : ''
    , typeaheadMap : {}
    
    , source : function (query, process) {
	
	    cards = [];
	    map = {};
	
		var cardData;
	    var data = [ ];
	
		$.each( SetController.setList, function(key, setObj) {
		
			var cardData = setObj.card_data;
            var set = setObj.set;
            var setAbbr = setObj.abbr;
		
			$.each( cardData, function( index, value ) {
				var cardObj = { cardData : value, set : set, setAbbr : setAbbr, cardId : index };
                data.push( cardObj );
			} );
		
		} );

	    $.each( data, function (key, cardObj) {
            var processKey = cardObj.cardData.name + " - " + cardObj.set;
            map[processKey] = { setAbbr : cardObj.setAbbr, cardId : cardObj.cardId };
            cards.push( processKey );
	    } );

        this.typeaheadMap = map;
        
	    process(cards);
        
	}
    
    , updater : function (item) {
        
        var setAbbr = this.typeaheadMap[item].setAbbr;
        var cardId = this.typeaheadMap[item].cardId;
            
        console.log("updater " + item)
        console.log("updater " + setAbbr + " " + cardId );
        //console.log("\n\n")
        
        //var item = item.cardData.name + " - " + item.set;
        //console.log("updater " + item );
        
        // create a CardViewModel and assign it to the chosen card observable
        //set.card_data[ id ];
        
        var setData = SetController.getSet( setAbbr );
        //console.log(setData)
        var cardData = setData.card_data[ cardId ];
        
        console.log( "updater cardData = " + cardData.name );
        
        TypeaheadController.chosenCard = new CardViewModel( cardData );
        
        console.log("fkjs")
        
		return item;
        
    }
    
    
    , initTypeahead : function() {
    
        $('#builder-input').typeahead( {

    		source: this.source

    		, updater: this.updater

    	} );
    
    }
    
};