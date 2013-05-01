var LoadingWheelController = {
	
    bgFilterImg : 'none'
    
    , color : "#333"
	
	, target : $("#loading")
	
	, start : function( filter ) {
		 
		if( filter == 'lighter' ) {
			this.bgFilterImg = "url('/static/img/lighter-filter.png')";
			this.color = '#333';
		} else if ( filter == "darker" ) {
			this.bgFilterImg = "url('/static/img/darker-filter.png')";
			this.color = '#fff';
		}
		
		this.target.css( 'background-image', this.bgFilterImg );
		this.target.show();
		this.target.spin( 'color', this.color );
		
	}
	
	, stop : function() {
		this.target.spin( false );
		this.target.hide();
		this.bgFilterImg = 'none';
		this.color = '#333';
	}
	
};