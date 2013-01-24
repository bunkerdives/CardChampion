Draft = {

    // the open socket connection to the server
    socket : null
    
    // is the user still deciding on their pick?
    , choosing : true
    
    , timer_min : 1
    
    , timer_sec : 30
    
    // a list of the user's picks
    , picks : []
    
    // the booster pack the user is currently viewing
    , curBooster : []
    
    // a queue of boosters from the server, in case any come before user is done picking
    , newBoosterQueue : []
    
    , highlight : -1
    
    , curPack : []
    
    , boosters : []
    
    , picknum : 0
    
    , numPickRows : 1
    
    , colSize : [
        0
        , 0
        , 0
        , 0
        , 0
        , 0
        , 0
        , 0
        , 0
        , 0
    ]

    // startDraft(data, socket) - handles the Start Draft event by showing
    // the draft UI with the first booster pack, and registers all future
    // socket event handlers
    , startDraft : function(data, socket) {
        
        var body = $.parseJSON(data);
        var booster = body['booster'];
        
        console.log("The draft started!");
        console.log( "New booster: " + booster )
    
        // hide the lobby and show the draft screen
        Draft.showDraftInterface();
        
        // add the cards in the new pack to the interface
        Draft.addPackToUI( booster );
        
        // hold onto the open socket
        Draft.socket = socket;
        
        // add a handler to listen for the NewBooster socket event
        socket.on( 'NewBooster', function(booster) {
            Draft.addPackToUI( $.parseJSON(booster) );
        });
        
        // add a handler to listen for the PackPass socket event
        socket.on( 'PackPass', function(cards) {
            Draft.takePack( cards );
        } );
        
        // add a handler to listen for the EndDraft socket event
        socket.on( 'EndDraft', function(picks) {
            Draft.endDraft( $.parseJSON(picks) );
        } );

    }
    
    , pickCard : function(event){
        
        var pick_id = event.data.id;
        var pick_img = GTC.card_data[ pick_id ].img;
        
        Draft.picknum += 1;
        
        // add the card to the our list of picks
        Draft.picks.push( pick_id );
        
        // remove the cards from the pack UI
        Draft.removeAllFromPackUI();
        
        // deselect the card if it was already highlighted
        Draft.delightCard( event.data.slot );
        
        // add the card to the pick UI
        Draft.addCardToPickUI( pick_id );
        
        // send the client's pick to the server with a PickCard socket event
        var data = JSON.stringify( { 'pick' : pick_id } );
        Draft.socket.emit( 'CardPick', data );
        
        // mark that the user is done choosing
        Draft.choosing = false;
        
        // if there is a new booster already in our queue, display it for the user
        if( Draft.newBoosterQueue.length > 0 ){
            Draft.choosing = true;
            Draft.addPackToUI( Draft.newBoosterQueue.shift() );
        }
        
    }
    
    , takePack : function( data ) {
        
        var body = $.parseJSON(data);
        var pack = body['booster'];
        
        console.log("Taking the pack: " + pack)
    
        // add the booster the server passed us to our queue
        Draft.newBoosterQueue.push( pack );
        
        // if the user is done with the last pack, display the cards and reset the timer
        if( Draft.choosing == false ){
            Draft.choosing = true;
            Draft.addPackToUI( Draft.newBoosterQueue.shift() );
        }
        
    }
    
    , autoPick : function() {
        
    }
    
    // TODO switch to the deck building view, and give it's controller the pick list
    , endDraft : function(picks) {
        
    }

    , showDraftInterface : function(data){
        
 		// untoggle visibility of the lobby interface
      	$("#foyer").css( "display", "none" );
		  
		// toggle visibility of the draft interface
		$('#draft').css( "display", "block" );
        
    }
    
    , addPackToUI : function( pack ) {
        
        console.log("addPackToUI adding pack " + pack + " to the UI")
        
        // assign the pack as our currently held pack
        Draft.curPack = pack;
        
        // replace the images in the pack UI with the new pack images
        for( var i = 1; i < 15 - Draft.picknum; ++i ){
            var id = pack[ i - 1 ];
            console.log("Getting image for card " + id );
            var img = GTC.card_data[ id ].img;
            $( "#pack-card-" + i ).css( "background-image", 'url(' + img + ')' );
            $( "#pack-card-" + i ).css( "display", "block" );
            $( "#pack-card-" + i ).off( 'click' );
            $( "#pack-card-" + i ).off( 'dblclick' );
            $( "#pack-card-" + i ).off( 'mouseover' );
            $( "#pack-card-" + i ).click( {'id':id,'slot':i}, Draft.highlightCard );
            $( "#pack-card-" + i ).dblclick( { 'id' : id }, Draft.pickCard );
            $( "#pack-card-" + i ).on( 'mouseover', { 'id' : id }, Draft.cardZoom );
        }
        for( ; i < 15; ++i ){
            $( "#pack-card-" + i ).css( "background-image", 'none' );
            $( "#pack-card-" + i ).off( 'click' );
            $( "#pack-card-" + i ).off( 'dblclick' );
            $( "#pack-card-" + i ).off( 'mouseover' );
        }
        
    }
    
    // removeAllFromPackUI() - remove all cards from the pack UI
    , removeAllFromPackUI : function() {
    
        for( var i = 1; i < 15; ++i ){
            var id = Draft.curPack[ i - 1 ];
            var img = GTC.card_data[ id ].img;
            $( "#pack-card-" + i ).css( "background-image", 'none' );
            $( "#pack-card-" + i ).off( 'click' );
            $( "#pack-card-" + i ).off( 'dblclick' );
            $( "#pack-card-" + i ).off( 'mouseover' );
        }
        
    }
    
    , addCardToPickUI : function( pick_id ) {
        
        // get the converted mana cost of the card (count from 1 for now)
        var cmc = GTC.card_data[ pick_id ].cmc;
        var idx = Draft.colSize[ cmc ];
        
        // if the card needs a new row for insertion, create a new row and append it to #pick-table
        if( idx >= Draft.numPickRows ){
            
            var row = $('<div>').addClass("row-fluid").addClass("less-space").attr("id", "row" + idx);
            $("#pick-table").append(row);
            
            for( var i = 0; i < 10; ++i ){
                
                var img = $("<img>").attr("src", "/img/transparent.png");
                var col = $("<div>");
                col.attr("id", "pick-card-" + idx + "-" + i).addClass("span1").addClass("stack").addClass("rounded");
                col.append( img );
                $(row).append( col );
            
            }
            
            Draft.resizeRow( idx );
            ++ Draft.numPickRows;
            
        }
        
        ++ Draft.colSize[ cmc ];
        
        var pick_img = GTC.card_data[ pick_id ].img;
        $( "#pick-card-" + idx + "-" + cmc ).css( "background-image", 'url(' + pick_img + ')' );
        $( "#pick-card-" + idx + "-" + cmc ).css( "display", "block" );
        $( "#pick-card-" + idx + "-" + cmc ).on( 'mouseover', { 'id' : pick_id }, Draft.cardZoom );
        
        
    }
    
    , highlightCard : function(event){
        
        var slot = event.data.slot;
        
        // remove the existing highlight
        if( Draft.highlight > 0 ){
            $( "#pack-card-" + Draft.highlight ).removeClass("select");
        }
        
        $( "#pack-card-" + slot ).addClass("select");
        
        Draft.highlight = slot;
        
    }
    
    , delightCard : function( slot ) {
        if( slot == Draft.highlight ){
            $( "#pack-card-" + Draft.highlight ).removeClass("select");
            Draft.highlight = -1;
        }
    }
    
    , cardZoom : function(event) {
        
        var id = event.data.id;
        var img = GTC.card_data[ id ].img;
        $("#preview-src").attr( 'src', "" );
        $("#preview").css( "background-image", 'url(' + img + ')' );
        
    }
    
    , startTimer : function(min, sec){
        
        Draft.min = min;
        Draft.sec = sec;
        
        // Display the time on the clock
        $("#timer").html( min + ":" + sec);
        
        var timer = setInterval( Draft.timerFired, 1000 );
        
    }
    
    , timerFired : function(){
        
        Draft.sec -= 1;
        
        if( Draft.sec == -1 ){
            Draft.min -= 1;
            Draft.sec = 59;
        }
        
        $("#timer").html( Draft.min + ":" + Draft.sec);
        
    }
    
    , shufflePack : function(){
        
        var i = Draft.curPack.length, j, tempi, tempj;
        if( i == 0 ){
            return false;
        }
        while( --i ){
            j = Math.floor( Math.random() * ( i + 1 ) );
            tempi = Draft.curPack[i];
            tempj = Draft.curPack[j];
            Draft.curPack[i] = tempj;
            Draft.curPack[j] = tempi;
        }
        
        /* replace the images in the pack UI with the new pack images */
        for( var i = 1; i < 15 - Draft.picknum; ++i ){
            var id = Draft.curPack[ i - 1 ];
            var img = GTC.card_data[ id ].img;
            $( "#pack-card-" + i ).css( "background-image", 'url(' + img + ')' );
            $( "#pack-card-" + i ).off( 'dblclick' );
            $( "#pack-card-" + i ).dblclick( { 'id' : id }, Draft.selectCard );
            $( "#pack-card-" + i ).off( 'mouseover' );
            $( "#pack-card-" + i ).on( 'mouseover', { 'id' : id }, Draft.cardZoom );
            $( "#pack-card-" + i ).off( 'click' );
            $( "#pack-card-" + i ).click( {'id':id,'slot':i}, Draft.highlightCard );
        }
        for( ; i < 15; ++i ){
            $( "#pack-card-" + i ).css( "background-image", 'url(\'/img/transparent.png\')' );
            $( "#pack-card-" + i ).off( 'click' );
            $( "#pack-card-" + i ).off( 'dblclick' );
            $( "#pack-card-" + i ).off( 'mouseover' );
        }
        
    }
    
    , resizeRow : function(row){
        
		fixed_height = $('#pick-row-loaded').height()
		fixed_width = $('#pick-row-loaded').width()
        
        for( var col = 0; col < 10; ++col ){
            var id = "#pick-card-" + row + "-" + col;
			$(id).css( "background-size", fixed_width + "px " + fixed_height + "px" );
        }
        
    }
    
    
    , selectCard : function(event){
        
        var pick_id = event.data.id;
        var pick_img = GTC.card_data[ pick_id ].img;
        
        Draft.picknum += 1;
        
        // remove the card from the current pack's list of cards
        for( var i = 0; i < Draft.curPack.length; ++i ){
            if( Draft.curPack[i] == pick_id ){
                Draft.curPack.splice(i,1);
                break;
            }
        }
        
        // remove a card randomly from all other packs
        for( var i = 0; i < 8; ++i ){
            
            if( i == (Draft.picknum % 8 - 1)){
                continue;
            }
            
            // get a random index
            var delIdx = Math.floor( Math.random() * Draft.boosters[i].length );
            
            // delete the card at the random index
            Draft.boosters[i].splice( delIdx, 1 );
            
        }
        
        Draft.curPack = Draft.boosters[ Draft.picknum % 8 ];
        
        // deselect the card if it was already highlighted
        if( event.data.slot == Draft.highlight ){
            $( "#pack-card-" + Draft.highlight ).removeClass("select");
            Draft.highlight = -1;
        }
        
        // replace the images in the pack UI with the new pack images
        for( var i = 1; i < 15 - Draft.picknum; ++i ){
            var id = Draft.curPack[ i - 1 ];
            var img = GTC.card_data[ id ].img;
            $( "#pack-card-" + i ).css( "background-image", 'url(' + img + ')' );
            $( "#pack-card-" + i ).off( 'dblclick' );
            $( "#pack-card-" + i ).dblclick( { 'id' : id }, Draft.selectCard );
            $( "#pack-card-" + i ).off( 'mouseover' );
            $( "#pack-card-" + i ).on( 'mouseover', { 'id' : id }, Draft.cardZoom );
            $( "#pack-card-" + i ).off( 'click' );
            $( "#pack-card-" + i ).click( {'id':id,'slot':i}, Draft.highlightCard );
        }
        for( ; i < 15; ++i ){
            $( "#pack-card-" + i ).css( "background-image", 'none' );
            $( "#pack-card-" + i ).off( 'click' );
            $( "#pack-card-" + i ).off( 'dblclick' );
            $( "#pack-card-" + i ).off( 'mouseover' );
        }
        
        ///// put the card in the card picks UI /////
        // get the converted mana cost of the card (count from 1 for now)
        var cmc = GTC.card_data[ pick_id ].cmc;
        var pickRowNum = Draft.colSize[ cmc ];
        
        if( pickRowNum < Draft.numPickRows ){
            // there is space in the corresponding CMC column, so add the
            var idx = Draft.colSize[ cmc ]; // non zero index
        }
        else{ // add a new row
            
            var row = $('<div>').addClass("row-fluid").addClass("less-space");
            row.attr("id", "row" + pickRowNum);
            $("#pick-table").append(row);
            
            for( var i = 0; i < 10; ++i ){
            
                var col = $("<div>");
                col.attr("id", "pick-card-" + pickRowNum + "-" + i);
                col.addClass("span1").addClass("stack").addClass("rounded");
                
                var img = $("<img>").attr("src", "/img/transparent.png");
                
                col.append( img );
                $(row).append( col );
            
            }
            
            // Call row background resize function
            Draft.resizeRow( pickRowNum );
            
            ++ Draft.numPickRows;
            
        }
        
        ++ Draft.colSize[ cmc ];
        
        $( "#pick-card-" + pickRowNum + "-" + cmc ).css( "background-image", 'url(' + pick_img + ')' );
        $( "#pick-card-" + pickRowNum + "-" + cmc ).on( 'mouseover', { 'id' : pick_id }, Draft.cardZoom );
        
    }
    
    , init : function(){
        
        // display booster packs
        for( var i = 0; i < 8; ++i ){
            Draft.boosters[i] = Booster.newBoosterPack('GTC');
        }
        
        Draft.curPack = Draft.boosters[0];
        
        Draft.displayPack( Draft.curPack );
        
        // register booster card slots mouse over events to enlarge image
        Draft.registerHandlers();
        
        // start to timer at 1 minute 30 seconds
        Draft.startTimer(1,30);
        
    }
    
    , registerHandlers : function(){
        
        for( var i = 1; i < 15; ++i ){
            
            var id = Draft.curPack[i-1];
            var data = { 'id' : id, 'slot' : i }
            
            // register mouseover handler
            $( "#pack-card-" + i ).on( 'mouseover', data, Draft.cardZoom );
            
            // register singler click handler
            $( "#pack-card-" + i ).click( data, Draft.highlightCard );
            
            // register double click handler
            $( "#pack-card-" + i ).dblclick( data, Draft.selectCard );
            
        }
        
    }
    
    , displayPack : function(booster){
        
        var images = [];
        
        // make the list of image sources to add to the document
        for( var i = 0; i < booster.length; ++i ){
            var id = booster[i];
            images[i] = GTC.card_data[ id ].img;
        }
        
        // add the card images to the card packs
        for( var i = 1; i < images.length + 1; ++i ){
            $("#pack-card-" + i).css( "background-image", 'url(' + images[i-1] + ')' );
            $("#pack-card-" + i).css( "display", "block" );
        }
        
        $("#pack-card-15").css( "background-image", 'none' );
        $("#pack-card-16").css( "background-image", 'none' );
        
    }
    

};

$( function() {
    // TODO turn on if testing single player mode
    //Draft.init();
} );