var CardViewController = {
    
    cardSizeInit : function() {
		
    	$(".card").css( {
    		"height" : SealedViewModel.cardH,
    		"width" : SealedViewModel.cardW,
    		"background-size" : SealedViewModel.cardW + "px " + SealedViewModel.cardH + "px"
    	} );
        
    } 
    
};