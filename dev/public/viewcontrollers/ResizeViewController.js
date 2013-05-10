var ResizeViewController = {
	
	templateCases : {
		'Foyer' : function() { ResizeViewController.foyerResize() }
		, 'Builder' : function() { ResizeViewController.builderResize() }
		, 'Sealed' : function() { ResizeViewController.sealedResize() }
	}
	
	, templateSwitch : function() {
		
		var currentTemplate = this.templateCases[ ViewModel.viewName ];
		
		if( currentTemplate ) { 
			currentTemplate();
		} else {
			console.log('Error: Template name not recognized by ResizeViewController.templateSwitch().');
		}
		
		if( currentTemplate != 'Splash' ) {
			BackgroundController.setBackgroundImage();
		}
		
		//TODO Create HeaderViewController
		var headerExists = $("#header").css("display");
		if (headerExists=="block") {
			headerLayout();
		}
		
		if( LightboxController.isVisible ) {
			//TODO Finish cleaning up LightboxController
			LightboxController.positionLightbox();
		}
		
	}
	
	, foyerResize : function() {
		FoyerViewController.profileLayout(); //TODO Should only be called if profile is showing
	}
	
	, builderResize : function() {
		builderLayout();
	}
	
	, sealedResize : function() {
		limitedLayout();
	}
	
}

$(window).resize( function(){
	ResizeViewController.templateSwitch();
} );