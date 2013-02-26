var CardViewModel = function( cardData ) {
    
    this.name = cardData.name;
    this.rarity = cardData.rarity;
    this.type = cardData.type;
    this.color = cardData.color;
    this.cost = cardData.cost;
    this.cmc = cardData.cmc;
    this.pt = cardData.pt;
    this.multiverse = cardData.multiverse;
    this.imgSrc = ko.computed( function(){
        return 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid='
        + this.multiverse
        + '&type=card';
    }, this);
    
    this.cardZoom = function( view ) {
        console.log( "cardZoom" );
        
        var url = 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid='
        + this.multiverse
        + '&type=card';
        
        view.imgSrc( url );
    }
    
}