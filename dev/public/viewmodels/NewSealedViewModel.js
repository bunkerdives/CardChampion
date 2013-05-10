var NewSealedViewModel = function() {
    
    this.set = 'DGM';
    this.selectedSet = "DGM";
    
    this.startSealed = function() {
        var redirect = '/sealed?set=' + this.set;
        window.location.href = redirect;
    };
    
    this.setQueues = ko.observableArray( [
		new setQueue( "Dragon's Maze", "DGM", this )
        , new setQueue( "Gatecrash", "GTC", this )
        , new setQueue( "Return to Ravnica", "RTR", this )
        , new setQueue( "Magic 2013", "M13", this )
        , new setQueue( "Avacyn Restored", "AVR", this )
        , new setQueue( "Dark Ascension", "DKA", this )
        , new setQueue( "Innistrad", "ISD", this )
        , new setQueue( "Magic 2012", "M12", this )
        , new setQueue( "New Phyrexia", "NPH", this )
        , new setQueue( "Mirrodin Besieged", "MBS", this )
        , new setQueue( "Scars of Mirrodin", "SOM", this )
        , new setQueue( "Magic 2011", "M11", this )
        , new setQueue( "Rise of the Eldrazi", "ROE", this )
        , new setQueue( "Worldwake", "WWK", this )
        , new setQueue( "Zendikar", "ZEN", this )
        , new setQueue( "Magic 2010", "M10", this )
        , new setQueue( "Alara Reborn", "ARB", this )
        , new setQueue( "Conflux", "CON", this )
        , new setQueue( "Shards of Alara", "ALA", this )
        , new setQueue( "Eventide", "EVE", this )
        , new setQueue( "Shadowmoor", "SHM", this )
        , new setQueue( "Morningtide", "MOR", this )
        , new setQueue( "Lorwyn", "LRW", this )
        , new setQueue( "Core Set: Tenth Edition", "10E", "0/8" )
        , new setQueue( "Future Sight", "FUT", this )
        , new setQueue( "Planar Chaos", "PLC", this )
        , new setQueue( "Time Spiral", "TSP", this )
        , new setQueue( "Dissension", "DIS", this )
        , new setQueue( "Guildpact", "GPT", this )
        , new setQueue( "Ravnica: City of Guilds", "RAV", this )
        , new setQueue( "Core Set: Ninth Edition", "9ED", this )
        , new setQueue( "Saviors of Kamigawa", "SOK", this )
        , new setQueue( "Betrayers of Kamigawa", "BOK", this )
        , new setQueue( "Champions of Kamigawa", "CHK", this )
        , new setQueue( "Fifth Dawn", "5DN", this )
        , new setQueue( "Darksteel", "DST", this )
        , new setQueue( "Mirrodin", "MRD", this )
        , new setQueue( "Core Set: Eighth Edition", "8ED", this )
        , new setQueue( "Scourge", "SCG", this )
        , new setQueue( "Legions", "LGN", this )
        , new setQueue( "Onslaught", "ONS", this )
        , new setQueue( "Judgment", "JUD", this )
        , new setQueue( "Torment", "TOR", this )
        , new setQueue( "Odyssey", "ODY", this )
        , new setQueue( "Seventh Edition", "7ED", this )
        , new setQueue( "Apocalypse", "APC", this )
        , new setQueue( "Planeshift", "PLS", this )
        , new setQueue( "Invasion", "INV", this )
        , new setQueue( "Prophecy", "PCY", this )
        , new setQueue( "Nemesis", "NMS", this )
        , new setQueue( "Mercadian Masques", "MMQ", this )
        , new setQueue( "Classic Sixth Edition", "6ED", this )
        , new setQueue( "Urza's Destiny", "UDS", this )
        , new setQueue( "Urza's Legacy", "ULG", this )
        , new setQueue( "Urza's Saga", "USG", this )
        , new setQueue( "Exodus", "EXO", this )
        , new setQueue( "Stronghold", "STH", this )
        , new setQueue( "Tempest", "TMP", this )
        , new setQueue( "Fifth Edition", "5ED", this )
        , new setQueue( "Weatherlight", "WTH", this )
        , new setQueue( "Visions", "VIS", this )
        , new setQueue( "Mirage", "MIR", this )
        , new setQueue( "Coldsnap", "CSP", this )
        , new setQueue( "Alliances", "ALL", this )
        , new setQueue( "Ice Age", "ICE", this )
        , new setQueue( "Fourth Edition", "4ED", this )
        , new setQueue( "Homelands", "HML", this )
        , new setQueue( "Fallen Empires", "FEM", this )
        , new setQueue( "The Dark", "DRK", this )
        , new setQueue( "Legends", "LEG", this )
        , new setQueue( "Revised Edition", "3ED", this )
        , new setQueue( "Antiquities", "ATQ", this )
        , new setQueue( "Arabian Nights", "ARN", this )
        , new setQueue( "Unlimited", "2ED", this )
        , new setQueue( "Limited Edition Beta", "LEB", this )
        , new setQueue( "Limited Edition Alpha", "LEA", this )
    ] );
    
};


var setQueue = function( name, abbr, foyer ) {
    
    this.title = name + " (" + abbr + ")";
    this.abbr = abbr;
    this.foyer = foyer || '';
    
    this.selectSet = function( data, event ) {
        var ele = event.target;
        if( this.foyer.selectedSet != null ) {
            $(this.foyer.selectedSet).parent().removeClass("success");
        }
        $(ele).parent().addClass("success");
        foyer.selectedSet = ele;
        foyer.set = this.abbr;
    }
    
};