function foyerLayout(){
	var windowWidth = $(window).width();
	var foyerContainerW = windowWidth*0.9;
	if (foyerContainerW>975) {
		foyerContainerW=975;
	}
	$("#foyer-content-container").css("width", foyerContainerW);
	$("#portal").css("width", foyerContainerW);
}

$(window).resize(function(){
	foyerLayout();
});