var canvas = document.getElementsByTagName( 'canvas' )[ 0 ];
var scoreLabel = document.getElementById('score-value');

var ctx = canvas.getContext( '2d' );
var W = 300, H = 500;
COLS = tetris.cols;
ROWS = tetris.rows;
var BLOCK_W = W / COLS, BLOCK_H = H / ROWS;
var renderIntervalID;

canvas.focus();
// draw a single square at (x, y)
function drawBlock( x, y ) {
    ctx.fillRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1 , BLOCK_H - 1 );
    ctx.strokeRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1 , BLOCK_H - 1 );
}

function renderBoard() {
    ctx.strokeStyle = 'black';
    for ( var x = 0; x < COLS; ++x ) {
        for ( var y = 0; y < ROWS; ++y ) {
            if ( tetris.board[ y ][ x ] ) {
                ctx.fillStyle = tetris.colors[ tetris.board[ y ][ x ] - 1 ];
                drawBlock( x, y );
            }
        }
    }
}

function renderCurrentShape() {
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'black';
    for ( var x = 0; x < COLS; ++x ) {
        if ( tetris.currentShape.shape[ x ] ) {
            ctx.fillStyle = tetris.colors[ tetris.currentShape.colorId ];
            drawBlock( tetris.currentShape.x + x, tetris.currentShape.y );
        }
    }
}

function render() {
    ctx.clearRect( 0, 0, W, H );
    renderBoard();
    renderCurrentShape();
}

function updateScore() {
    scoreLabel.innerHTML = tetris.score;
}
