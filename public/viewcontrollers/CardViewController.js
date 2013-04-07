var CardViewController = {
    
    cardSizeInit : function() {
    
    	/*var cardHeight = 198.7; //standard height
    	var cardWidth = 143; //standard width*/
	
    	$(".card").css( {
    		"height" : SealedViewModel.cardH,
    		"width" : SealedViewModel.cardW,
    		"background-size" : SealedViewModel.cardW + "px " + SealedViewModel.cardH + "px"
    	} );
        
    } 
    
};