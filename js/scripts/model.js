// Model singleton module

define( function( ) {

    var Model = ( function( ) {
        var obj = { } ;

        obj.currentLevelIndex = 0 ;
        obj.characterIndex = 0 ;



        return obj ;

    }( ) ) ;

    console.log( 'Model loaded' ) ;

    return Model ;

} ) ;


