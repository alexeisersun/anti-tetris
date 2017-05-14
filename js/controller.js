window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

document.body.onkeydown = function( e ) {
    var keys = {
        37: 'left',
        39: 'right',
        38: 'up'
    };

    if ( typeof keys[ e.keyCode ] != 'undefined' ) {
        tetris.onKeyPress( keys[ e.keyCode ] );
        render();
    }
};

var newGame = true;
var clickedPlay = true;
var clickedStop = false;
var intervalId;
var playPauseButton = document.getElementById('play-button');
var stopReplayButton = document.getElementById('stop-button');

function playGame() {
    if ( newGame ) {
        tetris.newGame();
    } else {
        tetris.playGame();
    }

    intervalId = setInterval( render, 30 );
    clickedPlay = false;
    stopReplayButton.classList.remove("disabled");
    stopReplayButton.classList.add("active");
    playPauseButton.innerHTML = '<span class="glyphicon glyphicon-pause"></span>';
    stopReplayButton.innerHTML = '<span class="glyphicon glyphicon-stop"></span>';
}

function pauseGame() {
    clearInterval( intervalId );
    clickedPlay = true;
    tetris.pauseGame();
    playPauseButton.innerHTML = '<span class="glyphicon glyphicon-play"></span>';
    stopReplayButton.innerHTML = '<span class="glyphicon glyphicon-repeat"></span>';
}

function stopGame(){
    clickedPlay = true;
    clickedStop = false;
    tetris.endGame();
    stopReplayButton.classList.remove("active");
    stopReplayButton.classList.add("disabled");
    playPauseButton.innerHTML = '<span class="glyphicon glyphicon-play"></span>';
    stopReplayButton.innerHTML = '<span class="glyphicon glyphicon-repeat"></span>';
}

function replayGame() {
    playGame();
}


playPauseButton.addEventListener("click", play);
stopReplayButton.addEventListener("click", stop);

function play() {
    if (clickedPlay) {
        playGame();
    } else {
        pauseGame();
    }
}

function stop() {
    if (clickedStop) {
        stopGame();
    } else {
        replayGame();
    }
}