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
var playButton = document.getElementById('play-button');
var stopButton = document.getElementById('stop-button');
var pauseButton = document.getElementById('pause-button');
var repeatButton = document.getElementById('repeat-button');


playButton.addEventListener("click", play);
stopButton.addEventListener("click", stop);
pauseButton.addEventListener("click", pause);
repeatButton.addEventListener("click", repeat);

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
}

function pause() {
    disableButtons([pauseButton]);
    enableButtons([playButton, stopButton, repeatButton]);
}

function stop(){
    enableButtons([playButton]);
    disableButtons([pauseButton, stopButton, repeatButton]);
}

function repeat() {
    playButton();
}