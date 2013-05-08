var FoyerCardViewModel = function() {
	
	this.set = ko.observable('');
	this.setAbbr = ko.observable('');
	this.setTotal = ko.observable('');
	
    this.name = ko.observable('');
	this.rarity = ko.observable('');
	this.color = ko.observable('');
	this.cost = ko.observable('');
	this.cmc = ko.observable('');
	this.multiverse = ko.observable('');
	this.type = ko.observable('');
	this.pt = ko.observable('');
	this.cardnum = ko.observable('');
	
	this.raritySymbolVisible = ko.observable(false);
	this.rarityTextVisible = ko.observable(false);
	
	this.background = ko.computed( function(){
		return 'url(http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=' + this.multiverse() + '&type=card)';
	}, this);
	
	this.checklist = ko.computed( function(){
		return "[" + this.cardnum() + "/" + this.setTotal() + "]";
	}, this );
	
	this.rarityText = ko.observable('');
	
	this.raritySymbol = ko.computed( function(){
		return "http://gatherer.wizards.com/Handlers/Image.ashx?type=symbol&set=" + this.setAbbr() + "&size=medium&rarity=" + this.rarity();
	}, this );
	
	this.manaSymbols = ko.observableArray([]);
	
	this.initFoyerCardView = function( cardData, cardnum, set, setAbbr, setTotal ) {
		
		this.set( set );
		this.setAbbr( setAbbr );
		this.setTotal( setTotal );
		
		this.name( cardData.name );
		this.rarity( cardData.rarity );
		this.color( cardData.color );
		this.cost( cardData.cost );
		this.cmc( cardData.cmc );
		this.multiverse( cardData.multiverse );
		this.type( cardData.type );
		this.pt( cardData.pt );
		this.cardnum( cardnum );
		
		this.initRarity();
		
		this.setupManaCostSymbols();
		
	};
	
	this.initRarity = function() {
		
		switch( this.setAbbr() ) {
			case 'LEA':
				this.setupRarityText();
				break;
			case 'LEB':
				this.setupRarityText();
				break;
			default:
				this.setupRaritySymbol();
		}
		
	};
	
	this.setupRarityText = function(){
		
		this.rarityTextVisible(true);
		
		switch( this.rarity() ){
			case 'C':
				this.rarityText("Common");
				break;
			case 'U':
				this.rarityText("Uncommon");
				break;
			case 'R':
				this.rarityText("Rare");
				break;
			case 'M':
				this.rarityText("Mythic");
				break;
		}
		
	};
	
	this.setupManaCostSymbols = function(){
		
		// loop through each character in the mana cost string, and add the corresponding mana symbol to the observable array
		for( var i = 0; i < this.cost().length; ++i ) {
			var cost = this.cost().charAt(i);
			this.manaSymbols.push( {
				symbol : 'http://gatherer.wizards.com/Handlers/Image.ashx?size=medium&name=' + cost + '&type=symbol'
			} );
		}
	};
	
	this.setupRaritySymbol = function(){
		
		this.raritySymbolVisible(true);
		
		// modify the symbol links for some older sets
		switch( this.setAbbr() ) {
			case '1ED':
				this.setAbbr('1E');
				return;
			case '2ED':
				this.setAbbr('2E');
				return;
			case '3ED':
				this.setAbbr('3E');
				return;
			case '4ED':
				this.setAbbr('4E');
				return;
			case '5ED':
				this.setAbbr('5E');
				return;
			case '6ED':
				this.setAbbr('6E');
				return;
			case '7ED':
				this.setAbbr('7E');
				return;
			case 'ALL':
				this.setAbbr('AL');
				return;
			case 'APC':
				this.setAbbr('AP');
				return;
			case 'ARN':
				this.setAbbr('AR');
				return;
			case 'ATQ':
				this.setAbbr('AQ');
				return;
			case 'DRK':
				this.setAbbr('DK');
				return;
			case 'EXO':
				this.setAbbr('EX');
				return;
			case 'FEM':
				this.setAbbr('FE');
				return;
			case 'HML':
				this.setAbbr('HM');
				return;
			case 'ICE':
				this.setAbbr('IA');
				return;
			case 'INV':
				this.setAbbr('IN');
				return;
			case 'LEG':
				this.setAbbr('LE');
				return;
			case 'MIR':
				this.setAbbr('MI');
				return;
			case 'MMQ':
				this.setAbbr('MM');
				return;
			case 'NMS':
				this.setAbbr('NE');
				return;
			case 'ODY':
				this.setAbbr('OD');
				return;
			case 'PCY':
				this.setAbbr('PR');
				return;
			case 'PLS':
				this.setAbbr('PS');
				return;
			case 'STH':
				this.setAbbr('ST');
				return;
			case 'TMP':
				this.setAbbr('TE');
				return;
			case 'UDS':
				this.setAbbr('CG');
				return;
			case 'ULG':
				this.setAbbr('GU');
				return;
			case 'USG':
				this.setAbbr('UZ');
				return;
			case 'VIS':
				this.setAbbr('VI');
				return;
			case 'WTH':
				this.setAbbr('WL');
				return;
		}
		
	};
	
};