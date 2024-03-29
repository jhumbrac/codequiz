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
var finishedBtn = document.getElementById('finishedBtn');

var introWrapper = document.getElementById('introWrapper');
var jsWrapper = document.getElementById('jsWrapper');
var htmlWrapper = document.getElementById('htmlWrapper');

var highScores = document.getElementById('highScores');
var timeDisplay = document.getElementById('timeDisplay'); // display time remaining


var score = 0;
var finalScore = 0;
var j = 0;
var k = 0;


// initials.textContent = initialsEntry.value;
// initials should be an object with key = initials, value = score. sorted high to low?
// bonus get date/time

// interval needs to be set independently as a variable to separate from setInterval/clearInterval  - clearInterval stops the timer, but a var interval keeps the time separately
var interval;
var timeRemaining = 60;

function penalty() {
    timeRemaining -= 15;
    return timeRemaining;
} 
function setTime() {
    clearInterval(interval);
    timeDisplay.textContent = timeRemaining;
};
function stopTimer() {
    timeRemaining = '';
    setTime();
    renderTime();
};
function renderTime() {
    timeDisplay.textContent = timeRemaining;
}
function startTimer() {
    setTime();

    interval = setInterval( ()=>{
        timeRemaining--;
        renderTime();
    }, 1000);
};
// * Clicking the "Start Quiz" button presents the user with a series of questions. The timer is initialized with a value and immediately begins countdown.
function removeContent() {
    formDiv.innerHTML = '';
}
function postScores() {
    var scores = document.createElement('p');
    scores.textContent = `${localStorage.getItem(initialsEntry)} : ${localStorage.getItem(finalScore)}`;
    scores.setAttribute('class', 'scores');
    highScores.append(scores);
}

function startQuiz() {
    introWrapper.classList = 'wrapper hidden'; // .add() need help with className vs classList!
    jsWrapper.classList = 'wrapper';
}
function startOver() {
    event.preventDefault();
    jsWrapper.classList = 'wrapper hidden'; // .add() need help with className vs classList!
    introWrapper.classList = 'wrapper';
    // save local storage
    // check score against high scores
    // if highscore then would need to enter a separate panel
    // these comments should probably be a separate function?
}

function jsQuiz() {
    startQuiz();
    removeContent();
    startTimer();
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
    answerBtn.addEventListener('click', event => {
        event.preventDefault();
        var answersElm = document.querySelector('input:checked + label');
        // check to see if an option is selected when answerBtn is pressed
        if (answersElm) { // research json collections. not necessary here but still look up
            var answers = answersElm.textContent;
            if (answers === jsQuestions[j].answer) {
                score += 10; 
            }
            else {
                penalty();
            }

            j++;

            if (j === jsQuestions.length) {
                var finalScore = score + timeRemaining;
                removeContent();
                stopTimer();
                question.textContent = `Congratulations! You finished with a score of ${finalScore}`;

                var initials = document.createElement('input');
                var initialsLabel = document.createElement('label');
                var initialsEntry = initials.value;

                initials.setAttribute('type', 'text');
                initials.setAttribute('id', 'initialsEntry');
                initials.required = true;
                initialsLabel.setAttribute('class', 'labelOverlay');
                initialsLabel.setAttribute('for', 'initialsEntry')
                initialsLabel.textContent = 'Enter your name';
    
                formDiv.append(initials);
                formDiv.append(initialsLabel);

                localStorage.setItem(initialsEntry, finalScore);
                console.log(localStorage);

                postScores();

                finishedBtn.classList.remove('hidden');
                answerBtn.classList.add('hidden');
                // need to add a start over button that returns you to home page
            }
            else {
                jsQuiz();
            }
        }
    });
};
function htmlQuiz() {
    startQuiz();
    removeContent();
    startTimer();
    question.textContent = htmlQuestions[k].title;
    for (var i = 0; i < htmlQuestions[k].choices.length; i++) {
        var answersLabel = document.createElement('label');
        var answersRadio = document.createElement('input');
        
        answersRadio.setAttribute('type', 'radio');
        answersRadio.setAttribute('name', 'answer');
        answersRadio.setAttribute('id', `choice${i}`); // check attribut api to see if they can be combined
        answersLabel.textContent = htmlQuestions[k].choices[i];
        answersLabel.setAttribute('for', `choice${i}`);

        formDiv.appendChild(answersRadio);
        formDiv.appendChild(answersLabel);
        
    } // should this event listener be located inside the function? I feel like there's a better way to do this
    answerBtn.addEventListener('click', event => {
        event.preventDefault();
        var answersElm = document.querySelector('input:checked + label');
        // check to see if an option is selected when answerBtn is pressed
        if (answersElm) { // research json collections. not necessary here but still look up
            var answers = answersElm.textContent;
            if (answers === htmlQuestions[k].answer) {
                score += 10; 
            }
            else {
                penalty();
            }

            k++;

            if (k === htmlQuestions.length) {
                var finalScore = score + timeRemaining;
                removeContent();
                stopTimer();
                question.textContent = `Congratulations! You finished with a score of ${finalScore}`;

                var initials = document.createElement('input');
                var initialsLabel = document.createElement('label');
                var initialsEntry = initials.value;

                initials.setAttribute('type', 'text');
                initials.setAttribute('id', 'initialsEntry');
                initials.required = true;
                initialsLabel.setAttribute('class', 'labelOverlay');
                initialsLabel.setAttribute('for', 'initialsEntry')
                initialsLabel.textContent = 'Enter your name';
    
                formDiv.append(initials);
                formDiv.append(initialsLabel);

                localStorage.setItem(initialsEntry, finalScore);
                console.log(localStorage); 
                // create new object for scores
                // then need to JSON.stringify(newObj)
                // localStorage.setItem('a', JSON.stringify(newObj));
                // JSON.parse(localStorage.getItem('a));
                //  OR   JSON.parse(localStorage.a);

                // Can only store strings - cannot append in localStorage
                // Can only store completed objects, so to append
                // you need to parse strings back into objects,
                // append objects, then re-stringify to save anew


                postScores();

                finishedBtn.classList.remove('hidden');
                answerBtn.classList.add('hidden');
                // need to add a start over button that returns you to home page
            }
            else {
                htmlQuiz();
            }
        }
    });
};

startJs.addEventListener('click', jsQuiz); // prevent default?
startHtml.addEventListener('click', htmlQuiz);
finishedBtn.addEventListener('click', startOver);




// * Score is calculated by time remaining. Answering quickly and correctly results in a higher score. Answering incorrectly results in a time penalty (for example, 15 seconds are subtracted from time remaining).

// * When time runs out and/or all questions are answered, the user is presented with their final score and asked to enter their initials. Their final score and initials are then stored in `localStorage`.