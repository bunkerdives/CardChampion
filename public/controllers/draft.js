Draft = {

    // the open socket connection to the server
    socket : null
    
    // is the user still deciding on their pick?
    , choosing : true
    
    // a list of the user's picks
    , picks : null
    
    // a queue of boosters from the server, in case any come before user is done picking
    , newBoosterQueue : null
    
    , curPack : []
    
    , boosters : []
    
    , packIdx : 0
    
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
    
    , init : function(){
        
        /* display booster packs */
        for( var i = 0; i < 8; ++i ){
            Draft.boosters[i] = Booster.newBoosterPack('GTC');
        }
        
        Draft.curPack = Draft.boosters[0];
        
        Draft.displayPack( Draft.curPack );
        
        /* register booster card slots mouse over events to enlarge image */
        Draft.registerHandlers();
        
    }
    
    , registerHandlers : function(){
        
        for( var i = 1; i < 15; ++i ){
            
            var id = Draft.curPack[i-1];
            var data = { 'id' : id }
            
            console.log( id );
            console.log( GTC.card_data[id].img );
            
            /* register mouseover handler */
            $( "#pack-card-" + i ).on( 'mouseover', data, Draft.cardZoom );
            
            /* register double click handler */
            $( "#pack-card-" + i ).dblclick( data, Draft.selectCard );
            
        }
        
    }
    
    , selectCard : function(event){
        
        var pick_id = event.data.id;
        var pick_img = GTC.card_data[ pick_id ].img;
        
        Draft.picknum += 1;
        
        /* remove the card from the current pack's list of cards */
        for( var i = 0; i < Draft.curPack.length; ++i ){
            if( Draft.curPack[i] == pick_id ){
                Draft.curPack.splice(i,1);
                break;
            }
        }
        
        /* remove a card randomly from all other packs */
        for( var i = 0; i < 8; ++i ){
            
            if( i == (Draft.picknum % 8 - 1)){
                continue;
            }
            
            /* get a random index */
            var delIdx = Math.floor( Math.random() * Draft.boosters[i].length );
            
            /* delete the card at the random index */
            Draft.boosters[i].splice( delIdx, 1 );
            
        }
        
        Draft.curPack = Draft.boosters[ Draft.picknum % 8 ];
        
        console.log( "BOOSTER NUM: " + (Draft.picknum % 8) )
        console.log( "PICKNUM: " + Draft.picknum)
        
        console.log( "BOOSTER LENGTHS 1: ")
        for( var i = 0; i < 8; ++i ){
            console.log( "Booster " + i + ": " + Draft.boosters[i].length )
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
        }
        for( ; i < 15; ++i ){
            $( "#pack-card-" + i ).css( "background-image", 'url(\'/img/transparent.png\')' );
            $( "#pack-card-" + i ).off( 'dblclick' );
            $( "#pack-card-" + i ).off( 'mouseover' );
        }
        
        /*** put the card in the card picks UI ***/
        /* get the converted mana cost of the card (count from 1 for now) */
        var cmc = GTC.card_data[ pick_id ].cmc;
        var pickRowNum = Draft.colSize[ cmc ];
        if( pickRowNum < Draft.numPickRows ){
            // there is space in the corresponding CMC column, so add the
            var idx = Draft.colSize[ cmc ]; // non zero index
        }
        else{ // add a new row
            
            var row = $('<div>');
            row.addClass("row-fluid").addClass("less-space");
            
            for( var i = 0; i < 10; ++i ){
            
                var col = $("<div>");
                col.attr("id", "pick-card-" + pickRowNum + "-" + i);
                col.addClass("span1").addClass("stack").addClass("rounded");
                
                var img = $("<img>");
                img.attr("src", "/img/transparent.png");
                
                col.append( img );
                row.append( col );
            
            }
            
            $("#pick-table").append(row);
            
            /* Call row background resize function */
            Draft.resizeRow( pickRowNum );
            
            ++ Draft.numPickRows;
            
        }
        
        ++ Draft.colSize[ cmc ];
        
        console.log( "Putting card into:")
        console.log( "#pick-card-" + pickRowNum + "-" + cmc )
        
        $( "#pick-card-" + pickRowNum + "-" + cmc ).css( "background-image", 'url(' + pick_img + ')' );
        $( "#pick-card-" + pickRowNum + "-" + cmc ).on( 'mouseover', { 'id' : pick_id }, Draft.cardZoom );
        
    }
    
    , cardZoom : function(event) {
        
        var id = event.data.id;
        var img = GTC.card_data[ id ].img;
        $("#preview-src").attr( 'src', img );
        
    }
    
    , displayPack : function(booster){
        
        var images = [];
        
        /* make the list of image sources to add to the document */
        for( var i = 0; i < booster.length; ++i ){
            var id = booster[i];
            images[i] = GTC.card_data[ id ].img;
            //console.log( images[i] );
        }
        
        /* add the card images to the card packs */
        for( var i = 1; i < images.length + 1; ++i ){
            $("#pack-card-" + i).css( "background-image", 'url(' + images[i-1] + ')' );
        }
        
        $("#pack-card-15").css( "background-image", 'url(\'/img/transparent.png\')' );
        $("#pack-card-16").css( "background-image", 'url(\'/img/transparent.png\')' );
        
    }
    
    , resizeRow : function(row){
        
		fixed_height = $('#pick-row-loaded').height()
		fixed_width = $('#pick-row-loaded').width()
        
        for( var col = 0; col < 10; ++col ){
            var id = "#pick-card-" + row + "-" + col;
			$(id).css( {
	  		"background-size" : fixed_width + "px " + fixed_height + "px"
			} );
        }
        
        /*
			  var fixed_height = 0
			  var fixed_width = 0
  		  fixed_height = $('#pick-row-loaded').height()
  			fixed_width = $('#pick-row-loaded').width()
  			var i = row //i.e., row#, 0=1
        
  			//-0(row)-0(column)
  			function loopRow(r) {
  				if(r <= i)
  				{
  				
  					function loopCol(c) {
  						if(c <= 9)
  						{
  							$("#pick-card-" + r + "-" + c).css({
  					  		"background-size": fixed_width + "px " + fixed_height + "px"
  							}, loopCol(c+1));
  						}
  						loopRow(r+1)
  					}
  					loopCol(0);
  				}
  			}
  			loopRow(0);
        return 1;
        
        */
        
    }

    , showDraftInterface : function(data){
        
        console.log("show draft interface");
        
 		// untoggle visibility of the lobby interface
      	$("#foyer").css( "display", "none" );
		  
		// toggle visibility of the draft interface
		$('#draft').css( "display", "block" );
		
		// display the queue dialog and show the number of players
		var players = data + " players";
		$('#queue').html( players );
        
    }

    , draftStart : function(data, _socket) {
    
        var body = $.parseJSON(data);
        var cards = body.cards;
        var users = body.users;
        
        console.log("draft start");
        
        // initialize the list of picks and the passed cards queue
        Draft.picks = [];
        Draft.newCardsQueue = [];
    
        // hide the lobby and show the draft screen
        Draft.showDraftInterface(users);
        
        // hold onto the open socket
        Draft.socket = _socket;
        
        // add a handler to listen for CardPass socket events
        _socket.on( 'PackPass', function(cards) {
            Draft.takeCards( $.parseJSON(cards) );
        } );
        
        // add a handler to listen for the EndDraft socket event
        _socket.on( 'EndDraft', function(picks) {
            Draft.endDraft( picks );
        } );
		
        // display the card images in the draft pool section
        Draft.addToDraftPool( cards );
        
        // start the timer at 60 seconds
        Draft.updateTimer(60);

    }
    
    , showDraftInterface : function(users) {
    
        // hide the main interface
        $("#main").css("display", "none");
        
        // show the draft interface
        $("#draft").css("display", "block");
        
        // add the users to the user list
        for( var user in users ) {
            $("#users").append( user + "<br>" );
        }
    
    }
    
    , pickCard : function(pick) {
        
        // send the client's pick as a socket emit to the server
        Draft.socket.emit( 'CardPick', { 'pick' : pick } );
    
        // add the card to the our list of picks
        Draft.picks.push( pick );
        
        // remove the card elements from the UI
        Draft.removeAllFromDraftPool();
        
        // add the card to the card pool UI
        Draft.addToCardPool( pick );
        
        // mark that the user is done choosing
        Draft.choosing = false;
        
        // if there is a new booster already in our queue, display it for the user
        if( Draft.newBoosterQueue.length > 0 ){
            Draft.choosing = true;
            Draft.addToDraftPool( Draft.newBoosterQueue.shift() );
            Draft.updateTimer(60);
        }
        
    }
    
    , autoPick : function() {
        
        // pick a card at random from the draft pool
        var pick;
        
        // pick the card by passing the remaining cards to the next player
        Draft.pickCard(pick);
        
    }
    
    , takeCards : function(cards) {
    
        // add the booster the server passed us to our queue
        Draft.newBoosterQueue.push( cards );
        
        // if the user is done with the last pack, display the cards and reset the timer
        if( choosing == false ){
            Draft.choosing = true;
            Draft.addToDraftPool( Draft.newBoosterQueue.shift() );
            Draft.updateTimer(60);
        }
        
    }
    
    , addToDraftPool : function(cards) {
        
        // add each card's images in the draft pool to the UI and give each click callbacks
        for( var card in cards ){
            ;
        }
        
    }
    
    , removeAllFromDraftPool : function() {
    
        // TODO remove each of the card images from the draft pool UI
        
    }
    
    , addToCardPool : function(pick) {
    
        // TODO add the pick image to the draft pool UI
        
        // add the pick's id to the client's list of picks
        Draft.picks.push( pick );
        
    }
    
    , updateTimer : function(rem) {
    
        // if remaining time is zero, autopick
        if( rem == 0 ){
            Draft.autoPick();
        }
        
        // TODO display the remaining time in the timer UI
        
        // call self after one second with the remaining time
        Draft.updateTimer( rem - 1 );
        
    }
    
    , endDraft : function(picks) {
    
        // TODO switch to the deck building view, and give it's controller the pick list
        
    }

};

$( function() {
    Draft.init();
} );