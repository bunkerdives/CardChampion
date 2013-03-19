function bgStretch(src,oW,oH,iW,iH,l,t){
	//console.log("bgStretch function called.");
	
	var windowW = $(window).width();
	var windowH = $(window).height();
	var imgSrc = src;
	var imgOuterW = oW;
	var imgOuterH = oH;
	var imgInnerW = iW;
	var imgInnerH = iH;
	var imgLeft = l;
	var imgTop = t;
	
	//var iW2iHRatio = (imgInnerH / imgInnerW); //Inner Width to Inner Height Ratio
	var tmpH = (windowW * (imgInnerH / imgInnerW)); //Temporary Inner Height according to Stretched Inner Width
	var tmpW = windowW;
	
	if (tmpH < windowH) { //If Temporary Inner Height is less than Window Height
		//var iH2iWRatio = (imgInnerW / imgInnerH); //Inner Height to Inner Width Ratio
		tmpW = (windowH * (imgInnerW / imgInnerH)); //Temporary Inner Width according to Stretched Inner Height
	}
	
	//var iW2oWRatio = (imgOuterW / imgInnerW); //Inner Width to Outer Width Ratio
	var newW = ((imgOuterW / imgInnerW) * tmpW); //Stretched Outer Width
	//var oW2oHRatio = (imgOuterH / imgOuterW);//Outer Width to Outer Height Ratio
	var newH = ((imgOuterH / imgOuterW) * newW);//Stretched Outer Height
	
	//var oldW2newWRatio = (newW / imgOuterW);
	var newL = (imgLeft * (newW / imgOuterW)) * -1;
	//var oldH2newHRatio = (newH / imgOuterH);
	var newT = (imgTop * (newH / imgOuterH)) * -1;
	
	$('body').css({
		"background-image": "url('" + imgSrc +"')",
		"background-size": newW + "px " + newH + "px",
		"background-position": newL + "px " + newT + "px"
	});
}

function iMacLayout(){
	//console.log('iMacLayout function called.');
	var iMacW = $('#imac-wrapper').width();
	//console.log('iMacW: ' + iMacW);
	var iMacH = iMacW * 0.76625;//H-W ratio of iMac
	//console.log('iMacH: ' + iMacH);
	var screenshotW = iMacW * 0.92125;//screen W-iMac W ratio 
	//console.log('screenshotW: ' + screenshotW);
	var screenshotH = screenshotW * 0.562432;//screen H-iMac H ratio
	//console.log('screenshotH: ' + screenshotH);
	var screenshotTop = iMacH * -0.946982;//negative margin top
	//console.log('screenshotTop: ' + screenshotTop);
	$("#imac-screenshot-wrapper").css({
		"width": screenshotW,
		"height": screenshotH,
		"margin-top": screenshotTop
	});
}

function splashLayout() {
	console.log('splashLayout function called.');
	iMacLayout();
}

function splashInit() {
	splashLayout();
	
}

$(window).resize(function() {
	var splashExists = $("#splash").length;
	if (splashExists==1) {
		splashLayout();
	}
	
	bgStretch('http://media.wizards.com/images/magic/daily/wallpapers/Moat_MTGOweek_1920x1080_Wallpaper.jpg',1920,1080,1920,973,0,39);
	
	
});