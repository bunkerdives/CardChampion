var CardViewController = {
    
    cardSizeInit : function() {
		
    	$(".card").css( {
    		"height" : ViewModel.cardH
    		, "width" : ViewModel.cardW
    		, "background-size" : ViewModel.cardW + "px " + ViewModel.cardH + "px"
    	} );
        
    } 
    
};