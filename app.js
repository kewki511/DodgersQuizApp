// 6 Questions
const store = [{
  question: 'Where was the Dodgers established?',
  answers: [
    'New York',
    'Los Angeles',
    'Brooklyn',
    'Las Vegas'
  ],
  correctAnswer: 'Brooklyn'
},
{
  question: 'What year did the Dodgers win their most recent World Series?',
  answers: [
    '2006',
    '2020',
    '1998',
    '1888'
  ],
  correctAnswer: '2020'
},
{
  question: 'Which team cheated against the Dodgers in the 2017 World Series?',
  answers: [
    'Houston Astros',
    'New York Yankees',
    'Colorado Rockies',
    'Tampa Bay Rays'
  ],
  correctAnswer: 'Houston Astros'
},
{
  question: 'Which player earned the 2020 World Series MVP?',
  answers: [
    'Cody Bellinger',
    'Joe Kelly',
    'Mookie Betts',
    'Corey Seager'
  ],
  correctAnswer: 'Corey Seager'
},
{
  question: 'Which player received a 12 year, $365 million contract?',
  answers: [
    'Cody Bellinger',
    'Joe Kelly',
    'Mookie Betts',
    'Corey Seager'
  ],
  correctAnswer: 'Mookie Betts'
},
{
  question: 'Which team has a historical rivalry against the Dodgers?',
  answers: [
    'Houston Astros',
    'New York Yankees',
    'San Francisco Giants',
    'Los Angeles Angels'
  ],
  correctAnswer: 'San Francisco Giants'
},
]

//Tracking Scores
let trackScore = 0;

//Tracking questions
let trackQuestion = 0;

function addQuestion() {
trackQuestion++;
$('.question').text(trackQuestion);
}


//Rendering quiz
function begin() {
$('.js-begin-quiz').click(function(event) {
  renderQuiz();
});
}

//index -> track question numbers
let index = 0;

//tracker -> shows how many questions we have gon through so far.
let tracker = 1;

//render quiz function
function renderQuiz() {
//put the question to print
if (index === store.length) return finalResult();

let mainQuestion = store[index].question;


//as the quiz reaches last question, tracking needs to stop
if (index > 5 || tracker == 7) {
  return finalResult();
} else if (index == 6) {
  mainQuestion = store[5].question;
}

//stops the question number if over 6
if (tracker > 6) {
  $('.question').text(6);
} else {
  $('.question').text(tracker);
}


//display Q&A button
let displayQuestion = $(`
<form>
<h4>${mainQuestion}</h4>
<div class = "js-options"></div>

<button type = "submit" id="answer" tabindex="5">Submit</button>


</form>
`);

$("main").html(displayQuestion);

//answer options
options();
}

//gives question answer choices
function options() {
  let mainQuestion = store[index].answers;

//loop until all 4 multiple choice answer are displayed

for (let i = 0; i < mainQuestion.length; i++) {
  let optionNumber = $(`
  <input type = "radio" name="option" id="option${i+1}" value="${mainQuestion[i]}" tabindex ="${i+1}">
  <label for="option${i+1}"> ${mainQuestion[i]}</label><br>
  <span id="js-r${i+1}"></span>
  `)

  $('.js-options').append(optionNumber);
}
}

//giving correct and wrong answer choices
function correctAnswer() {
let correctAnswers = $(`
<h4>Correct~!</h4>
<img src = "correct.jpg" width = "250" alt = "correct"><br>
<button type = "button" id = "next-question" tabindex = "6">Next</button>
`)

$("main").html(correctAnswers)

//putting scores if answer is correct
trackScore++;
$('.score').text(trackScore);
//adding question number
tracker++
}

function wrongAnswer() {
  let mainQuestion = store[index].correctAnswer;

  let wrongAnswers = $(`
  <h4>Wrong Answer</h4>
  <img src = "pouty-face.png" width = "250" alt = "incorrect">
  <p>Correct answer is <b>${mainQuestion}</b></p>
  <button type = "button" id = "next-question" tabindex = "6">Next</button>
`)

$("main").html(wrongAnswers);
//adding question number
tracker++
}

//submitting answers
function submitAnswer() {
$("main").on('submit', function(event) {
  event.preventDefault();

  //checking for none answering questions
  let noneSelect = $('input:checked').val();
  if (!noneSelect) {
    alert("You have not put your answer in");
    return;
  }

  //check if answer is correct
  let value = $('input:checked').val();

  let answer = store[index].correctAnswer;
  
 

  if (value === answer) {
    correctAnswer();
  } else {
    wrongAnswer();
  }
});
}

//moving to next question when next button is clicked
function nextQuestion() {
$("main").on('click', '#next-question', function(event) {
  if (index < 6) {
    index++;
  }
  renderQuiz();
});
}

//give ending results
function finalResult() {
if (trackScore > 3) {
  //good result
  const endMessage = $(`
  <p>You finished the Dodgers quiz with: ${trackScore}!</p>
  <p>You really are a fan of the Dodgers! Good job!</p>
  <button type = "button" id = "restart-quiz" tabindex = "7">Restart</button>
  `)

  $("main").html(endMessage);
} else {
  //bad result
  const endMessage = $(`
  <p>You finished the Dodgers quiz with: ${trackScore}!</p>
  <p>You need to know more about the Dodgers</p>
  <button type = "button" id = "restart-quiz" tabindex = "7">Restart</button>
  `)
  $("main").html(endMessage);
}
}

//restart quiz with restart button
function restartQuiz() {
$("main").on('click', '#restart-quiz', function(event) {
  /*sets all to 0 */
  index = 0;
  tracker = 1;
  trackScore = 0;
  $('.scores').text(0);
  renderQuiz();
});
}



function main() {
begin();
submitAnswer();
nextQuestion();
restartQuiz();
}

$(main);
