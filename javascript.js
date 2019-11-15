var startJs = document.getElementById('startJs');
var startHtml = document.getElementById('startHtml');
var answerBtn = document.getElementById('answerBtn');
var finishedBtn = document.getElementById('finishedBtn');

var question = document.getElementById('question');

var formDiv = document.getElementById('formDiv');

var initials = document.createElement('input');
var initialsLabel = document.createElement('label');
var initialsEntry;

var introWrapper = document.getElementById('introWrapper');
var jsWrapper = document.getElementById('jsWrapper');

var highScoresDisplay = document.getElementById('highScores');
var timeDisplay = document.getElementById('timeDisplay'); // display time remaining

var answersElm = document.querySelector('input:checked + label');

var highScores = [];
var score = 0;
var finalScore = 0;
var j = 0;

// initials.textContent = initialsEntry.value;
// initials should be an object with key = initials, value = score. sorted high to low?
// bonus get date/time

// interval needs to be set independently as a variable to separate from setInterval/clearInterval  - clearInterval stops the timer, but a var interval keeps the time separately
var interval;
var timeRemaining = 60;
function checkHighScores(){
    if(localStorage.a) {
        highScores = JSON.parse(localStorage.a);
    } else {
        highScores = [ ];
    }
}
checkHighScores();
function penalty() {
    timeRemaining -= 15;
    return timeRemaining;
}
function setTime() {
    clearInterval(interval);
    timeDisplay.textContent = timeRemaining;
}
function stopTimer() {
    timeRemaining = '';
    setTime();
    renderTime();
}
function renderTime() {
    timeDisplay.textContent = timeRemaining;
}
function startTimer() {
    timeRemaining = 60;
    setTime();

    interval = setInterval( ()=>{
        timeRemaining--;
        renderTime();
    }, 1000);
}
function removeContent() {
    formDiv.innerHTML = '';
}
// function postScores() {
//     var scores = document.createElement('p');
//     scores.textContent = `${highScores[0].initials}: ${highScores[0].finalScore}`;
//     scores.setAttribute('class', 'scores');
//     highScoresDisplay.append(scores);
// }

// function startQuiz() {
//     toggleHidden(introWrapper, jsWrapper );

//     // introWrapper.classList = 'wrapper hidden'; // .add() need help with className vs classList!
//     // jsWrapper.classList = 'wrapper';
// }
// function startOver() {
//     event.preventDefault();
//     toggleHidden(jsWrapper, )
//     jsWrapper.classList = 'wrapper hidden'; // .add() need help with className vs classList!
//     introWrapper.classList = 'wrapper';
//     // save local storage
//     // check score against high scores
//     // if highscore then would need to enter a separate panel
//     // these comments should probably be a separate function?
// }
function toggleHidden(elem1, elem2) {
    $(elem1).toggleClass('hidden');
    $(elem2).toggleClass('hidden');
}
function nextQuestion(quiz) {
    j++;
    if (j < quiz.length) {
        console.log('next question: ',j);
        removeContent();
        if (quiz === htmlQuestions) {
            createAnswersList(htmlQuestions);
        } else if ( quiz === jsQuestions) {
            createAnswersList(jsQuestions);
        } else {
            console.log('none');
        }
        
    } else {
        finalScore = score + timeRemaining;
        removeContent();
        toggleHidden(answerBtn, finishedBtn);
        stopTimer();
        question.textContent = `Congratulations! You finished with a score of ${finalScore}`;

        initials.setAttribute('type', 'text');
        initials.setAttribute('id', 'initialsEntry');
        initials.required = true;
        initialsLabel.setAttribute('class', 'labelOverlay');
        initialsLabel.setAttribute('for', 'initialsEntry')
        initialsLabel.textContent = 'Enter your name';

        formDiv.append(initials);
        formDiv.append(initialsLabel);
        
    }
}
function showHighScores() {
    // JSON.parse(localStorage.a);
    $(highScoresDisplay).html('');
    $(highScoresDisplay).append( $('<h2>').text('HS') );
    highScores.forEach(obj => {
        var scoreItem = $('<p>').text(`${obj.initials}: ${obj.finalScore}`);
        $(highScoresDisplay).append(scoreItem);
    });
//    localStorage.setItem('a', JSON.stringify(highScores));
    console.log(highScores);
}
showHighScores();


function createAnswersList(quiz) {
    question.textContent = quiz[j].title;
    for (var i = 0; i < quiz[j].choices.length; i++) {
        var answersLabel = document.createElement('label');
        var answersRadio = document.createElement('input');

        answersLabel.textContent = quiz[j].choices[i];        
            
        answersRadio.setAttribute('type', 'radio');
        answersRadio.setAttribute('name', 'answer');
        answersRadio.setAttribute('id', `choice${i}`); // check attribut api to see if they can be combined
        answersLabel.setAttribute('for', `choice${i}`);
        formDiv.appendChild(answersRadio);
        formDiv.appendChild(answersLabel);
    }
}
function quiz(selection) {
    j = 0;
    toggleHidden(jsWrapper, introWrapper);
    removeContent();
    startTimer();
    createAnswersList(selection);
}
function compareAnswers() {
    // check to see if an option is selected when answerBtn is pressed
    var answersElm = document.querySelector('input:checked + label');
    if (answersElm) {
        var answers = answersElm.textContent;
        if (answers === jsQuestions[j].answer) {
            score += 10;
            nextQuestion(jsQuestions);
        }else if (answers === htmlQuestions[j].answer) {
            score += 10;
            nextQuestion(htmlQuestions);
        } else {
            penalty();
        }
    } else { alert('Please select an answer');}
}
function sortScores() {
    // $wrapper.find('.test').sort(function (a, b) {
    //     return +a.dataset.percentage - +b.dataset.percentage;
    // })
    // .appendTo( $wrapper );
    highScores.sort(function (a, b) {
        console.log('a.value - b.value', highScores.length);
        return b.finalScore - a.finalScore;
    });
    if(highScores.length >= 6 ) {
        console.log('before pop', highScores.length);
        highScores.pop();
        console.log('after pop', highScores.length)
    } else {
        console.log('else', highScores.length);
    }
}
answerBtn.addEventListener('click', event => {
    event.preventDefault();
    compareAnswers();
});
startJs.addEventListener('click', function(){quiz(jsQuestions)});
startHtml.addEventListener('click', function(){quiz(htmlQuestions)});
finishedBtn.addEventListener('click', event => {
    event.preventDefault();

    var initialsElement = document.querySelector('#initialsEntry');
    var initialsEntry = initialsElement.value.toUpperCase();
    
    highScores.push({initials: initialsEntry, finalScore}); // if less than 6 show. always replace the 6th and sort by top. Only display 5. Use pop and push
    sortScores();
    console.log(highScores);
    localStorage.setItem('a', JSON.stringify(highScores));

    showHighScores();
    toggleHidden(introWrapper, jsWrapper);
    toggleHidden(finishedBtn, answerBtn);
});