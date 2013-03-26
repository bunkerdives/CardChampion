
var DeckContainerModel = function( deckData ) {
    
    this.title = deckData.title;
    this.thumb = deckData.thumb;
    this.deckUrl = deckData.deckUrl;
    this.user = deckData.user;
    this.uuid = deckData.uuid;
    this.format = deckData.format;
    this.date = deckData.date;
    this.white = deckData.white;
    this.blue = deckData.blue;
    this.black = deckData.black;
    this.red = deckData.red;
    this.green = deckData.green;
    
};

module.exports = DeckContainerModel;