var VerticalOffsetViewController = {
	
	offsetDragHandlers : function () {
		
		console.log("offsetDragHandlers")
		
		$('#drag-offset-y').mousedown(function(e){
			ViewModel.yOffsetBool=true;
			$("body").addClass("no-select");
			$("body").addClass("ns-resize-cursor");
			ViewModel.yOffsetDragStart=e.pageY;
		});

		$(document).mouseup(function(){
			if (ViewModel.yOffsetBool == true) {
				ViewModel.yOffsetBool = false;
				$("body").removeClass("no-select");
				$("body").removeClass("ns-resize-cursor");
				ViewModel.topScreenCalcPercentageOld = ViewModel.topScreenCalcPercentage;
	            ViewModel.poolViewController.fixPoolSize();
			}
		}).mousemove(function(e){
			if (ViewModel.yOffsetBool == true) {
				var yOffsetEnd = e.pageY;
				var yOffsetDelta = ViewModel.yOffsetDragStart - yOffsetEnd;
				console.log(yOffsetDelta);
				//ViewModel.yOffset = ViewModel.yOffsetOld + yOffsetDelta; //css calc failure fallback
				var percentageDelta = (yOffsetDelta/$(window).height()) * 100;
				var topScreenCalcPercentage = ViewModel.topScreenCalcPercentageOld - percentageDelta;
				var bottomScreenCalcPercentage = 100 - topScreenCalcPercentage;
				ViewModel.topScreenCalcPercentage = topScreenCalcPercentage;

				VerticalOffsetViewController.offsetCalc(topScreenCalcPercentage, bottomScreenCalcPercentage);
				LimitedViewController.limitedLayout();
	            ViewModel.poolViewController.fixPoolSize();
			}
		});
    
	}

	, offsetCalc : function ( topScreenPercentage, bottomScreenPercentage ) {
		if (topScreenPercentage != '' && bottomScreenPercentage != '') {
			var partialCalcString = "% - 14px";
			var topScreenCalc = topScreenPercentage + partialCalcString;
			var bottomScreenCalc = bottomScreenPercentage + partialCalcString;

			$('#top-screen').css( {
				'height': '-webkit-calc(' + topScreenCalc + ')'
				, 'height': '-moz-calc(' + topScreenCalc + ')'
				, 'height': 'calc(' + topScreenCalc + ')'
			} );

			$('#bottom-screen').css( {
				'height': '-webkit-calc(' + bottomScreenCalc + ')'
				, 'height': '-moz-calc(' + bottomScreenCalc + ')'
				, 'height': 'calc(' + bottomScreenCalc + ')'
			} );
		}
	}

}