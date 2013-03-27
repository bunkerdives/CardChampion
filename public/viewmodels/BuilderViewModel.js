var BuilderViewModel = function() {
    
    this.imgSrc = ko.observable( '/static/img/cardback.jpg' );
    
};



ko.utils.extend( BuilderViewModel.prototype, {
    
    init: function( element, valueAccessor, allBindingsAccessor ) {
        
        builderLayout();
		
		builderTypeahead();
		
        
    }
    
} );