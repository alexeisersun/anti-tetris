// Create the event

var tetris = {
    cols: 12,
    rows: 20,
    score: 0,
    currentScore: 0,
    board: [],
    lose: true,
    paused: false,
    playing: false,
    interval: 250,
    lastRow: 0,
    gameOverEvent: null,
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

    createNewShape: function() {
        var id = Math.floor( Math.random() * this.shapes.length );
        var shape = this.shapes[ id ];
        for ( var x = 0; x < this.cols; ++x ) {
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
        this.currentShape.y = this.rows - 1;
    },

    clearBoard: function() {
        for ( var y = 0; y < this.rows; ++y ) {
            this.board[ y ] = [];
            for ( var x = 0; x < this.cols; ++x ) {
                this.board[ y ][ x ] = 0;
            }
        }
    },

    freezeShape: function () {
        for ( var x = 0; x < this.cols; ++x ) {
            if ( this.currentShape.shape[ x ] ) {
                this.board[ this.currentShape.y ][ x + this.currentShape.x ] = this.currentShape.shape[ x ];
            }
        }
        this.lastRow = this.currentShape.y > this.lastRow ? this.currentShape.y : this.lastRow;
        this.isGameOver();
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

        for ( var x = 0; x < this.cols; ++x ) {
            if ( newCurrentShape.shape[ x ] ) {
                if ( typeof this.board[ offsetY ] == 'undefined'
                  || typeof this.board[ offsetY ][ x + offsetX ] == 'undefined'
                  || this.board[ offsetY ][ x + offsetX ]
                  || x + offsetX < 0
                  || offsetY >= this.rows
                  || offsetY < 0
                  || x + offsetX >= this.cols ) {
                    return false;
                }
            }
        }
        return true;
    },

    isGameOver: function(){
        if ( this.lastRow == this.rows - 1) {
            this.lose = true;
        }
    },

    tick: function () {
        if ( tetris.playing && !(tetris.stopped || tetris.paused) )
        {
            if ( tetris.canMove( 0, -1 )) {
                --tetris.currentShape.y;
            }
            else {
                tetris.freezeShape();
                tetris.score += tetris.currentShape.points;
                updateScore();
                if (tetris.lose) {
                    tetris.endGame();
                    return false;
                }
                tetris.createNewShape();
            }
        }
    },

    newGame: function() {
        this.paused = false;
        this.lastRow = 0;
        this.playing = true;
        this.stopped = false;
        clearInterval(this.interval);
        this.score = 0;
        updateScore();
        this.clearBoard();
        this.createNewShape();
        this.lose = false;
        this.interval = setInterval( this.tick, 250 );
    },

    endGame: function() {
        this.gameOverEvent = new CustomEvent("gameOver", { detail: "Game Over!", score: 0});
        document.dispatchEvent(tetris.gameOverEvent);
        clearInterval( this.interval )

    },

    pauseGame: function() {
        this.paused = true;
    },

    playGame: function() {
        this.paused = false;
        if ( this.stopped ) {
            this.newGame();
        }
    },

    stopGame: function() {
        this.stopped = true;
    },

    replayGame: function() {
        this.newGame();
    }
}

