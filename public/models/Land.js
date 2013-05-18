var Land = function( color ) {
    
    var name;
    var multiverse;
    
    switch( color ) {
        case 'W' :
            name = 'Plains';
            multiverse = '201972';
            break;
        case 'U' :
            name = 'Island';
            multiverse = '201964';
            break;
        case 'B' :
            name = 'Swamp';
            multiverse = '201978';
            break;
        case 'R' :
            name = 'Mountain';
            multiverse = '201967';
            break;
        case 'G' :
            name = 'Forest';
            multiverse = '201962';
    }
  
    this.name = name;
    this.rarity = 'C';
    this.type = 'Land';
    this.color = 'A';
    this.cost = '';
    this.cmc = '0';
    this.pt = '';
    this.multiverse = multiverse;
    
};