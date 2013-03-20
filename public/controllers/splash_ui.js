function showRegisterForm() {
	$('#lightbox-txt-container span').text('Register');
	$('#login-username-container').css('display', 'none');
	$('#register-username-container').css('display', 'block');
	$('#login-password-container').css('display', 'none');
	$('#register-password-container').css('display', 'block');
	$('#register-password-confirm-container').css('display', 'block');
	$('#register-email-container').css('display','block');
	$('#register-email-confirm-container').css('display','block');
	$('#login-view-register-btn').css('display', 'none');
	$('#register-view-register-btn').css('display', 'block');
	$('#login-view-login-btn').css('display', 'none');
	$('#register-view-login-btn').css('display', 'block');
}

function showLoginForm() {
	$('#lightbox-txt-container span').text('Log In');
	$('#login-username-container').css('display', 'block');
	$('#register-username-container').css('display', 'none');
	$('#login-password-container').css('display', 'block');
	$('#register-password-container').css('display', 'none');
	$('#register-password-confirm-container').css('display', 'none');
	$('#register-email-container').css('display','none');
	$('#register-email-confirm-container').css('display','none');
	$('#login-view-register-btn').css('display', 'block');
	$('#register-view-register-btn').css('display', 'none');
	$('#login-view-login-btn').css('display', 'block');
	$('#register-view-login-btn').css('display', 'none');
}

function bgStretch(src,oW,oH,iW,iH,l,t){
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
	
	$('body').css({
		"background-image": "url('" + imgSrc +"')",
		"background-size": newW + "px " + newH + "px",
		"background-position": newL + "px " + newT + "px"
	});
}

function iMacLayout(){
	var iMacW = $('#imac-wrapper').width();
	var iMacH = iMacW * 0.76625;//H-W ratio of iMac
	var screenshotW = iMacW * 0.92125;//screen W-iMac W ratio 
	var screenshotH = screenshotW * 0.562432;//screen H-iMac H ratio
	var screenshotTop = iMacH * -0.946982;//negative margin top
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
	
});