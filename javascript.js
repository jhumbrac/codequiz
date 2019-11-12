// Declare variables on page


// * The user arrives at the landing page and is presented with a call-to-action to "Start Quiz." Also note the navigation option to "View Highscores" and the "Time" value set at 0.
// add highscores on page? date and time?
var quizType = document.getElementById('quizType'); // select with js, html, css
var startJs = document.getElementById('startJs');
var startHtml = document.getElementById('startHtml');
var highScores = document.getElementById('highScores');
var timeDisplay = document.getElementById('timeDisplay'); // display time remaining
var countdown = document.getElementById('countdown');
var score = document.getElementById('score');
var finalScore = document.getElementById('finalScore'); // pop up display possibly modal
var error = this.addClass = 'error';

var initialsEntry = document.getElementById('initialsEntry');
var initials = document.getElementById('initials');
// initials.textContent = initialsEntry.value;
// initials should be an object with key = initials, value = score. sorted high to low?
// bonus get date/time

var timeRemaining = '';
var penalty = timeRemaining -= 15;
var questions = [];

// * Clicking the "Start Quiz" button presents the user with a series of questions. The timer is initialized with a value and immediately begins countdown.


// * Score is calculated by time remaining. Answering quickly and correctly results in a higher score. Answering incorrectly results in a time penalty (for example, 15 seconds are subtracted from time remaining).

// * When time runs out and/or all questions are answered, the user is presented with their final score and asked to enter their initials. Their final score and initials are then stored in `localStorage`.