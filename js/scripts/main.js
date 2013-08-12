require(
    [
        "js/lib/jquery-1.9.0.min.js",
        "js/lib/preloadjs-0.3.1.min.js",
        "js/scripts/mediator.js",
        "js/scripts/resourcemanager.js",
        "js/scripts/stagemanager.js",
        "js/scripts/interactionmanager.js",
        "js/scripts/model.js"
    ],

    function( _jquery_, _preloadjs_, mediator, resourceManager, stageManager, interactionManager, model ) {

        console.log( "jQuery", $.fn.jquery, "loaded" ) ;
        IsoGame.init( resourceManager, stageManager, interactionManager, model ) ;
    }

) ;



// Main application

var IsoGame = {

   /*
    * Load assets
    */
   init: function( ResourceManager, StageManager, InteractionManager, Model ) {
       Mediator.init( ) ;

       // build stage once resources have been loaded

       Mediator.subscribe( 'resourceDataLoaded', function( data ) {
           console.log( 'Resource data loaded' ) ;

           var leveldata = data.levels[ Model.currentLevelIndex ] ;
           var mapdata = data.maps[ leveldata.mapid ] ;
           var characterdata = data.characters[ Model.characterIndex ] ;

           StageManager.init( document.getElementById( 'canvas' ) ) ;
           StageManager.buildLevel( leveldata, mapdata, characterdata ) ;

           InteractionManager.init( document.getElementById( 'canvas' ) ) ;
       } ) ;

       ResourceManager.loadResourceData( ) ;
   }

} ;