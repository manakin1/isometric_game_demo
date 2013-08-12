// TileMap module

define( function( ) {

    var obj = function( data ) {

        this.tiles = [] ;

        for( var i = 0 ; i < data.tilemap.length ; i++ ) {
            for( var j = 0 ; j < data.tilemap[i].length ; j++ ) {

                tile = new Image( ) ;
                tile.src = data.resource ;
                tileX = ( ( data.tilemap.length - 1 - i ) * ( data.tilewidth * .5 ) ) + j * ( data.tilewidth * .5 ) ;
                tileY = ( i * ( data.tileheight * .5 ) ) + j * ( data.tileheight * .5 ) ;
                frameindex = ( data.tilemap[i][j] - 1 ) ;
                framepos = frameindex * data.tilewidth ;

                if( frameindex >= 0 )
                    this.tiles.push( {
                        tile: tile,
                        x:  tileX,
                        y: tileY,
                        framepos: framepos,
                        frame: data.tilemap[i][j],
                        position: [ i, j ]
                    } ) ;

                else this.tiles.push( null ) ;
            }
        }

    } ;

    return obj ;

} ) ;