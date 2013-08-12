// StageManager singleton module

define( [ "./tilemap.js", "./character.js" ], function( TileMap, Character ) {

    var StageManager = function( ) {

        var obj = { },
            _canvas = null,
            _context = null,
            _character = null,
            _tileMap = null,
            _objectMap = null,
            _occupiedTiles = [],
            _tileWidth = 0,
            _tileHeight = 0,
            _mapData = null,
            _levelData = null,
            _characterData = null ;

        // set requestAnimationFrame to work on all browsers

        ( function( ) {
            var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
            window.requestAnimationFrame = requestAnimationFrame ;
        } )( ) ;


        /* ------------------- PRIVATE METHODS ---------------- */


        function renderTileMap( tiles ) {
            for( var i = 0 ; i < tiles.length ; i++ ) {
                if( tiles[i] != null ) {
                    _context.drawImage( tiles[i].tile, tiles[i].framepos, 0,
                        _tileWidth, _tileHeight, tiles[i].x, tiles[i].y,
                        _tileWidth, _tileHeight ) ;
                }
            }
        }

        function renderObjectLayer( objects ) {
            var object, objectX, objectY, pos, coords ;

            var character_depth_index = getDepthIndex( _character, objects ) ;

            for( var i = 0 ; i < objects.length ; i++ ) {
                pos = objects[i].position ;
                coords = getTileCoordinates( pos[0], pos[1] ) ;
                object = new Image( ) ;
                object.src = objects[i].resource ;
                objectX = 3 + ( coords[0] ) ;
                objectY = coords[1] - ( object.height - _tileHeight ) ;

                _context.drawImage( object, 0, 0, object.width, object.height, objectX, objectY, object.width, object.height ) ;

                if( character_depth_index == i ) renderCharacter( _character ) ;
            }
        }

        function renderCharacter( char ) {
            char.move( ) ;
            _context.drawImage( char.sprite, 0, 0, char.sprite.width, char.sprite.height, char.x, char.y,
                                char.sprite.width, char.sprite.height ) ;
        }

        function render( ) {
            _context.clearRect( 0, 0, _canvas.width, _canvas.height ) ;

            requestAnimationFrame( render ) ;

            renderTileMap( _tileMap.tiles ) ;
            renderObjectLayer( _objectMap ) ;
        }

        function sortByDepth( objects ) {
            var coords ;

            for( var i = 0 ; i < objects.length ; i++ ) {
                coords = getTileCoordinates( objects[i].position[0], objects[i].position[1] ) ;
                objects[i].x = coords[0] ;
                objects[i].y = coords[1] ;
            }

            objects.sort( function( a, b ) {
                return a.y - b.y
            } ) ;

            return objects ;
        }

        function getDepthIndex( item, objects ) {
            var index = 0 ;

            for( var i = objects.length - 1 ; i >= 0 ; i-- ) {
                if( i > 0 ) {

                    if( item.y <= objects[i].y && item.y > objects[ i - 1 ].y ) {

                        index = i ;
                        // @TODO    Precise depth sorting
                        break ;
                    }
                }
            }

            return index ;
        }

        function setOccupiedTiles( ) {
            _occupiedTiles = [] ;
        }

        function getTileCoordinates( x, y ) {
            var mapsize = _mapData.tilemap.length ;
            var posX = ( ( mapsize - 1 - y ) * ( _tileWidth * .5 ) ) + ( x * ( _tileWidth * .5 ) ) ;
            var posY = ( y * ( _tileHeight * .5 ) ) + x * ( _tileHeight * .5 ) ;

            return [ posX, posY ] ;
        }


        /* ------------------- PUBLIC METHODS ----------------- */

        obj.init = function( canvas ) {
            _canvas = canvas ;
            _context = canvas.getContext( '2d' ) ;

            Mediator.subscribe( 'keyDown', function( data ) {
                var dir ;

                switch( data.keycode ) {
                    case 38 :
                        dir = 'N' ;
                        break ;

                    case 40 :
                        dir = 'S' ;
                        break ;

                    case 37 :
                        dir = 'W' ;
                        break ;

                    case 39 :
                        dir = 'E' ;
                        break ;

                    default :
                        break ;
                }

                _character.changeDirection( dir ) ;

            } ) ;
        } ;

        obj.buildLevel = function( leveldata, mapdata, characterdata ) {
            console.log( 'StageManager: buildLevel: ' + leveldata.id + ', ' + leveldata.name ) ;

            _mapData = mapdata ;
            _levelData = leveldata ;
            _characterData = characterdata ;
            _tileWidth = mapdata.tilewidth ;
            _tileHeight = mapdata.tileheight ;
            _tileMap = new TileMap( mapdata ) ;
            _objectMap = sortByDepth( mapdata.objectmap ) ;
            _character = new Character( _characterData ) ;

            setOccupiedTiles( ) ;

            render( ) ;
        } ;

        return obj ;

    }( ) ;

    console.log( 'StageManager loaded' ) ;

    return StageManager ;

} ) ;