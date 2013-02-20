var FoyerViewModel = function() {
    
    this.setQueues = ko.observableArray( [
        {
          "setName" : "Gatecrash (GTC)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Return to Ravnica (RTR)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Magic 2013 (M13)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Avacyn Restored (AVR)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Dark Ascension (DKA)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Innistrad (ISD)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Magic 2012 (M12)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "New Phyrexia (NPH)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Mirrodin Besieged (MBS)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Scars of Mirrodin (SOM)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Magic 2011 (M11)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Rise of the Eldrazi (ROE)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Worldwake (WWK)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Zendikar (ZEN)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Magic 2010 (M10)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Alara Reborn (ARB)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Conflux (CON)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Shards of Alara (ALA)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Eventide (EVE)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Shadowmoor (SHM)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Morningtide (MOR)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Lorwyn (LRW)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Core Set: Tenth Edition (10E)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Future Sight (FUT)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Planar Chaos (PLC)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Time Spiral (TSP)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Dissension (DIS)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Guildpact (GPT)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Ravnica: City of Guilds (RAV)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Core Set: Ninth Edition (9ED)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Saviors of Kamigawa (SOK)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Betrayers of Kamigawa (BOK)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Champions of Kamigawa (CHK)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Fifth Dawn (5DN)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Darksteel (DST)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Mirrodin (MRD)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Core Set: Eighth Edition (8ED)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Scourge (SCG)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Legions (LGN)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Onslaught (ONS)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Judgment (JUD)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Torment (TOR)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Odyssey (ODY)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Seventh Edition (7ED)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Apocalypse (APC)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Planeshift (PLS)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Invasion (INV)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Prophecy (PCY)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Nemesis (NMS)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Mercadian Masques (MMQ)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Classic Sixth Edition (6ED)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Urza's Destiny (UDS)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Urza's Legacy (ULG)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Urza's Saga (USG)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Exodus (EXO)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Stronghold (STH)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Tempest (TMP)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Fifth Edition (5ED)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Weatherlight (WTH)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Visions (VIS)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Mirage (MIR)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Coldsnap (CSP)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Alliances (ALL)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Ice Age (ICE)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Fourth Edition (4ED)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Homelands (HML)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Fallen Empires (FEM)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "The Dark (DRK)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Legends (LEG)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Revised Edition (3ED)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Antiquities (ATQ)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Arabian Nights (ARN)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Unlimited (2ED)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Limited Edition Beta (LEB)"
          , "queueSize" : "0/8"
        }, {
          "setName" : "Limited Edition Alpha (LEA)"
          , "queueSize" : "0/8"
        }
    ] )
    
};

ko.utils.extend( FoyerViewModel.prototype, {
    init: function(){
        console.log("FoyerSetList init")
    }
} );