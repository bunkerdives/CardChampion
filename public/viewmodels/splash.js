var SplashViewModel = function() {
    
    this.showFoyer = function(layout){
        var context = new FoyerViewModel();
        var foyer = new ko.plugin( { template: "foyer", context: context } );
        ko.applyBindings( { plugin: foyer } );
    };
    
};

ko.utils.extend( SplashViewModel.prototype, {
    init: function(){
        console.log("SplashViewModel init");
    }
} );