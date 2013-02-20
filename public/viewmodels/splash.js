var SplashViewModel = {
    
    showFoyer : function(layout){
        var context = new FoyerViewModel();
        var foyer = new ko.plugin( { template: "foyer", context: context } );
        ko.applyBindings( { plugin: foyer } );
        context.init();
    }
    
};