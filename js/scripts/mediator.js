// Mediator singleton module

var Mediator = ( function( ) {

    var obj = { },
        _channels = [] ;


    /* ------------------- PUBLIC METHODS ----------------- */

    obj.init = function( ) {
        console.log( 'Mediator: init' ) ;
    } ;

    obj.subscribe = function( channel, func ) {
        if( !_channels[ channel ] ) _channels[ channel ] = [] ;
        _channels[ channel ].push( { context: this, callback: func } ) ;
        return this ;
    } ;

    obj.publish = function( channel ) {
        if( !_channels[ channel ] ) return false ;
        var args = Array.prototype.slice.call( arguments, 1 ) ;

        for( var i = 0 ; i < _channels[ channel ].length ; i++ ) {
            var subscription = _channels[ channel ][i] ;
            subscription.callback.apply( subscription.context, args ) ;
        }

        return this ;
    } ;

    console.log( 'Mediator loaded' ) ;

    return obj ;

}( ) ) ;



