//Determine #pick-screen top padding
	//onLoad of last card in pack screen
$(document).ready(function(){
	$('#pack-tran-16').load(function(){
	  var fixed_height = $('#pack-screen').height();
		var fixed_height = fixed_height + 7; //i.e., normal padding
		$("#pick-screen").css({
		  "padding-top" : fixed_height + "px"
		});
	});
});
	//onResize of window
$(window).resize(function() {
  var fixed_height = $('#pack-screen').height();
	var fixed_height = fixed_height + 7; //i.e., normal padding
	$("#pick-screen").css({
	  "padding-top" : fixed_height + "px"
	});
});
//

//Determine background image (i.e., card) size of pack screen spans
	//Pack cards, i.e., .span1
		//onLoad (after first row of pack is loaded)
$(document).ready(function(){
	$('#pack-tran-8').load(function(){
	  var fixed_height = $('#pack-tran-8').height();
		var fixed_width = $('#pack-tran-8').width();
		for( var i = 0; i < 16; ++i ){
			var id = "#pack-card-" + i;
			$(id).css({
		  	"background-size" : fixed_width + "px " + fixed_height + "px"
			});
		}
	});
});
	//Preview
		//onLoad
$(document).ready(function(){
	$('#pack-tran-8').load(function(){
		var id = "#preview";
	  var fixed_height = $(id).height();
		var fixed_width = $(id).width();
		$(id).css({
		  "background-size" : fixed_width + "px " + fixed_height + "px"
		});
	});
});


//Background image (i.e., card) size of pick screen
	//onLoad first row of picks
$(document).ready(function(){
	$('#pick-row-loaded').load(function(){
	  var fixed_height = $('#pick-row-loaded').height();
		var fixed_width = $('#pick-row-loaded').width();
		for( var i = 0; i < 10; ++i ){
			var id = "#pick-card-0-" + i;
			$(id).css({
		  	"background-size" : fixed_width + "px " + fixed_height + "px"
			});
		}
	});
});
//
//






//onResize of window, change card sizes; RESIZE BEGIN
var rtime = new Date(1, 1, 2000, 12,00,00);
var timeout = false;
var delta = 200;

		//Pack screen
$(window).resize(function() {
		for( var i = 0; i < 16; ++i ){
			var id = "#pack-card-" + i;
			if ($(id).css('background-image') !== 'none') {
				$(id).css({
					"background-color" : "#fff",
		  		"background-size" : "0px 0px"
				});
			}	
		}
			//Preview image
		var id = "#preview";
		if ($(id).css('background-image') !== 'none') {
			$(id).css({
				"background-color" : "#fff",
		 		"background-size" : "0px 0px"
			});
		}	
		
			//Pick screen//REWRITE THIS SECTION LATER
		var rowEval = 45;
		for( var r = 0; r < rowEval; ++r ){
			var id = "#row-" + r;
		if( id.length ){
				//i.e., if id exists
				for( var c = 0; c < 10; ++c ){
					var id = "#pick-card-" + r + "-" + c;
					if ($(id).css('background-image') !== 'none') {
						$(id).css({
							"background-color" : "#fff",
					 		"background-size" : "0px 0px"
						});
					}	
				}
			} else {
				r = 45;
			}
		}
		
    rtime = new Date();
    if (timeout === false) {
        timeout = true;
        setTimeout(resizeend, delta);
    }
});
		//RESIZE END
function resizeend() {
    if (new Date() - rtime < delta) {
        setTimeout(resizeend, delta);
    } else {
        timeout = false;
				
				//pack screen
			  var fixed_height = $('#pack-tran-8').height();
			 	var fixed_width = $('#pack-tran-8').width();
				for( var i = 0; i < 16; ++i ){
					var id = "#pack-card-" + i;
					$(id).css({
						"background-color" : "transparent",
			  		"background-size" : fixed_width + "px " + fixed_height + "px"
					});
				}
				
				//preview image
				var id = "#preview";
				var fixed_height = $(id).height();
				var fixed_width = $(id).width();
				$(id).css({
						"background-color" : "transparent",
					  "background-size" : fixed_width + "px " + fixed_height + "px"
				});
				
				//Pick screen 			
			var rowEval = 45;
			for( var r = 0; r < rowEval; ++r ){
				var id = "#row-" + r;
				if (id.length){
					//i.e., if id exists
					for( var c = 0; c < 10; ++c ){
						var id = "#pick-card-" + r + "-" + c;
						var fixed_height = $('#pick-row-loaded').height();
						var fixed_width = $('#pick-row-loaded').width();
						if ($(id).css('background-image') !== 'none') {
							$(id).css({
								"background-color" : "transparent",
						 		"background-size" : fixed_width + "px " + fixed_height + "px"
							});
						}	
					}
				} else {
					rowEval = 0;
				}
			}
    }               
}












//
