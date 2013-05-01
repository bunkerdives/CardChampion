var ProfileSettingsController = {
    
    // init() - initialize the profile settings view
    init : function() {

        // send a request to the server for the profile data
        var profileSettingsDataRequest = $.post(
            '/profileSettingData'
            , function( data ) {
                if( data.status == "Success" ) {
                    // prepopulate the profile settings form with the data we received from the server
                    ProfileSettingsController.populateProfileSettingsForm( JSON.parse(data.settings) );
                    // bind the save button in profile settings to our callback
                    $("#profile-settings-save").click( ProfileSettingsController.sendProfileSettingsRequest );
                }
                else {
                    // TODO display error from server in the lightbox
                    console.log("Failure grabbing the existing profile settings for this user!")
                }
            }
        );
        
        profileSettingsDataRequest.error( function( jqxhr, status, error ) {
            // TODO display error from server in the lightbox
            console.log("Failure grabbing the existing profile settings for this user!")
        } );

    }
    
    // populateProfileSettingsForm() - prepopulate the profile settings form with the user's 
    , populateProfileSettingsForm : function( data ) {
        
        if( data.fullName != null ) {
            $("#profile-settings-full-name").attr( 'placeholder', data.fullName );
        }
        
        if( data.location != null ) {
            $("#profile-settings-location").attr( 'placeholder', data.location );
        }
        
        if( data.description != null ) {
            $("#profile-settings-description").attr( 'placeholder', data.description );
        }
        
        if( data.thumb != null ) {
            $("#profile-settings-thumbnail").css( 'background-image', data.thumb );
            $("#profile-settings-thumbnail-wrapper").css( 'height', $("#profile-settings-thumbnail").height() );
            $("#profile-settings-thumbnail-wrapper").css( 'opacity', 1 );
            $("#profile-settings-thumbnail-wrapper").css( 'display', 'block' );
        }
        
        if( data.thumbCardName != null ) {
            $("#profile-settings-image-input").attr( 'placeholder', data.thumbCardName );
        }
        
    }
    
    , sendProfileSettingsRequest : function() {
        
        var requestData = {
            fullName : $("#profile-settings-full-name").val()
            , location : $("#profile-settings-location").val()
            , description : $("#profile-settings-description").val()
            , thumb : $("#profile-settings-thumbnail").css( 'background-image' )
            , thumbCardName : $("#profile-settings-image-input").val()
        }
        
        var editProfileRequest = $.post(
            '/editprofile'
            , requestData
            , function( data ) {
                // TODO on success, display success briefly and hide the profile settings lightbox
                if( data.status == "Success" ){
                    console.log("Successfully saved user's profile settings!");
                    LightboxController.closeAuthLightbox();
                } else {
                    console.log("Failure saving user's profile settings!");
                }
            }
        );
        
        editProfileRequest.error(
            function( jqxhr, status, error ) {
                // TODO process error from server for retrieving the profile settings
                console.log("Failure saving user's profile settings!");
            }
        );
        
    }
    
};