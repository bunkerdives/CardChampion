module.exports = function(grunt) {

    grunt.initConfig( {
        
        
        lint : {
            files : [
                'grunt.js'
                , 'src/**/*.js'
                //, 'test/**/*.js' // TODO add test folder with tests
            ]
        }
        
        , jshint : {
            options : {
                
                /******* ENFORCING OPTIONS ******/
                bitwise : false
                , camelcase : false
                , curly : true
                , eqeqeq : true
                , forin : true
                , immed : true
                , indent : false
                , latedef : true
                , newcap : false
                , noarg : true
                , noempty : true
                , nonew : true
                , plusplus : false
                , quotmark : true
                , undef : true
                , unused : true
                , strict : false
                , trailing : true
                // TODO try settings these enforcers...
                //, maxparams : 6
                //, maxdepth : 6
                //, maxstatements : 1024
                //, maxcomplexity : 2048
                //, maxlen : 128
                
                /******* RELAXING OPTIONS ******/
                , asi : false
                , boss : true
                , debug : true
                , eqnull : false
                , es5 : false
                , esnext : false
                , evil : true
                , expr : true
                , funcscope : false
                , globalstrict : false
                , iterator : false
                , lastsemic : false
                , laxbreak : false
                , laxcomma : true
                , loopfunc : true // TODO try settings this to false
                , multistr : true
                , proto : false
                , scripturl : true // TODO try setting this to false
                , smarttabs : true
                , shadow : false
                , sub : false // DOT NOTATION SUPPRESSION
                , supernew : true
                , validthis : true
                
                /******* ENVIRONMENT OPTIONS ******/
                , browser : false // TODO try setting to true to define globals exposed by modern browsers
                , couch : false
                , devel : true // TODO try false to set production mode practices (which will complain about console, alert, etc)
                , dojo : false
                , jquery : true
                , mootools : false
                , node : false // TODO try setting to true to see if defining node globals messes up the frontend code
                , nonstandard : true
                , prototypejs : false
                , rhino : false
                , worker : false
                , wsh : false
                , yui : false
                
                /******* LEGACY OPTIONS ******/
                , nomen : false // TODO try setting to true to disallow using of dangling '_' in variables
                , onevar : false
                , passfail : true // makes JSHint stop on first error or warning
                , white : false
                
            }
            , globals : {
                require : true
                , define : true
                , requirejs : true
                , describe : true
                , expect : true
                , it : true
            }
        }
        
        , useminPrepare : {
            html : 'public/views/layout.jade' // TODO check if this works
        }
        
        , concat : {
            options : {
                separator : ';'
            }
            , js : {
                src : [
                    'public/controllers/*.js'
                    , 'public/models/*.js'
                    , 'public/sets/*.js'
                    , 'public/static/js/*.js'
                    , 'public/utilities/*.js'
                    , 'public/viewcontrollers/*.js'
                    , 'public/viewmodels/*.js'
                    , 'public/schemas/*.js'
                ]
                , dest : 'temp/app.js'
            }
            , css : {
                src : [ 'public/static/css/*.css' ]
                , dest : 'temp/app.css'
            }
        }
        
        , uglify : {
            options : {
                mangle : false // TODO try true and test if the references in the html get updated
                , compress : true
                , report : 'min'
                , preserveComments : false
                // TODO set a detailed banner
                , banner : '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
            }
            , js : {
                src : '<%= concat.js.dest %>'
                , dest : 'dist/app.min.js'
            }
        }
        
        , cssmin : {
            css : {
                src : '<%= concat.css.dest %>'
                , dest : '<%= dist/app.min.css'
            }
        }
        
        , usemin : {
            html : [ '**/*.html' ]
            , options : {
                dirs : [ 'temp', 'dist' ]
            }
        }
        
        
    } );
    
    
    grunt.loadNpmTasks( 'grunt-usemin' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-compress' );
    grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
    grunt.loadNpmTasks( 'grunt-mocha' );
    
    grunt.registerTask( 'default', [ /* 'lint', 'concat', 'uglify', 'cssmin' */ ] );

};