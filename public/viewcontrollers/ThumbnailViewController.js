var ThumbnailViewController = {

	//This function resizes and positions full card images so only the art is showing
	renderThumbnail : function(imgW, target) {
		
		var imgH = imgW * 0.7252;
		var imgBgW = imgW * (1.2252+.1);
		var imgBgH = imgBgW * 1.39;
		var imgBgTop = imgBgH * (-0.1258-.01);
		var imgBgLeft = imgBgW * -0.097;
    
		$(target).css( {
			'height': imgH
			, 'background-size': imgBgW + "px " + imgBgH + "px"
			, 'background-position': imgBgLeft + "px " + imgBgTop + "px"
		} );
		
	}
	
}