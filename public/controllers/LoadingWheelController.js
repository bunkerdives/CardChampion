var LoadingWheelController = {
	
	settings : {
		
		'bgFilterImg' : 'none'
		, 'color' : '#333' 
		
	}
	
	, target : $("#loading")
	
	, start : function( filter ) {
		 
		if ( filter == "lighter") {
			this.settings.bgFilterImg = "url('/static/img/lighter-filter.png')";
			this.settings.color = '#333';
		} else if ( filter == "darker") {
			this.settings.bgFilterImg = "url('/static/img/darker-filter.png')";
			this.settings.color = '#fff';
		} else {
			this.settings.bgFilterImg = 'none';
			this.settings.color = '#333';
		}
		
		this.target.css('background-image', this.settings.bgFilterImg);
		
		this.target.show();
		 
		this.target.spin('color', this.settings.color);
		
	}
	
	, stop : function() { 
		
		this.target.spin(false);
		this.target.hide();
	}
	
};