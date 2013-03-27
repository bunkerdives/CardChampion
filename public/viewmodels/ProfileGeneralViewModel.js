var ProfileGeneralViewModel = function() {
    
    this.profileUsername = ko.observable( '' );
    this.profileThumbSrc = ko.observable( '' );
    this.profileFullName = ko.observable( '' );
    this.profileLocation = ko.observable( '' );
    this.profileDateJoined = ko.observable( '' );
    this.profileDescription = ko.observable( '' );
    
    
    this.initGeneralViewModel = function( data ) {
        
        if( data == undefined ) {
            return;
        }
        
        this.profileUsername( data.user );
        this.profileThumbSrc( data.thumb );
        this.profileFullName( data.fullName );
        this.profileLocation( data.location );
        this.profileDateJoined( data.joined );
        this.profileDescription( data.description );
        
    }
    
};