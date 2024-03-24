
// Main game --------------------------------------------

var level = 0;
var correct = false;
var validKeys = ['1', '2', '3', '4'];
var userSeq = [];
var cpuSeq = [];



// Add event listeners ---------------------------------

// $(".btn").on("click", function() {

//     // creates a sequence of buttons clicked by user
//     userSeq.push(String(this.innerHTML));
//     console.log(userSeq);
    
//     // initiates sound and animation
//     buttonAnimation(this.innerHTML);
//     playSound(this.innerHTML);
//     // console.log(this.innerHTML);
    
// })


$(document).on("keypress", function(event) {

    // Creates a sequence of keys pressed by user if they are valid
    if (validKeys.includes(event.key)) {
        userSeq.push(String(event.key));
        // console.log(userSeq);
    }
    
    // initiates sound and animation
    buttonAnimation(event.key);
    playSound(event.key);
    // console.log(event.key);

    // if just started
    if (level === 0) {

        // get new level
        level ++;
        userSeq = [];
        cpuSeq = getSequence(level);
        cpuPlay(cpuSeq, level);

        console.log("cpu : " + cpuSeq, level);
    }

    else {

        correct = checkAnswer(cpuSeq, userSeq);
        console.log(correct);

        // if answer is incorrect
        if (!correct) {

            console.log("END");
            $("body").addClass("game-over");
            $("h1").html("LEVEL : " + level + "<br><br> GAME OVER !")
        }

        else {
            
            // if user answer is complete
            if (userSeq.length === level) {
                
                // get new level
                level ++;
                userSeq = [];
                cpuSeq = getSequence(level);
                cpuPlay(cpuSeq, level);
        
                console.log("cpu : " + cpuSeq);
            }
        }
    }
})



// Get cpu sequence -------------------------------------

function getSequence(level) {

    // gives random sequence with length equal to level
    var seq = [];

    for (var i = 1; i <= level; i++) {
        var num = Math.ceil(Math.random() * 4);
        seq.push(String(num));
    }

    // console.log(level, seq);
    return seq;
}


// Play cpu sequnce --------------------------------------

function cpuPlay(cpuSeq, level) {

    $("h1").html("LEVEL : " + level + "<br><br> CPU'S TURN");

    // plays each key with 500ms delay
    for (let i = 0; i < cpuSeq.length; i++) {

        setTimeout(function() {

            buttonAnimation(cpuSeq[i]);
            playSound(cpuSeq[i]);

            setTimeout(function() {
                $("h1").html("LEVEL : " + level + "<br><br> YOUR TURN");
            }, 500);
            
        }, (i+1) * 500);
    }
}


// Check for correct sequence by user -------------------

function checkAnswer(arr1, arr2) {

    currKey = arr2.length - 1;

    console.log(arr1);

    if (arr1[currKey] === arr2[currKey]) {
        return true;
    }
    else {
        return false;
    }
}



// Button Sound and Animation ---------------------------

function playSound(key) {

    switch (key) {
        case ("1") :
                var green = new Audio("sounds/green.mp3");
                green.play();
                break;

        case ("2") :
                var red = new Audio("sounds/red.mp3");
                red.play();
                break;

        case ("3") :
                var yellow = new Audio("sounds/yellow.mp3");
                yellow.play();
                break;

        case ("4") :
                var blue = new Audio("sounds/blue.mp3");
                blue.play();
                break;
    }
}


function buttonAnimation(key) {

    var activeButton = $("." + key)
    activeButton.addClass("pressed");

    setTimeout( function() {
        activeButton.removeClass("pressed")
        }, 50);
}