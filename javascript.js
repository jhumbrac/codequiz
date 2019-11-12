// Declare variables on page


// * The user arrives at the landing page and is presented with a call-to-action to "Start Quiz." Also note the navigation option to "View Highscores" and the "Time" value set at 0.
// add highscores on page? date and time?
var quizType = document.getElementById('quizType'); // select with js, html, css
var startJs = document.getElementById('startJs');
var startHtml = document.getElementById('startHtml');

var question = document.getElementById('question');
var form = document.querySelector('form');
var formDiv = document.getElementById('formDiv');

var answerBtn = document.getElementById('answerBtn');

var introWrapper = document.getElementById('introWrapper');
var jsWrapper = document.getElementById('jsWrapper');
var htmlWrapper = document.getElementById('htmlWrapper');

var highScores = document.getElementById('highScores');
var timeDisplay = document.getElementById('timeDisplay'); // display time remaining
var countdown = document.getElementById('countdown');
var score = 0;
var j = 0;
var finalScore = document.getElementById('finalScore'); // pop up display possibly modal
var error = this.addClass = 'error'; // function?

var initialsEntry = document.getElementById('initialsEntry');
var initials = document.getElementById('initials');
// initials.textContent = initialsEntry.value;
// initials should be an object with key = initials, value = score. sorted high to low?
// bonus get date/time

var timeRemaining = '';
var penalty = timeRemaining -= 15;


// * Clicking the "Start Quiz" button presents the user with a series of questions. The timer is initialized with a value and immediately begins countdown.
function removeContent() {
    formDiv.innerHTML = '';
}
function startQuiz() {
    introWrapper.classList = 'wrapper hidden'; // .add() need help with className vs classList!
    jsWrapper.classList = 'wrapper';
}


function jsQuiz() {
    startQuiz();
    removeContent();
    question.textContent = jsQuestions[j].title;
    for (var i = 0; i < jsQuestions[j].choices.length; i++) {
        var answersLabel = document.createElement('label');
        var answersRadio = document.createElement('input');
        
        answersRadio.setAttribute('type', 'radio');
        answersRadio.setAttribute('name', 'answer');
        answersRadio.setAttribute('id', `choice${i}`); // check attribut api to see if they can be combined
        answersLabel.textContent = jsQuestions[j].choices[i];
        answersLabel.setAttribute('for', `choice${i}`);

        formDiv.appendChild(answersRadio);
        formDiv.appendChild(answersLabel);
        
    } // should this event listener be located inside the function? I feel like there's a better way to do this
    answerBtn.addEventListener('click', event=>{
        event.preventDefault();
        var answersElm = document.querySelector('input:checked + label');
        // check to see if an option is selected when answerBtn is pressed
        if (answersElm) { // research json collections. not necessary here but still look up
            var answers = answersElm.textContent;
            if (answers === jsQuestions[j].answer) {
                score++;
            
                
            }
            else {
                score--;
                console.log(answers, jsQuestions[j].answer, score);
            }
            j++;

            if (j === jsQuestions.length) {
                console.log(`end score: ${score}`);
                removeContent();
                question.textContent = `Congratulations! You finished with a score of ${score} out of 5`;

                // need to add a start over button that returns you to home page
            }else {
                jsQuiz();
            }
        }
        // else {  // why is this triggering each time?
        //     alert('Please select an option from the list');
        // }
    });
};
function htmlQuiz(){
    console.log('works');
}

startJs.addEventListener('click', jsQuiz); // prevent default?
startHtml.addEventListener('click', htmlQuiz);




// * Score is calculated by time remaining. Answering quickly and correctly results in a higher score. Answering incorrectly results in a time penalty (for example, 15 seconds are subtracted from time remaining).

// * When time runs out and/or all questions are answered, the user is presented with their final score and asked to enter their initials. Their final score and initials are then stored in `localStorage`.