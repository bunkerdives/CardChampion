ko.plugin = function( configuration ) {
    this.template = configuration.template || '';
    this.context = configuration.context || '';
};

ko.bindingHandlers.plugin = {
    
    update: function( element, valueAccessor, allBindingsAccessor ) {

        element = $(element);
        element.html('<div id="templateContainer"></div>');

        var viewModel = valueAccessor();
        ko.renderTemplate( viewModel.template, viewModel.context, {
        	afterRender: function(renderedElement){
        		viewModel.context.init();
        	}
        }, element.children('#templateContainer'), 'replaceNode' );
		
		/*
		ko.renderTemplate( TemplateOptions.template, TemplateOptions.context, {
        	afterRender: function(renderedElement){
        		TemplateOptions.context.init();
        	}
		}, element.children('#templateContainer'), 'replaceNode');
		*/
	}
    
};