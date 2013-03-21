/*function fullscreen(){
	//var docElm = document.documentElement;//Document fullscreen
	var docElm = document.getElementById('fullscreen-image');//Element fullscreen
	if (docElm.requestFullscreen) {
	    docElm.requestFullscreen();
	}
	else if (docElm.mozRequestFullScreen) {
	    docElm.mozRequestFullScreen();
	}
	else if (docElm.webkitRequestFullScreen) {
	    docElm.webkitRequestFullScreen();
	}
}*/

function bgStretch( src, oW, oH, iW, iH, l, t ) {
    
	var windowW = $(window).width();
	var windowH = $(window).height();
	var imgSrc = src;
	var imgOuterW = oW;
	var imgOuterH = oH;
	var imgInnerW = iW;
	var imgInnerH = iH;
	var imgLeft = l;
	var imgTop = t;
	
	var tmpH = (windowW * (imgInnerH / imgInnerW));
	var tmpW = windowW;
	if (tmpH < windowH) {
		tmpW = (windowH * (imgInnerW / imgInnerH));
	}
    
	var newW = ((imgOuterW / imgInnerW) * tmpW);
	var newH = ((imgOuterH / imgOuterW) * newW);
	var newL = (imgLeft * (newW / imgOuterW)) * -1;
	var newT = (imgTop * (newH / imgOuterH)) * -1;
	
	$('body').css( {
		"background-image": "url('" + imgSrc +"')",
		"background-size": newW + "px " + newH + "px",
		"background-position": newL + "px " + newT + "px"
	} );
    
}

function iMacLayout(){
	var iMacW = $('#imac-wrapper').width();
	var iMacH = iMacW * 0.76625;//H-W ratio of iMac
	var screenshotW = iMacW * 0.92125;//screen W-iMac W ratio 
	var screenshotH = screenshotW * 0.562432;//screen H-iMac H ratio
	var screenshotTop = iMacH * -0.946982;//negative margin top
	$("#imac-screenshot-wrapper").css( {
		"width": screenshotW,
		"height": screenshotH,
		"margin-top": screenshotTop
	} );
}

function splashLayout() {
	iMacLayout();
}

function splashInit() {
	splashLayout();
}

$(window).resize( function() {
	var splashExists = $("#splash").length;
	if( splashExists == 1 ) {
		splashLayout();
	}
} );

$(window).ready( function() {
	$("html").niceScroll({ 
		zindex : "2000",
		hidecursordelay : "100" 
	});
});