var ProfileDeckItemViewModel = function( cardWrapper ) {
    
    this.total = ko.observable( '' );
    this.name = ko.observable( '' );
    this.multiverse = ko.observable( '' );
	this.cardlink = ko.computed( function(){
		return ;
	}, this );
    
    this.imgUrl = ko.computed( function() {
        return "url('http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=" + this.multiverse() + "&type=card')";
    }, this );
    
    this.title = ko.computed( function() {
        return this.total() + 'x <a href="/card?multiverse=' + this.multiverse() + '" data-img="' + this.imgUrl() + '">' + this.name() + '</a>';
    }, this );
    
    this.initProfileDeckItem = function( cardWrapper ) {
        
        if( !cardWrapper ) {
            return;
        }
        
        this.total( cardWrapper.total );
        this.name( cardWrapper.card.name );
        this.multiverse( cardWrapper.card.multiverse );
        
    }
    
};