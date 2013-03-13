var FoyerViewModel = function() {
    
    this.set = 'GTC';
    this.selectedSet = "GTC";
    this.socket = '';
    
    this.profileVisible = ko.observable( true );
    this.aboutVisible = ko.observable( false );
    this.newEventVisible = ko.observable( false );
    this.joinDraftVisible = ko.observable( false );
    
    this.startSealed = function() {
        
        /*
        var context = new SealedViewModel( this.selectedSet );
        context.newSealedInstance();
        
        ViewModel = context;
        
        var sealed = new ko.plugin( { template: "limited", context: context } );
        ko.applyBindings( { plugin: sealed } );
        */
        
        var redirect = '/sealed?set=' + this.set;
        window.location.href = redirect;
        
    };
    
    this.sendChatMsg = function() {
        
        // get the user's message
        var newChat = $("#chat-msg").val();
        
        //socket.emit()
        
    };

    this.setBackgroundImage = function() {
        
        var ran = Math.floor( Math.random() * ViewModel.backgroundImages.length );
        
        $("#foyer").css( {
            'background-image' : 'url(' + ViewModel.backgroundImages[ran] + ')'
            , 'background-attachment' : 'fixed'
            , 'background-position' : '-50px -50px'
            , 'background-repeat' : 'no-repeat'
        } );
        
    };
    
    this.setAnimatedBanner = function() {
        
        ViewModel.bannerId += 1;
        if( ViewModel.bannerId >= ViewModel.bannerImages.length ){
            ViewModel.bannerId = 0;
        }
        
        var banner = 'url(' + ViewModel.bannerImages[ ViewModel.bannerId ] + ')';
        $('#foyer-banner').css( {
            'height' : '150px'
            , 'background-color' : '#5d5d5d'
            , "background-image" : banner
            , 'background-position' : '0px -250px'
        } );
        
        $('#foyer-banner').animate(
            { 'background-position-y' : '-550px' }
            , 12400
            , function() {
                setTimeout( ViewModel.setAnimatedBanner, 8600 );
            }
        );
    };
    
    this.setQueues = ko.observableArray( [
        new setQueue( "Gatecrash", "GTC", "0/8", this )
        , new setQueue( "Return to Ravnica", "RTR", "0/8", this )
        , new setQueue( "Magic 2013", "M13", "0/8", this )
        , new setQueue( "Avacyn Restored", "AVR", "0/8", this )
        , new setQueue( "Dark Ascension", "DKA", "0/8", this )
        , new setQueue( "Innistrad", "ISD", "0/8", this )
        , new setQueue( "Magic 2012", "M12", "0/8", this )
        , new setQueue( "New Phyrexia", "NPH", "0/8", this )
        , new setQueue( "Mirrodin Besieged", "MBS", "0/8", this )
        , new setQueue( "Scars of Mirrodin", "SOM", "0/8", this )
        , new setQueue( "Magic 2011", "M11", "0/8", this )
        , new setQueue( "Rise of the Eldrazi", "ROE", "0/8", this )
        , new setQueue( "Worldwake", "WWK", "0/8", this )
        , new setQueue( "Zendikar", "ZEN", "0/8", this )
        , new setQueue( "Magic 2010", "M10", "0/8", this )
        , new setQueue( "Alara Reborn", "ARB", "0/8", this )
        , new setQueue( "Conflux", "CON", "0/8", this )
        , new setQueue( "Shards of Alara", "ALA", "0/8", this )
        , new setQueue( "Eventide", "EVE", "0/8", this )
        , new setQueue( "Shadowmoor", "SHM", "0/8", this )
        , new setQueue( "Morningtide", "MOR", "0/8", this )
        , new setQueue( "Lorwyn", "LRW", "0/8", this )
        , new setQueue( "Core Set: Tenth Edition", "10E", "0/8" )
        , new setQueue( "Future Sight", "FUT", "0/8", this )
        , new setQueue( "Planar Chaos", "PLC", "0/8", this )
        , new setQueue( "Time Spiral", "TSP", "0/8", this )
        , new setQueue( "Dissension", "DIS", "0/8", this )
        , new setQueue( "Guildpact", "GPT", "0/8", this )
        , new setQueue( "Ravnica: City of Guilds", "RAV", "0/8", this )
        , new setQueue( "Core Set: Ninth Edition", "9ED", "0/8", this )
        , new setQueue( "Saviors of Kamigawa", "SOK", "0/8", this )
        , new setQueue( "Betrayers of Kamigawa", "BOK", "0/8", this )
        , new setQueue( "Champions of Kamigawa", "CHK", "0/8", this )
        , new setQueue( "Fifth Dawn", "5DN", "0/8", this )
        , new setQueue( "Darksteel", "DST", "0/8", this )
        , new setQueue( "Mirrodin", "MRD", "0/8", this )
        , new setQueue( "Core Set: Eighth Edition", "8ED", "0/8", this )
        , new setQueue( "Scourge", "SCG", "0/8", this )
        , new setQueue( "Legions", "LGN", "0/8", this )
        , new setQueue( "Onslaught", "ONS", "0/8", this )
        , new setQueue( "Judgment", "JUD", "0/8", this )
        , new setQueue( "Torment", "TOR", "0/8", this )
        , new setQueue( "Odyssey", "ODY", "0/8", this )
        , new setQueue( "Seventh Edition", "7ED", "0/8", this )
        , new setQueue( "Apocalypse", "APC", "0/8", this )
        , new setQueue( "Planeshift", "PLS", "0/8", this )
        , new setQueue( "Invasion", "INV", "0/8", this )
        , new setQueue( "Prophecy", "PCY", "0/8", this )
        , new setQueue( "Nemesis", "NMS", "0/8", this )
        , new setQueue( "Mercadian Masques", "MMQ", "0/8", this )
        , new setQueue( "Classic Sixth Edition", "6ED", "0/8", this )
        , new setQueue( "Urza's Destiny", "UDS", "0/8", this )
        , new setQueue( "Urza's Legacy", "ULG", "0/8", this )
        , new setQueue( "Urza's Saga", "USG", "0/8", this )
        , new setQueue( "Exodus", "EXO", "0/8", this )
        , new setQueue( "Stronghold", "STH", "0/8", this )
        , new setQueue( "Tempest", "TMP", "0/8", this )
        , new setQueue( "Fifth Edition", "5ED", "0/8", this )
        , new setQueue( "Weatherlight", "WTH", "0/8", this )
        , new setQueue( "Visions", "VIS", "0/8", this )
        , new setQueue( "Mirage", "MIR", "0/8", this )
        , new setQueue( "Coldsnap", "CSP", "0/8", this )
        , new setQueue( "Alliances", "ALL", "0/8", this )
        , new setQueue( "Ice Age", "ICE", "0/8", this )
        , new setQueue( "Fourth Edition", "4ED", "0/8", this )
        , new setQueue( "Homelands", "HML", "0/8", this )
        , new setQueue( "Fallen Empires", "FEM", "0/8", this )
        , new setQueue( "The Dark", "DRK", "0/8", this )
        , new setQueue( "Legends", "LEG", "0/8", this )
        , new setQueue( "Revised Edition", "3ED", "0/8", this )
        , new setQueue( "Antiquities", "ATQ", "0/8", this )
        , new setQueue( "Arabian Nights", "ARN", "0/8", this )
        , new setQueue( "Unlimited", "2ED", "0/8", this )
        , new setQueue( "Limited Edition Beta", "LEB", "0/8", this )
        , new setQueue( "Limited Edition Alpha", "LEA", "0/8", this )
    ] );
    
    this.backgroundImages = [
        'http://media.wizards.com/images/magic/daily/wallpapers/AVR_2_1920x1080_Wallpaper_yf5p1yzptx.jpg'
        , 'http://media.wizards.com/images/magic/daily/wallpapers/Moat_MTGOweek_1920x1080_Wallpaper.jpg'
    ];
    
    this.bannerId = 0;
    this.bannerImages = [
        'http://media.wizards.com/images/magic/daily/wallpapers/Nice_Holiday_1280x960_Wallpaper.jpg'
        , 'http://media.wizards.com/images/magic/tcg/products/m12/wp_dragon_xhdn52rl3i_1280x960.jpg'
        , 'http://media.wizards.com/images/magic/daily/wallpapers/wp_chainlightning_1280x960.jpg'
    ];
    
};

var setQueue = function( name, abbr, size, foyer ) {
    
    this.title = name + " (" + abbr + ")";
    this.size = size;
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


ko.utils.extend( FoyerViewModel.prototype, {
    
    init: function() {
	    foyerInit();
        
        console.log("FoyerViewModel init!")
        
      ViewModel.setBackgroundImage();
      ViewModel.setAnimatedBanner();
      
      var socket = io.connect('http://localhost');
      
      socket.on( "connect", function() {
          socket.emit( 'joinChat', JSON.stringify({ room : 'generalChat' }) );
      } );
      
      socket.on( "newChat", function(data) {
          console.log("new chat: " + data);
      } );
      
      ViewModel.socket = socket;
        
    }
    
} );