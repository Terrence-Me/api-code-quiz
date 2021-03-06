const highscoreEl = document.querySelector(".high-score");
const timeElement = document.querySelector(".time");
const testArea = document.querySelector(".test-area");
const startButton = document.querySelector(".start-button");
const testQuestions = document.getElementById("ques-tion");
const choices = document.getElementById("choices");
const comment = document.getElementById("comment");
const instructions = document.querySelector(".instructions");
let selection = document.querySelectorAll(".choice");
let results = document.getElementById("result-window");
let initialEl = document.getElementById("initials");
const sumbitbtn = document.getElementById("submit");
const finalScore = document.querySelector(".results");

let timerCount = 60;
let time;
let score = 0;

function startTest() {
  // timerCount;
  startButton.disabled = true;
  instructions.style.display = "none";
  time = setInterval(timeTracker, 1000);
  renderQuestion();
}

function timeTracker() {
  timerCount--;
  timeElement.textContent = timerCount;
  if (timerCount <= 0) {
    endTest();
  }
}

function endTest() {
  clearInterval(time);
  testArea.style.display = "none";
  results.setAttribute("style", "display: block");
  finalScore.textContent = score;
}

function answerIsWrong() {
  comment.textContent = "Wrong!";
  comment.setAttribute("style", "border-top: 3px solid #f80707");
  timerCount -= 5;
  // timeElement.textContent = timerCount;
}

function answerIsCorrect() {
  comment.textContent = "Correct!";
  comment.setAttribute("style", "border-top: 3px solid #04fa04");
}

// questions retrieved from: https://www.tutorialspoint.com/javascript/javascript_online_quiz.htm
let questions = [
  {
    question:
      "Which of the following is true about variable naming conventions in JavaScript?",
    choices: [
      "JavaScript variable names must begin with a letter or the underscore character.",
      "JavaScript variable names are case sensitive.",
      "Both of the above",
      "None of the above.",
    ],
    correct: "Both of the above",
  },
  {
    question:
      "Which of the following is the correct syntax to print a page using JavaScript?",
    choices: [
      "window.print();",
      "browser.print();",
      "navigator.print();",
      "document.print();",
    ],
    correct: "window.print();",
  },
  {
    question:
      "Which built-in method calls a function for each element in the array?",
    choices: ["while()", "loop()", "forEach()", "None of the above."],
    correct: "forEach()",
  },
  {
    question:
      "Which built-in method returns the calling string value converted to lower case?",
    choices: [
      "toLowerCase()",
      "toLower()",
      "changeCase(case)",
      "None of the above.",
    ],
    correct: "toLowerCase()",
  },
  {
    question:
      "Which of the following function of Number object returns the number's value?",
    choices: ["toString()", "valueOf()", "toLocaleString()", "toPrecision()"],
    correct: "valueOf()",
  },
  {
    question:
      "Which of the following function of String object returns the index within the calling String object of the first occurrence of the specified value?",
    choices: ["substr()", "search()", "lastIndexOf()", "indexOf()"],
    correct: "indexOf()",
  },
  {
    question:
      "Which of the following function of String object creates a string to be displayed in a big font as if it were in a <big> tag?",
    choices: ["anchor()", "big()", "blink()", "italics()"],
    correct: "big()",
  },
  {
    question:
      "Which of the following function of String object causes a string to be displayed in the specified size as if it were in a <font size = 'size'> tag?",
    choices: ["fixed()", "fontcolor()", "fontsize()", "bold()"],
    correct: "fontsize()",
  },
  {
    question:
      "Which of the following function of Array object creates a new array with all of the elements of this array for which the provided filtering function returns true?",
    choices: ["concat()", "every()", "filter()", "some()"],
    correct: "filter()",
  },
  {
    question:
      "Which of the following function of Array object extracts a section of an array and returns a new array?",
    choices: ["reverse()", "shift()", "slice()", "some()"],
    correct: "slice()",
  },
];

// defines index of the last and first qustion in the array.
let lastQuestionIndex = questions.length - 1;
let runningQuestionIndex = 0;

//reders question to the page
function renderQuestion() {
  let q = questions[runningQuestionIndex];

  testQuestions.textContent = q.question;

  //clears the multiple choice section after each iteration.
  choices.innerHTML = "";

  // creates buttons out of each multiple choice option.
  q.choices.forEach(function (selection, i) {
    let selectionOp = document.createElement("button");
    selectionOp.setAttribute("class", "selection");
    selectionOp.setAttribute("value", selection);

    selectionOp.textContent = i + 1 + "- " + selection;

    //check whether the option cliced was correct.
    selectionOp.onclick = checkAnswer;
    // adds multiple choice options to HTML.
    choices.appendChild(selectionOp);
  });
}

// checks if ans. is correct and whether time has run out.
function checkAnswer() {
  if (this.value !== questions[runningQuestionIndex].correct) {
    answerIsWrong();
    if (timerCount <= 0) {
      timerCount = 0;
      endTest();
    }
  } else {
    answerIsCorrect();
    score += 10;
  }
  if (runningQuestionIndex < lastQuestionIndex) {
    runningQuestionIndex++;
    renderQuestion();
  }
  if (runningQuestionIndex === lastQuestionIndex) {
    endTest();
  }
  if (timerCount === 0) {
    endTest();
  }
}

function savedScore() {
  let initials = initialEl.value.trim();

  if (initials !== "") {
    let highScores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
    let newScore = {
      score: score,
      initials: initials,
    };

    highScores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highScores));

    window.location.href = "highscores.html";
  }
}

function enterKey(event) {
  if (event.key === "Enter") {
    savedScore();
  }
}
sumbitbtn.addEventListener("click", savedScore);
startButton.addEventListener("click", startTest);
