var CardViewModel = function( cardData ) {
    
    this.name = cardData.name;
    this.rarity = cardData.rarity;
    this.type = cardData.type;
    this.color = cardData.color;
    this.cost = cardData.cost;
    this.cmc = cardData.cmc;
    this.multiverse = cardData.multiverse;
    this.pt = cardData.pt;
    
}