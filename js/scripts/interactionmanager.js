// InteractionManager singleton module

define( [ "./tilemap.js" ], function( TileMap, Character ) {

    var InteractionManager = function( ) {

        var obj = { },
            _canvas = null,
            _context = null ;



        /* ------------------- PRIVATE METHODS ---------------- */

        function keyDownHandler( e ) {
            e.stopImmediatePropagation( ) ;
            Mediator.publish( 'keyDown', { keycode: e.keyCode } ) ;
        }


        /* ------------------- PUBLIC METHODS ----------------- */

        obj.init = function( canvas ) {
            _canvas = canvas ;
            _context = canvas.getContext( '2d' ) ;

            window.addEventListener( 'keydown', keyDownHandler, true ) ;

        } ;

        return obj ;

    }( ) ;

    console.log( 'InteractionManager loaded' ) ;

    return InteractionManager ;

} ) ;