const myQuestions = [
  {
    index: "1",
    question: "Which of the following is not a real eCommerce platform?",
    answers: [ "Shopify", "WooCommerce", "ShopCommerce", "BigCommerce" ],
    correctAnswer: 3
  },
  {
    index: "2",
    question: "If Shopify is so good, why are Shopify developers necessary?",
    answers: [ "To save time on things like store setups and migrations",
               "To extend the limited design options and functionalities of themes with custom code",
               "To provide support with a deep understanding of how the platform works and what its limitations are",
               "All the above" ],
    correctAnswer: 4
  },
  {
    index: "3",
    question: "Which of the following is true about Shopify developers?",
    answers: [ "They are paid extremely well",
               "There is a high demand for them",
               "They need to know web development, the platform itself, and the liquid template language",
               "All the above"],
    correctAnswer: 4
  },
  {
    index: "4",
    question: "Why does this quiz have extra questions?",
    answers: [ "To show that any number of questions can be asked", "To show that any number of answers can exist", "To show off", "All of the Above", "None of the above" ],
    correctAnswer: 4
  },
  {
    index: "5",
    question: "Which of the following is a made up term?",
    answers: [ "AJAX", "AJACK", "JSON" ],
    correctAnswer: 2
  }
];

let startDate = 0;
let finishDate = 0;
let currentQuestion = 1;
let totalQuestions = myQuestions.length;
const saveAnswers = new Array(totalQuestions).fill(0);
const theError = "Please select an answer!";
let myQuestionsMap = {};
for (let question of myQuestions) {
  myQuestionsMap[question.index] = question;
};

// Functions

setInterval(() => {
  const millis = Date.now() - startDate;
  document.querySelector('#current-timer').textContent = msToTime(millis);
}, 1300);

function msToTime(ms) {
  let seconds = (ms / 1000).toFixed(1);
  let minutes = (ms / (1000 * 60)).toFixed(1);
  let hours = (ms / (1000 * 60 * 60)).toFixed(1);
  let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
  if (seconds < 60) return seconds + " Sec";
  else if (minutes < 60) return minutes + " Min";
  else if (hours < 24) return hours + " Hrs";
  else return days + " Days";
}

function getAnswer(questionsLength) {
  let answerID = 0;
  for (let i = 1; i <= questionsLength; i++) {
    let isChecked = document.getElementById("question-input-" + i).checked;
    if (isChecked) {
      answerID = i;
    };
  };
  return answerID;
}

// Selectors

document.querySelector('#start-button').addEventListener("click", function() {
  document.querySelector('#start-button').classList.add("display-none"); 
  document.querySelector('#main-block').classList.remove("display-none");
  startDate = Date.now();
  currentQuestion = 1;
  saveAnswers.forEach((num, index, arr) => {
    arr[index] = 0;
  });
  makeQuestions(myQuestionsMap[currentQuestion].answers.length);
  showQuestion(currentQuestion);
});

document.querySelector('#next-button').addEventListener("click", function(){
  saveAnswers[currentQuestion - 1] = getAnswer(myQuestionsMap[currentQuestion].answers.length);
  if (currentQuestion < totalQuestions) {   
    if (saveAnswers[currentQuestion - 1]) {
      document.querySelector('#error-message').textContent = "";
      removeQuestions(myQuestionsMap[currentQuestion].answers.length);
      currentQuestion++;
      makeQuestions(myQuestionsMap[currentQuestion].answers.length);
      if (saveAnswers[currentQuestion - 1]) {
        document.getElementById("question-input-" + saveAnswers[currentQuestion - 1]).checked = true;
      };
      showQuestion(currentQuestion);      
    } else {
      document.querySelector('#error-message').textContent = theError
    }  
  }
});

document.querySelector('#back-button').addEventListener("click", function(){
  saveAnswers[currentQuestion - 1] = getAnswer(myQuestionsMap[currentQuestion].answers.length);
  if (currentQuestion > 1) {
    removeQuestions(myQuestionsMap[currentQuestion].answers.length);    
    currentQuestion--;
    makeQuestions(myQuestionsMap[currentQuestion].answers.length);
    document.getElementById("question-input-" + saveAnswers[currentQuestion - 1]).checked = true;
    showQuestion(currentQuestion);
  }
});

document.querySelector('#complete-button').addEventListener("click", function(){
  saveAnswers[currentQuestion - 1] = getAnswer(myQuestionsMap[currentQuestion].answers.length);
  let isComplete = true;
  for (let answer of saveAnswers) {
     if (!answer) {
       isComplete = false;
     }
  }
  if (isComplete) {
    completePage();
    document.querySelector('#error-message').textContent = ""
    document.querySelector('#main-block').classList.add("display-none"); 
    document.querySelector('#completed-block').classList.remove("display-none"); 
  } else {
    document.querySelector('#error-message').textContent = theError
  }
});

document.querySelector('#start-again-button').addEventListener("click", function(){
  document.querySelector('#completed-block').classList.add("display-none"); 
  document.querySelector('#start-button').classList.remove("display-none");
  document.querySelector('#question-area-div').remove();
  removeQuestions(myQuestionsMap[currentQuestion].answers.length);
});

// Dynamic Page Functions

function makeQuestions(questionsLength) {
  for (let i = 1; i <= questionsLength; i++) {
    let div = document.createElement('div');
    div.id = "input-block-" + i;
    div.classList.add("input-block");
    document.querySelector('#question-block').appendChild(div);

    let input = document.createElement('input');
    input.type = "radio";
    input.name = "question-input";
    input.value = i;
    input.id = "question-input-" + i;
    document.querySelector('#' + div.id).appendChild(input);

    let label = document.createElement('label');
    label.name = "question-label-" + i;
    label.id = "question-label-" + i;
    label.htmlFor = "question-input-" + i;
    label.classList.add("input-label");
    
    document.querySelector('#' + div.id).appendChild(label);  
  };
}

function removeQuestions(questionsLength) {
  for (let i = questionsLength; i >= 1; i--) {
    document.querySelector('#input-block-' + i).remove();
  }
}

function showQuestion(currentQuestion) {
  if (currentQuestion === 1) {
    document.querySelector('#back-button').classList.add("display-none"); 
  } else {
    document.querySelector('#back-button').classList.remove("display-none"); 
  };
  if (currentQuestion === totalQuestions) {
    document.querySelector('#next-button').classList.add("display-none"); 
    document.querySelector('#complete-button').classList.remove("display-none");
  } else {
    document.querySelector('#next-button').classList.remove("display-none");
    document.querySelector('#complete-button').classList.add("display-none");
  };
  document.querySelector('#question-number-string').textContent = `Question ${currentQuestion} of ${totalQuestions}:`;
  document.querySelector('#question-asked').textContent = myQuestionsMap[currentQuestion].question;
  for (let i = 1; i <= myQuestionsMap[currentQuestion].answers.length; i++) {
    document.querySelector('#question-label-' + i).textContent = myQuestionsMap[currentQuestion].answers[i-1];
  };
}

function completePage() {
  finishDate = Date.now();
  const millis = finishDate - startDate;
  const questionAreaDiv = document.createElement('div');
  questionAreaDiv.id = "question-area-div";
  document.querySelector('#quiz-results-block').appendChild(questionAreaDiv);
  
  const resultsMap = saveAnswers.map((answer, index) => myQuestionsMap[index + 1].correctAnswer === answer);
  const totalResults = Math.floor((resultsMap.filter(x => x).length / totalQuestions) * 100);
  document.querySelector('#quiz-results').textContent = `Quiz Results: ${totalResults}% in ${msToTime(millis)}`;
  saveAnswers.forEach((answer, index) => {
    const isCorrectAnswer = answer === myQuestionsMap[index + 1].correctAnswer;
    
    let isPassedText = 'Fail';
    if (isCorrectAnswer) {
      isPassedText = 'Pass';
    };
    let questionDiv = document.createElement('div');   
    questionDiv.classList.add("final-question-block"); 
    
    questionAreaDiv.appendChild(questionDiv);
    //
    
    let questionH3 = document.createElement('h3');
    questionH3.textContent =  `Question ${index + 1} of ${totalQuestions}:`;
    questionDiv.appendChild(questionH3);
    
    let questionP = document.createElement('p');
    questionP.classList.add("final-question-title"); 
    if (!isCorrectAnswer) {
      questionP.classList.add("question-failed"); 
    }
    questionP.textContent = `Result ${isPassedText}: ` + myQuestionsMap[index + 1].question;
    questionDiv.appendChild(questionP);
    myQuestionsMap[index + 1].answers.forEach(questionAnswer => {
      questionP = document.createElement('p');
      questionP.classList.add("final-question-answers"); 
      questionP.textContent = questionAnswer;
      questionDiv.appendChild(questionP);
    });
    questionP = document.createElement('p');
    questionP.classList.add("final-question-your-answer");
    if (!isCorrectAnswer) {
      questionP.classList.add("question-failed");
    } else {
      questionP.classList.add("question-passed");
    }
    questionP.textContent = "Your Answer:" + myQuestionsMap[index + 1].answers[answer - 1];
    questionDiv.appendChild(questionP);
    if (!isCorrectAnswer) {
      questionP = document.createElement('p');
      questionP.classList.add("final-question-correct-answer"); 
      questionP.textContent = "Correct Answer: " + myQuestionsMap[index + 1].answers[ myQuestionsMap[index + 1].correctAnswer - 1 ];
      questionDiv.appendChild(questionP);
    }
    
  });
  
}

