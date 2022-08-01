buttonColours = ["red", "blue", "green", "yellow"];
userClickedPattern = [];
gamePattern = [];
high_score=0;
var levelno = 0,
  toggle = 0;
function nextSequence() {
  var randomNumber = Math.random() * 4;
  // console.log(Math.floor(randomNumber));
  var randomChosenColour = buttonColours[Math.floor(randomNumber)];
  gamePattern.push(randomChosenColour);
  $('#high-score').text('High Score : '+high_score);
  $("#" + "level-title").text("Level " + levelno++);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
}
$(".btn").click(function () {
  var userChosenColour;
  userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  console.log(userClickedPattern);
});

$(".btn").click(function () {
  var x;
  x = $(this).attr("id");
  var audio = new Audio("sounds/" + x + ".mp3");
  audio.play();
});

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

$(document).keypress(function (event) {
  if (!toggle) {
    nextSequence();
    toggle = 1;
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 500);
    $("h1").text("Game Over, Press Any Key to Restart");
    if(high_score<levelno){
        high_score=levelno-1;
        $('#high-score').text('High Score : '+high_score);
    }
    startOver();

  }
}

function startOver() {
  levelno = 0;
  gamePattern = [];
  userClickedPattern = [];
  toggle = 0;
}
