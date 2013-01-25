function showLightbox() {
	$('#chat-hidden').css("display", "none");
	$('#nickname-lightbox').css("display", "block");
	//$('#chat-shown').css("display", "block");
}

function hideLightbox() {
	$('#chat-hidden').css("display", "block");
	$('#nickname-lightbox').css("display", "none");
}

function lightboxSize() {
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	$('#nickname-lightbox').css({
		"height": windowHeight,
		"width": windowWidth
	});
}


$(document).ready(function(){
  $('#screenshot-carousel').carousel({
		interval: 5000
	});
	lightboxSize();
});

$(window).resize(function() {
	lightboxSize();
});
