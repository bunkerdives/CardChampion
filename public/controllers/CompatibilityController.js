var CompatibilityController = {
	
	css3CalcSupport : false
	
	, checkCss3Calc : function() {
		var test = $('html').hasClass('csscalc');
		if( test === true ) {
			this.css3CalcSupport = true;
		}
	}
	
}