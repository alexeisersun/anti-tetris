document.body.onkeydown = function( e ) {
    var keys = {
        37: 'left',
        39: 'right',
        38: 'up'
    };

    if ( typeof keys[ e.keyCode ] != 'undefined' ) {
        keyPress( keys[ e.keyCode ] );
        render();
    }
};
