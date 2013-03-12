var SplashViewModel = function() {
    
    this.showFoyer = function(layout){
        /*
        var context = new FoyerViewModel();
        ViewModel = context;
        var foyer = new ko.plugin( { template: "foyer", context: context } );
        ko.applyBindings( { plugin: foyer } );
        */
        window.location.replace('/foyer');
    };
    
};


ko.utils.extend( SplashViewModel.prototype, {
    
    init: function() {
        console.log("SplashViewModel init!")
		splashLayout();
		$("#imac-screenshot-1").fadeIn(1000);
    }
    
} ); 