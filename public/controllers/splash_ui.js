function showLobby() {
	$('#splash').css("display", "none");
	$('#nickname-lightbox').css("display", "block");
	$('#foyer').css("display", "block");
}


function lightboxSize() {
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	$('#nickname-lightbox').css({
		"height": windowHeight,
		"width": windowWidth
	});
}

//var interval = self.setInterval(appendChat,500);
function appendChat() {
	var convo = $("#convo");
	var convoInner = $("#convo-inner"); 
	var atBottom = ( convoInner.outerHeight() - convo.scrollTop() ) <=  convo.height();
	var msg = "<div class='chat-msg'><span class='chat-username' style='color:red;'>Username 1:</span><span>Test" + i + "</span></div>";
	convoInner.append(msg);
	
	if( atBottom ){
		convo.stop().animate({ scrollTop: convo[0].scrollHeight }, 400);
	}

	//++i;
}

function carouselDimensions() {
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	
	var carouselWidth = windowWidth;
	var carouselHeight = (windowHeight-40)*0.8;
	$('#screenshot-carousel').css({
		"width" : carouselWidth,
		"height" : carouselHeight
	});
	
	var taglineWidth = windowWidth*0.9;
	if(taglineWidth>400) {
		taglineWidth=400;
	}
	var taglineHeight = carouselHeight*0.75;
	if (taglineHeight>300) {
		taglineHeight=300;
	}
	var taglineLeft = (windowWidth-taglineWidth)/2;
	var taglineTop = (carouselHeight-((carouselHeight-taglineHeight)/2))*-1;
	var taglineBottom = carouselHeight-(taglineTop*-1);
	$('#tagline').css({
		"width" : taglineWidth,
		"height" : taglineHeight,
		"left" : taglineLeft,
		"margin-top" : taglineTop,
		"margin-bottom" : taglineBottom
	});
	
	var taglineTxtTop = taglineHeight*-1;
	$('#tagline-txt').css({
		"margin-top" : taglineTop
	});
	
}

$(document).ready(function(){
	carouselDimensions();
	lightboxSize();
});

$(window).resize(function() {
	carouselDimensions();
	lightboxSize();
});
