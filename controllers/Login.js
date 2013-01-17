Login = {
    
    users : {},
        
    nickAvail : function(nick) {
        if( this.users[nick] )
            return false;
        return true;
    },
    
    addNick : function(nick) {
        this.users[nick] = 1;
    },
    
    delNick : function(nick) {
        delete this.users[nick];
    },

    login : function(req, res){

        var user = req.body.user;

        // check our user list for an existing instance of the username
        if( ! Login.nickAvail(user) ){
            res.send( "FAIL" );
            return;
        }

        // add user to the server's list of users
        Login.addNick(user);
        
        res.send( "OK" );

    }

};

module.exports = Login;