// ResourceManager singleton module

define( function( ) {

    var ResourceManager = function( ) {

        var obj = { },
            _maps = [],
            _characters = [],
            _mapData = null,
            _characterData = null,
            _levelData = null ;


        /* ------------------- PRIVATE METHODS ----------------- */

        function notifyIfLoaded( ) {
            if( _mapData != null && _characterData != null && _levelData != null )
                Mediator.publish( 'resourceDataLoaded', { maps: _mapData.maps, characters: _characterData.characters, levels: _levelData.levels } ) ;
        }


        /* ------------------- ACCESSOR METHODS --------------- */

        obj.getMapData = function( ) {
            return _mapData ;
        } ;

        obj.getCharacterData = function( ) {
            return _characterData ;
        } ;

        obj.getLevelData = function( ) {
            return _levelData ;
        } ;


        /* ------------------- PUBLIC METHODS ----------------- */

        obj.loadResourceData = function( ) {
            obj.loadMapData( ) ;
            obj.loadCharacterData( ) ;
            obj.loadLevelData( ) ;
        } ;

        /*
         * Load JSON containing map data
         */
        obj.loadMapData = function( ) {
            console.log( 'ResourceManager: loadMaps' ) ;

            _mapData = null ;

            $.ajax( {
                dataType: 'json',
                url: 'data/maps.json',
                success: function( data ) {
                    for( var i = 0 ; i < data.maps.length ; i++ ) {
                        console.log( 'ResourceManager: loaded ' + data.maps[i].name ) ;
                    }

                    _mapData = data ;
                    notifyIfLoaded( ) ;
                }
            } ) ;

        } ;

        /*
         * Load JSON containing character data
         */
        obj.loadCharacterData = function( ) {
            console.log( 'ResourceManager: loadCharacters' ) ;

            _characterData = null ;

            $.ajax( {
                dataType: 'json',
                url: 'data/characters.json',
                success: function( data ) {
                    for( var i = 0 ; i < data.characters.length ; i++ ) {
                        console.log( 'ResourceManager: loaded ' + data.characters[i].name ) ;
                    }

                    _characterData = data ;
                    notifyIfLoaded( ) ;
                }
            } ) ;

        } ;

        /*
         * Load JSON containing level data
         */
        obj.loadLevelData = function( ) {
            console.log( 'ResourceManager: loadLevels' ) ;

            _levelData = null ;

            $.ajax( {
                dataType: 'json',
                url: 'data/levels.json',
                success: function( data ) {
                    for( var i = 0 ; i < data.levels.length ; i++ ) {
                        console.log( 'ResourceManager: loaded ' + data.levels[i].name ) ;
                    }

                    _levelData = data ;
                    notifyIfLoaded( ) ;
                }
            } ) ;

        } ;

        return obj ;

    }( ) ;

    console.log( 'ResourceManager loaded' ) ;

    return ResourceManager ;

} ) ;
