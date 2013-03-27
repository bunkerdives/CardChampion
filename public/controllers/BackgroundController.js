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
    	var background = this.backgrounds[ran];
    	this.backgroundId = ran;
    	bgStretch( background.imgSrc, background.outerW, background.outerH, background.innerW, background.innerH, background.l, background.t );

    }
    
}