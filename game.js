var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;
var started=false;

$("body").keydown(function() {
  if(!started){
  started=true;
  nextSequence();
  }
})

function nextSequence() {
  userClickedPattern = [];
  console.log("Inside Next Sequence");
  level++;
  $("#level-title").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("." + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}


// jquery
$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(index) {
  console.log("comparing index:-" + userClickedPattern[index] + " , " + gamePattern[index]);
  if (userClickedPattern[index] === gamePattern[index]) {
    console.log("comparing length:-" + userClickedPattern.length + " , " + gamePattern.length);
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        console.log("success");
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started=false;
}

//playSound()

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
//
function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass('pressed');
  }, 100);
}
