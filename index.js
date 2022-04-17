
var colorArr = ['blue', 'green', 'red', 'yellow'];
var userColorPatterns = new Array();
var gameColorPatterns = new Array();
var started = false;
var level = 0;

function nextSequence() {
    userColorPatterns = [];
    var rand = Math.floor(Math.random() * 4);
    var randColor = colorArr[rand];
    var color = randColor;

    
    $('#' + color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(color);
    gameColorPatterns.push(color);
    level++;
    $('h1').text('Level ' + level);
}



function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animateBtn(name) {
    $('#' + name).addClass('pressed');
    setTimeout(function() {
        $('#' + name).delay(500).removeClass('pressed')
    }, 100);
}

function checkAnswer(currentLevel) {
    if(gameColorPatterns[currentLevel] === userColorPatterns[currentLevel]) {
        if(gameColorPatterns.length === userColorPatterns.length) {
            setTimeout(nextSequence, 1000);
        }
    }
    else {
        playSound("wrong");
        $('h1').text("Game Over, Press Any Key to Restart");
        $('body').addClass('game-over');
        setTimeout(function() {
            $('body').removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver() {
    userColorPatterns = [];
    level = 0;
    started = false;
    gameColorPatterns = [];
}

$(document).keypress(function (e) { 
    if(!started) {
        nextSequence();
        started = true;
    }
});


$('.btn').on('click', function () { 
    if(started) {
        var chosenColor = $(this).attr('id');
        userColorPatterns.push(chosenColor);
        animateBtn(chosenColor)
        checkAnswer(userColorPatterns.length - 1)
        playSound(chosenColor)
    }
});
