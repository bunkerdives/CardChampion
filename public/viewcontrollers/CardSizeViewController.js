var CardSizeViewController = {

	rtime : new Date(1, 1, 2000, 12,00,00)
	
	, timeout : false
	
	, delta : 500

	, cardSizeChange : function ( slideAmount ) {

		var standardH = 198.7; // standard card height
		var standardW = 143; // standard card width
		var newH = standardH * (slideAmount/100);
		var newW = standardW * (slideAmount/100);
		var marginTop = newH * -0.894;

		ViewModel.cardH = newH;
		ViewModel.cardW = newW;
		ViewModel.cardMarginTop = marginTop;

		ViewModel.poolViewController.fixPoolSize();

		$(".card").each( function() { //Change background size of cards to 0; add class .cardResize
			$(this).addClass('cardResize');
			$(this).css( {
				'background-size': '0px 0px',
				"height" : newH,
				"width" : newW,
				"margin-top" : marginTop
			} );
		} );

		$(".column").each( function() {
			$(this).css("margin-top", marginTop*-1);
		} );

		//Set timeout
		CardSizeViewController.rtime = new Date();
		if( CardSizeViewController.timeout === false ) {
			CardSizeViewController.timeout = true;
			setTimeout( CardSizeViewController.cardSizeChangeEnd, CardSizeViewController.delta );
		}
  
	}

	, cardSizeChangeEnd : function () {

	  if( new Date() - CardSizeViewController.rtime < CardSizeViewController.delta ) {
	  	setTimeout( CardSizeViewController.cardSizeChangeEnd, CardSizeViewController.delta );
	  } else {
	  	CardSizeViewController.timeout = false;
			var newW = ViewModel.cardW;
			var newH = ViewModel.cardH;
			var bgSize=newW + "px " + newH + "px";
			//remove .cardResize class, change the background size of these elements
			$( ".card" ).each(function() {//Change background size of cards to 0; add class .cardResize
				$(this).removeClass('cardResize');
				$(this).css( 'background-size', bgSize );
			});
		}
	}

}