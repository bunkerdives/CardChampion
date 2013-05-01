var BannerController = {
    
	bannerId : 0
    
	, banners : {
		
		'http://media.wizards.com/images/magic/tcg/products/dka/wp_bonetoash_1024x768.jpg' : {
			outerW : 1024
			, outerH : 768
			, innerW : 830
			, innerH : 459
			, l : 194
			, t : 47
			, reverse : true
		}
		
		, 'http://media.wizards.com/images/magic/daily/wallpapers/Nice_Holiday_1280x960_Wallpaper.jpg' : {
			outerW : 1280
			, outerH : 960
			, innerW : 1200
			, innerH : 498
			, l : 80
			, t : 195
			, reverse : false
		}
		
		, 'http://media.wizards.com/images/magic/daily/wallpapers/AVR_1_1280x960_Wallpaper_m7lr3f99lv.jpg' : {
			outerW : 1280
			, outerH : 960
			, innerW : 1126
			, innerH : 450
			, l : 154
			, t : 317
			, reverse : true
		}
		
	}
    

    , setAnimatedBanner : function() {
		
		var currentBg = BackgroundController.backgrounds[ BackgroundController.backgroundId ];
		var currentBanner = currentBg.banners[ BannerController.bannerId ];
		var banner = BannerController.banners[ currentBanner ];
	
		var containerW = ($(window).width() * 0.95)-2;
		if ( containerW > 1098 ) {
			containerW = 1098;
		}
		var containerH = 150; //Static
    
        var bannerSrc = 'url(' + currentBanner + ')';
		var bannerOuterW = banner.outerW;
		var bannerOuterH = banner.outerH;
		var bannerInnerW = banner.innerW;
		var bannerInnerH = banner.innerH;
		var bannerLeft = banner.l;
		var bannerTop = banner.t;
		var reverse = banner.reverse;
	
		var tmpH = (containerW * (bannerInnerH / bannerInnerW));
		var tmpW = containerW;
		if (tmpH < containerH) {
			tmpW = (containerH * (bannerInnerW / bannerInnerH));
		}
		var newW = ((bannerOuterW / bannerInnerW) * tmpW);
		var newH = ((bannerOuterH / bannerOuterW) * newW);
		var newL = (bannerLeft * (newW / bannerOuterW)) * -1;
		var newT = (bannerTop * (newH / bannerOuterH)) * -1;
	
		var newInnerH = ((bannerInnerH / bannerOuterH) * newH);
		var bannerEndT = ( newT - (newInnerH-150) );
	
		if (reverse == true) {
			tmpReverse = newT;
			newT = bannerEndT
			bannerEndT = tmpReverse;
		}
			
        BannerController.bannerId += 1;
        if( BannerController.bannerId >= currentBg.banners.length ){
            BannerController.bannerId = 0;
        }
			
        $('#foyer-banner').css( {
            'background-image' : bannerSrc
    					, 'background-size' : newW + 'px ' + newH + 'px'
            , 'background-position' : newL + 'px ' + newT + 'px' //Starting position for banner image
        } );
    
        $('#foyer-banner').animate(
            { 'background-position-y' : bannerEndT } //End position for banner image
            , 12400
            , function() {
                setTimeout( BannerController.setAnimatedBanner, 8600 );
            }
        );
        
    }
    
}