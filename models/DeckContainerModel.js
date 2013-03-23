
var DeckContainerModel = function( deckData ) {
    
  this.title = deckData.title;
  this.thumb = deckData.thumb;
  this.user = deckData.user;
  this.uuid = deckData.uuid;
  this.format = deckData.format;  
  this.colors = {
      white : deckData.white
      , blue : deckData.blue
      , black : deckData.black
      , red : deckData.red
      , green : deckData.green
  };
    
};

module.exports = DeckContainerModel;