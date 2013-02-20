Login = {

    user : '',

    init : function() {
      //console.log("client.js loaded");
      //Login.bindNameButton();
    },
    
    bindNameButton : function() {
      var button = $( "#choose_name_btn" );
      button.bind( "click", Login.login );
    },
    
    login : function() {
			
	  var user = $( "#cname" ).val();
      if( user == "" )
	    return;
      
      var data = { 'user' : user };
      Login.user = user;
        
      $.ajax( {
          url : 'http://localhost:3000/Login'
          , type : 'POST'
          , contentType : 'application/json'
          , data : JSON.stringify(data)
          , success : Login.loginSuccess
          , error : Login.loginNameFailure
      } );
      
    },
    
    loginSuccess : function(data) {
        		
	  // Tell user their name is already in use and return
      if( data == "FAIL" )
        return;
      
      // Show the main lobby interface
      Foyer.showFoyerInterface();
        
    },
    
    loginNameFailure : function() {
      // Tell the user to try again and return
	  Login.nick = '';
      return;
    }

};

$( function() {
    Login.init();
} );

