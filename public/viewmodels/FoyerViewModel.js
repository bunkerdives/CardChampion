var FoyerViewModel = function( ) {
    
    this.set = null;
    
    this.selectedSet = "GTC";
    
    this.startSealed = function( ) {
        
        var context = new SealedViewModel( this.selectedSet );
        context.newSealedInstance();
        
        ViewModel = context;
        
        var sealed = new ko.plugin( { template: "limited", context: context } );
        ko.applyBindings( { plugin: sealed } );
        
    };
    
    this.setQueues = ko.observableArray( [
        new setQueue( "Gatecrash", "GTC", "0/8" )
        , new setQueue( "Return to Ravnica", "RTR", "0/8" )
        , new setQueue( "Magic 2013", "M13", "0/8" )
        , new setQueue( "Avacyn Restored", "AVR", "0/8" )
        , new setQueue( "Dark Ascension", "DKA", "0/8" )
        , new setQueue( "Innistrad", "ISD", "0/8" )
        , new setQueue( "Magic 2012", "M12", "0/8" )
        , new setQueue( "New Phyrexia", "NPH", "0/8" )
        , new setQueue( "Mirrodin Besieged", "MBS", "0/8" )
        , new setQueue( "Scars of Mirrodin", "SOM", "0/8" )
        , new setQueue( "Magic 2011", "M11", "0/8" )
        , new setQueue( "Rise of the Eldrazi", "ROE", "0/8" )
        , new setQueue( "Worldwake", "WWK", "0/8" )
        , new setQueue( "Zendikar", "ZEN", "0/8" )
        , new setQueue( "Magic 2010", "M10", "0/8" )
        , new setQueue( "Alara Reborn", "ARB", "0/8" )
        , new setQueue( "Conflux", "CON", "0/8" )
        , new setQueue( "Shards of Alara", "ALA", "0/8" )
        , new setQueue( "Eventide", "EVE", "0/8" )
        , new setQueue( "Shadowmoor", "SHM", "0/8" )
        , new setQueue( "Morningtide", "MOR", "0/8" )
        , new setQueue( "Lorwyn", "LRW", "0/8" )
        , new setQueue( "Core Set: Tenth Edition", "10E", "0/8" )
        , new setQueue( "Future Sight", "FUT", "0/8" )
        , new setQueue( "Planar Chaos", "PLC", "0/8" )
        , new setQueue( "Time Spiral", "TSP", "0/8" )
        , new setQueue( "Dissension", "DIS", "0/8" )
        , new setQueue( "Guildpact", "GPT", "0/8" )
        , new setQueue( "Ravnica: City of Guilds", "RAV", "0/8" )
        , new setQueue( "Core Set: Ninth Edition", "9ED", "0/8" )
        , new setQueue( "Saviors of Kamigawa", "SOK", "0/8" )
        , new setQueue( "Betrayers of Kamigawa", "BOK", "0/8" )
        , new setQueue( "Champions of Kamigawa", "CHK", "0/8" )
        , new setQueue( "Fifth Dawn", "5DN", "0/8" )
        , new setQueue( "Darksteel", "DST", "0/8" )
        , new setQueue( "Mirrodin", "MRD", "0/8" )
        , new setQueue( "Core Set: Eighth Edition", "8ED", "0/8" )
        , new setQueue( "Scourge", "SCG", "0/8" )
        , new setQueue( "Legions", "LGN", "0/8" )
        , new setQueue( "Onslaught", "ONS", "0/8" )
        , new setQueue( "Judgment", "JUD", "0/8" )
        , new setQueue( "Torment", "TOR", "0/8" )
        , new setQueue( "Odyssey", "ODY", "0/8" )
        , new setQueue( "Seventh Edition", "7ED", "0/8" )
        , new setQueue( "Apocalypse", "APC", "0/8" )
        , new setQueue( "Planeshift", "PLS", "0/8" )
        , new setQueue( "Invasion", "INV", "0/8" )
        , new setQueue( "Prophecy", "PCY", "0/8" )
        , new setQueue( "Nemesis", "NMS", "0/8" )
        , new setQueue( "Mercadian Masques", "MMQ", "0/8" )
        , new setQueue( "Classic Sixth Edition", "6ED", "0/8" )
        , new setQueue( "Urza's Destiny", "UDS", "0/8" )
        , new setQueue( "Urza's Legacy", "ULG", "0/8" )
        , new setQueue( "Urza's Saga", "USG", "0/8" )
        , new setQueue( "Exodus", "EXO", "0/8" )
        , new setQueue( "Stronghold", "STH", "0/8" )
        , new setQueue( "Tempest", "TMP", "0/8" )
        , new setQueue( "Fifth Edition", "5ED", "0/8" )
        , new setQueue( "Weatherlight", "WTH", "0/8" )
        , new setQueue( "Visions", "VIS", "0/8" )
        , new setQueue( "Mirage", "MIR", "0/8" )
        , new setQueue( "Coldsnap", "CSP", "0/8" )
        , new setQueue( "Alliances", "ALL", "0/8" )
        , new setQueue( "Ice Age", "ICE", "0/8" )
        , new setQueue( "Fourth Edition", "4ED", "0/8" )
        , new setQueue( "Homelands", "HML", "0/8" )
        , new setQueue( "Fallen Empires", "FEM", "0/8" )
        , new setQueue( "The Dark", "DRK", "0/8" )
        , new setQueue( "Legends", "LEG", "0/8" )
        , new setQueue( "Revised Edition", "3ED", "0/8" )
        , new setQueue( "Antiquities", "ATQ", "0/8" )
        , new setQueue( "Arabian Nights", "ARN", "0/8" )
        , new setQueue( "Unlimited", "2ED", "0/8" )
        , new setQueue( "Limited Edition Beta", "LEB", "0/8" )
        , new setQueue( "Limited Edition Alpha", "LEA", "0/8" )
    ] );
    
};

var setQueue = function( name, abbr, size ) {
    
    this.title = name + " (" + abbr + ")";
    this.size = size;
    
    this.selectSet = function( data, event ) {
        var ele = event.target;
        if( parent.selectedSet != null ) {
            $(parent.selectedSet).parent().removeClass("success");
        }
        $(ele).parent().addClass("success");
        parent.selectedSet = ele;
    }
    
};

ko.utils.extend( FoyerViewModel.prototype, {
    init: function(){
        foyerLayout();
				navEvents();
				$('#foyer-link-1').off();
				$('#foyer-banner').animate({'background-position-y':'-550px'},3200);
				$("#open").css("display", "block");
				$("body").css("background-color", "#2f2f2f");
    }
    
} );