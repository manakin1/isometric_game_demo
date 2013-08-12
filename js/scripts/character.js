// Character module

define( function( ) {

    var obj = function( data ) {

        this.sprite = new Image( ) ;
        this.sprite.src = data.resource ;
        this.name = data.name ;
        this.data = data ;

        this.x = 330 ;
        this.y = 245 ;

        var _directions = [ 'N', 'S', 'W', 'E' ] ;
        var _speed = 1.0 ;
        var _direction = _directions[0] ;
        var _xStep = 1.7 ;
        var _yStep = 1.0 ;
        var _vX = _speed * _xStep ;
        var _vY = _speed * _yStep ;
        var _nextTurn = null ;
        var _currentLocation = [] ;


        /* ------------------- ACCESSOR METHODS --------------- */

        this.getDirection = function( ) {
            return _direction ;
        }


        /* ------------------- PUBLIC METHODS ----------------- */

        this.move = function( ) {
            switch( _direction ) {
                case _directions[0] :
                    this.x += _vX ;
                    this.y -= _vY ;
                    break ;

                case _directions[1] :
                    this.x -= _vX ;
                    this.y += _vY ;
                    break ;

                case _directions[2] :
                    this.x -= _vX ;
                    this.y -= _vY ;
                    break ;

                case _directions[3] :
                    this.x += _vX ;
                    this.y += _vY ;
                    break ;

                default :
                    break ;
            }
        }

        this.changeDirection = function( dir ) {
            if( _directions.indexOf( dir ) == -1 ) return ;
            _direction = dir ;
        }

    } ;

    return obj ;

} ) ;