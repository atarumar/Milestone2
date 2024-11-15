const quizData = [
  {
    question: "What is phishing?",
    a: "A type of cyber attack where emails try to steal your information",
    b: "A process to boost search engine rankings",
    c: "A method to enhance website speed",
    d: "A type of email subscription service",
    correct: "a",
  },
  {
    question: "What should you do when you receive an email from an unknown source asking for personal information?",
    a: "Respond with the information requested",
    b: "Ignore the email",
    c: "Report it as phishing or spam",
    d: "Forward it to your friends",
    correct: "c",
  },
  {
    question: "What does a secure website URL begin with?",
    a: "ftp://",
    b: "http://",
    c: "https://",
    d: "www://",
    correct: "c",
  },
  {
    question: "Which of these is a strong password?",
    a: "Password123",
    b: "yourname",
    c: "abc123456",
    d: "#S3cur3P@ssw0rd!",
    correct: "d",
  },
  {
    question: "What is a firewall?",
    a: "A physical wall that protects data centers",
    b: "A security system that monitors and controls network traffic",
    c: "An antivirus software",
    d: "A browser plugin",
    correct: "b",
  },
];

const quiz = document.getElementById("quiz");
const answerElements = document.querySelectorAll(".answer");
const questionElement = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitButton = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

const deselectAnswers = () => {
  answerElements.forEach((answer) => (answer.checked = false));
};

const getSelected = () => {
  let answer;
  answerElements.forEach((answerElement) => {
    if (answerElement.checked) answer = answerElement.id;
  });
  return answer;
};

const loadQuiz = () => {
  deselectAnswers();
  const currentQuizData = quizData[currentQuiz];
  questionElement.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
};

loadQuiz();

submitButton.addEventListener("click", () => {
  const answer = getSelected();
  if (answer) {
    if (answer === quizData[currentQuiz].correct) score++;
    currentQuiz++;
    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      if (score === 5) {
        quiz.innerHTML = `
          <h2>You answered ${score}/${quizData.length} questions correctly</h2>
          <button onclick="window.location.href='/landingpage/index.html'">Back to Home</button>
        `;
      } else {
        quiz.innerHTML = `
          <h2>You answered ${score}/${quizData.length} questions correctly</h2>
          <button onclick="history.go(0)">Play Again</button>
        `;
      }
    }
  }
});
