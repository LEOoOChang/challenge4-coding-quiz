// Define the quiz questions and answers
const quiz = [
    {
      question: "A script that executes when the user clicks the mouse button is an example of what?",
      choices: ["An object", "An event handler", "An impossibility"],
      answer: "An event handler"
    },
    {
      question: "Which of the following are capabilities of functions in JavaScript?",
      choices: ["Accept parameters", "Return a value", "Both of the above"],
      answer: "Both of the above"
    },
    {
      question: "Which of the following is executed first by a browser?",
      choices: ["A script in the <head> section", "A script in the <body> section", "An event handler for a button"],
      answer: "A script in the <head> section"
    },
    {
      question: "Which of the following DOM objects never has a parent node?",
      choices: ["body", "div", "document"],
      answer: "document"
    },
    {
      question: "What is the meaning of the 'this' keyword in JavaScript?",
      choices: ["The current object", "The current script", "It has no meaning"],
      answer: "The current object"
    }
];
  
// Define variables
const startBtn = document.getElementById("start");
const timerEl = document.getElementById("timer");
const quizEl = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const resultsEl = document.getElementById("results");
const scoreEl = document.getElementById("score");
const initialsEl = document.getElementById("initials");
const submitBtn = document.querySelector("button[type='submit']");
let currentQuestion = 0;
let correctAnswers = 0;
let timeLeft = 60;
let timerId;

startBtn.addEventListener("click", startQuiz);
function startQuiz() {
  startBtn.style.display = "none";
  displayQuestion();
  // Start the timer
  timerId = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft === 0) {
      endQuiz();
    }
  }, 1000);
}  

// Function to display a question
function displayQuestion() {
    const question = quiz[currentQuestion];
    questionEl.textContent = question.question;
    choicesEl.innerHTML = "";
    question.choices.forEach(choice => {
      const choiceEl = document.createElement("button");
      choiceEl.textContent = choice;
      choiceEl.addEventListener("click", () => {
        // Check if the answer is correct
        if (choice === question.answer) {
          correctAnswers++;
        }
        
        currentQuestion++;
        if (currentQuestion < quiz.length) {
          displayQuestion();
        } else {
          endQuiz();
        }
      });
      
      choicesEl.appendChild(choiceEl);
    });
}
  
  // Function to end the quiz
function endQuiz() {
    clearInterval(timerId);
    quizEl.style.display = "none";
    resultsEl.style.display = "block";
    // Calculate the score
    const percentage = Math.round(correctAnswers / quiz.length * 100);
    scoreEl.textContent = `${percentage}%`;
    // Save the score to local storage
    submitBtn.addEventListener("click", () => {
      const scores = JSON.parse(localStorage.getItem("scores")) || [];
      scores.push({ initials: initialsEl.value, score });
      localStorage.setItem("scores", JSON.stringify(scores));
    });
}
