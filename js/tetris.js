var tetris = {
    COLS: 12,
    ROWS: 20,
    score: 0,
    currentScore: 0,
    board: [],
    lose: true,
    interval: 250,
    currentShape: {shape: null, x: 0, y: 0, width: 0, points: 0, colorId: 0},
    shapes: [
        { width: 1, points: 1, colorId: 0, shape: [1]},
        { width: 2, points: 2, colorId: 1, shape: [1, 1]},
        { width: 3, points: 3, colorId: 2, shape: [1, 1, 1]},
        { width: 4, points: 4, colorId: 3, shape: [1, 1, 1, 1]},
        { width: 6, points: 6, colorId: 4, shape: [1, 1, 1, 1, 1, 1]},
        { width: 8, points: 8, colorId: 5, shape: [1, 1, 1, 1, 1, 1, 1, 1]},
        { width: 12, points: 12, colorId: 6, shape: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
    ],
    colors: [
        'orange',
        'yellow',
        'cyan',
        'blue',
        'red',
        'green',
        'brown'
    ],

    newGame: function() {
        clearInterval(this.interval);
        this.clearBoard();
        this.createNewShape();
        this.lose = false;
        this.interval = setInterval( this.tick, 250 );
    },

    createNewShape: function() {
        var id = Math.floor( Math.random() * this.shapes.length );
        var shape = this.shapes[ id ];
        for ( var x = 0; x < this.COLS; ++x ) {
            if ( typeof shape.shape[ x ] != 'undefined' && shape.shape[ x ] ) {
                shape.shape[ x ] = id + 1;
            }
            else {
                shape.shape[ x ] = 0;
            }
        }
        this.currentShape.shape = shape.shape
        this.currentShape.points = shape.points;
        this.currentShape.width = shape.width;
        this.currentShape.colorId = shape.colorId;
        this.currentShape.x = 6 - Math.floor(shape.width / 2);
        this.currentShape.y = this.ROWS - 1;
    },

    clearBoard: function() {
        for ( var y = 0; y < this.ROWS; ++y ) {
            this.board[ y ] = [];
            for ( var x = 0; x < this.COLS; ++x ) {
                this.board[ y ][ x ] = 0;
            }
        }
    },

    tick: function () {
        if ( tetris.canMove( 0, -1 )) {
            --tetris.currentShape.y;
        }
        else {
            tetris.freezeShape();
            tetris.score += tetris.currentShape.points;
            updateScore();
            if (tetris.lose) {
                alert("LOST");
                return false;
            }
            tetris.createNewShape();
        }
    },

    freezeShape: function () {
        for ( var x = 0; x < this.COLS; ++x ) {
            if ( this.currentShape.shape[ x ] ) {
                this.board[ this.currentShape.y ][ x + this.currentShape.x ] = this.currentShape.shape[ x ];
            }
        }
    },

    onKeyPress: function( key ) {
        switch ( key ) {
        case 'left':
            if ( this.canMove( -1 ) ) {
                --this.currentShape.x;
            }
            break;
        case 'right':
            if ( this.canMove( 1 ) ) {
                ++this.currentShape.x;
            }
            break;
        case 'up':
            if ( this.canMove( 0, -1 ) ) {
                --this.currentShape.y;
            }
            break;
        }
    },
    
    canMove: function( offsetX, offsetY, newCurrentShape ) {
        offsetX = offsetX || 0;
        offsetY = offsetY || 0;
        offsetX = this.currentShape.x + offsetX;
        offsetY = this.currentShape.y + offsetY;
        newCurrentShape = newCurrentShape || this.currentShape;

        for ( var x = 0; x < this.COLS; ++x ) {
            if ( newCurrentShape.shape[ x ] ) {
                if ( typeof this.board[ offsetY ] == 'undefined'
                  || typeof this.board[ offsetY ][ x + offsetX ] == 'undefined'
                  || this.board[ offsetY ][ x + offsetX ]
                  || x + offsetX < 0
                  || offsetY >= this.ROWS
                  || offsetY < 0
                  || x + offsetX >= this.COLS ) {
                    if (offsetY >= 18) { // lose if the currentShape shape at the top row when checked
                        this.lose = true;
                    }
                    return false;
                }
            }
        }
        return true;
    }
}

tetris.newGame();

/*
    // check if any lines are filled and clear them
    function clearLines() {
        for ( var y = ROWS - 1; y >= 0; --y ) {
            var rowFilled = true;
            for ( var x = 0; x < COLS; ++x ) {
                if ( board[ y ][ x ] == 0 ) {
                    rowFilled = false;
                    break;
                }
            }
            if ( rowFilled ) {
                document.getElementById( 'clearsound' ).play();
                for ( var yy = y; yy > 0; --yy ) {
                    for ( var x = 0; x < COLS; ++x ) {
                        board[ yy ][ x ] = board[ yy - 1 ][ x ];
                    }
                }
                ++y;
            }
        }
    }

    */
