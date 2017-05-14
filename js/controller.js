var playButton, stopButton, pauseButton, repeatButton;
var renderId;
var gameOverScreen = document.getElementById("game-over-screen");

playButton = document.getElementById('play-button');
stopButton = document.getElementById('stop-button');
pauseButton = document.getElementById('pause-button');
repeatButton = document.getElementById('repeat-button');

playButton.addEventListener("click", play);
stopButton.addEventListener("click", stop);
pauseButton.addEventListener("click", pause);
repeatButton.addEventListener("click", repeat);

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

// Add an event listener
document.addEventListener("gameOver", function(e) {
    gameOverScreen.style.visibility = "visible" ;
    disableButtons([playButton, pauseButton, stopButton]);
    enableButtons([repeatButton]);
});

document.body.onkeydown = function( e ) {
    var keys = {
        37: 'left',
        39: 'right',
        38: 'up'
    };

    if ( typeof keys[ e.keyCode ] != 'undefined' ) {
        if ( tetris.playing ) {
            tetris.onKeyPress( keys[ e.keyCode ] );
            render();
        }
    }
};


function enableButtons(buttonList) {
    for (var i = 0; i < buttonList.length; ++i) {
        buttonList[i].classList.remove("disabled");
        buttonList[i].classList.add("active");
    }
}

function disableButtons(buttonList) {
    for (var i = 0; i < buttonList.length; ++i) {
        buttonList[i].classList.remove("active");
        buttonList[i].classList.add("disabled");
    }
}

function play() {
    enableButtons([pauseButton, stopButton, repeatButton]);
    disableButtons([playButton]);
    renderId = setInterval( render, 30 );
    if ( tetris.playing ) {
        tetris.playGame();
    } else {
        tetris.newGame();
    }
}

function pause() {
    disableButtons([pauseButton]);
    enableButtons([playButton, stopButton, repeatButton]);
    tetris.pauseGame();
}

function stop(){
    enableButtons([playButton]);
    disableButtons([pauseButton, stopButton, repeatButton]);
    tetris.stopGame();
}

function repeat() {
    enableButtons([pauseButton, stopButton, repeatButton]);
    disableButtons([playButton]);
    if ( tetris.lose ) {
        gameOverScreen.style.visibility = 'hidden';
    }
    tetris.replayGame();
}


var audio = new Audio('sound/tetris-ost.ogg');
audio.loop = true;
audio.play();