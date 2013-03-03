function mainSlide(str,arr){
	//console.log('mainSlide function called. arg1=' + str + ' arg2=' + arr);
	navEvents();//Turn on all link click handlers
	var linkName = "#header-link-" + str;//Most recently fired link click handler
	$(linkName).off();//Turn the click handler off
	var slides = arr;//List of unselected slides
	var id = "#main-slide-" + str;//Selected slide
	for(var i=0;i<slides.length;i++) {//Iterate over all unselected slides
		var hideSlide = slides[i];//Get id
		$(hideSlide).css("display", "none");//Hide div
	}
	$(id).css("display", "block");//Show selected slide
	$('#main-animate-wrapper').animate({height:"439px"},1000);//Animate wrapper opening
}

function navClick(p){
	//console.log('navClick function called. arg=' + p);
	var slides = [];//Empty array object
	$( ".main-slide" ).each(function() {//Fill array with of all slide IDs
	  var linkId = "#" + this.id;//Get id
		//console.log("linkID: " + linkId);
		slides.push(linkId);//Add id to new index position
	});
	//console.log(slides);
	var thisId = "#main-slide-" + p;//Get selected slide id
	slides = jQuery.grep(slides, function(value) {//Remove selected slide id from array
  	return value != thisId;
  });
	//console.log(slides);
	//, if so animate it closed; then show proper menu and animate open
	var wrapperHeight = $('#main-animate-wrapper').css("height");//Determine if wrapper is already open
	//alert(wrapperHeight);
	if (wrapperHeight != '0px') {//If slide height is not zero pixels
		$('#main-animate-wrapper').animate({height:'0px'},1000, function(){//Animate wrapper closed
			mainSlide(p,slides);//Function to open selected slide
		});
	} else {
		mainSlide(p,slides);
	}
}
			
function navEvents(){
	//console.log('navEvents function called.');
	var arr =[];//empty array object
	$( ".header-link" ).each(function() {//Fill array with of all link IDs
	  var linkId = "#" + this.id;//Get id
		//console.log("linkID: " + linkId);
		arr.push(linkId);//Add id to new index position
	});
	$.each(arr, function(index, value) {//Iterate over array of link IDs
		var p = index+1;//Offset the 0-indexed array
		$(value).off();//turn off all event handlers
		$(value).click(function () {//Turn on click handler
			navClick(p);//
		});
	});
}

function headerLayout(){
	console.log('headerLayout function called.');
	var windowWidth = $(window).width();
	var headerContainerW = windowWidth*0.95;
	if (headerContainerW>1080) {
		headerContainerW=1080;
	}
	$("#header-container").css("width", headerContainerW);
	var headerLinksW = 0;
	var headerLinksNum = 0;
	$('a.header-link').each(function() {
		headerLinksW += $(this).width();
		headerLinksNum++;
		//console.log('headerLinksW: ' + headerLinksW);
	});
	var logoW = $("#logo").outerWidth();
	var headerLinksSpacer = ((headerContainerW-headerLinksW)-logoW)/(headerLinksNum+1);
	if (headerLinksSpacer>=10){
		$(".header-link-spacer").css("width", headerLinksSpacer);
	} else {
		$(".header-link-spacer").css("width", 10);
	}
}

function headerInit(){
	headerLayout();
	navEvents();
	$('#header-link-1').off();//#main-pane-1 is shown on init, ergo turn off click handler for its link
}

$(window).resize(function() {
	var headerExists = $("#header").css("display");
	if (headerExists=="block") {
		headerLayout();
	}
});