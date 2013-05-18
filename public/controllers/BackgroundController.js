var BackgroundController = {
    
	backgroundId : 0
    
	, backgrounds : [
		{
			imgSrc : 'http://media.wizards.com/images/magic/daily/wallpapers/Moat_MTGOweek_1920x1080_Wallpaper.jpg'
			, outerW : 1920
			, outerH : 1080
			, innerW : 1920
			, innerH : 973
			, l : 0
			, t : 39
			, banners : [ 
				'http://media.wizards.com/images/magic/tcg/products/dka/wp_bonetoash_1024x768.jpg'
				, 'http://media.wizards.com/images/magic/daily/wallpapers/Nice_Holiday_1280x960_Wallpaper.jpg'
				, 'http://media.wizards.com/images/magic/daily/wallpapers/AVR_1_1280x960_Wallpaper_m7lr3f99lv.jpg'
			]
		}
	]
    
    , setBackgroundImage : function() {
    
        var ran = Math.floor( Math.random() * this.backgrounds.length );   
    	this.backgroundId = ran;
        
        var background = this.backgrounds[ran];
    	this.stretchBackground( background.imgSrc, background.outerW, background.outerH, background.innerW, background.innerH, background.l, background.t );

    }
    
    , stretchBackground : function( imgSrc, imgOuterW, imgOuterH, imgInnerW, imgInnerH, imgLeft, imgTop ) {
    
    	var windowW = $(window).width();
    	var windowH = $(window).height();
	
    	var tmpH = ( windowW * ( imgInnerH / imgInnerW ) );
    	var tmpW = windowW;
    	if ( tmpH < windowH ) tmpW = ( windowH * ( imgInnerW / imgInnerH ) );

    
    	var newW = ( (imgOuterW / imgInnerW) * tmpW );
    	var newH = ( (imgOuterH / imgOuterW) * newW );
    	var newL = - ( imgLeft * (newW / imgOuterW) );
    	var newT = - ( imgTop * (newH / imgOuterH) );
	
    	$('#background-wrap').css( {
    		"background-image": "url('" + imgSrc + "')",
    		"background-size": newW + "px " + newH + "px",
    		"background-position": newL + "px " + newT + "px"
    	} );
    
    }
    
}