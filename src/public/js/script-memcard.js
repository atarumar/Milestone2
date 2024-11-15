const cardsContainer = document.getElementById("cards-container");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const currentElement = document.getElementById("current");
const submitAnswerButton = document.getElementById("submitAnswer");
const userAnswerInput = document.getElementById("userAnswer");

let currentActiveCard = 0;
const cardsElement = [];

getEthicsState().then((ethicsState) => {
  // Use the ethicsState as the current active card index
  currentActiveCard = ethicsState || 0; // Default to 0 if ethicsState is undefined
  
  // Create cards and set the active card based on currentActiveCard
  createCards(currentActiveCard);
  
  updateCurrentText();
});

const cardsData = [
  { question: "What is digital privacy?", answer: "Protecting data" },
  { question: "What does cyberbullying involve?", answer: "Online harassment" },
  { question: "What is plagiarism?", answer: "Copying without credit" },
  { question: "What is online consent?", answer: "Agreeing to terms" },
  { question: "What is netiquette?", answer: "Online etiquette" },
  { question: "What is data misuse?", answer: "Unauthorized use" },
  { question: "What is digital footprint?", answer: "Online activity trail" }
];

function createCards(activeIndex) {
  // Clear previous cards if any
  cardsElement.length = 0; // Clear the array
  cardsContainer.innerHTML = ""; // Clear the container

  // Create cards and set active class on the initial active card
  cardsData.forEach((data, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    if (index === activeIndex) {
      card.classList.add("active");
    }

    card.innerHTML = `
      <div class="inner-card">
          <div class="inner-card-front">
              <p>${data.question}</p>
          </div>
          <div class="inner-card-back">
              <p>${data.answer}</p>
          </div>
      </div>
    `;

    cardsElement.push(card);
    cardsContainer.appendChild(card);
  });
}

function updateCurrentText() {
  currentElement.innerText = `${currentActiveCard + 1}/${cardsElement.length}`;
}

nextButton.addEventListener("click", () => {
  cardsElement[currentActiveCard].classList.remove("active");
  cardsElement[currentActiveCard].classList.add("left");

  currentActiveCard = (currentActiveCard + 1) % cardsElement.length;

  cardsElement[currentActiveCard].classList.remove("left", "right");
  cardsElement[currentActiveCard].classList.add("active");

  updateCurrentText();
});

prevButton.addEventListener("click", () => {
  cardsElement[currentActiveCard].classList.remove("active");
  cardsElement[currentActiveCard].classList.add("right");

  currentActiveCard = (currentActiveCard - 1 + cardsElement.length) % cardsElement.length;

  cardsElement[currentActiveCard].classList.remove("left", "right");
  cardsElement[currentActiveCard].classList.add("active");

  updateCurrentText();
});

submitAnswerButton.addEventListener("click", () => {
  const userAnswer = userAnswerInput.value.trim().toLowerCase();
  const correctAnswer = cardsData[currentActiveCard].answer.toLowerCase();

  cardsElement[currentActiveCard].classList.add("show-answer");
});


const resultText = document.getElementById("result");


submitAnswerButton.addEventListener("click", () => {
  const userAnswer = answerInput.value.trim().toLowerCase();
  const correctAnswer = cardsData[currentActiveCard].answer.toLowerCase();

  if (userAnswer === correctAnswer) {
    totalCorrect = totalCorrect + 1;
    resultText.innerText = "Correct!";
    resultText.style.color = "green"; 
    cardsElement[currentActiveCard].classList.add("show-answer"); 
  } else {
    resultText.innerText = `Incorrect! The correct answer is: ${cardsData[currentActiveCard].answer}`;
    resultText.style.color = "red"; 
    cardsElement[currentActiveCard].classList.add("show-answer"); 
  }
});

const button = document.getElementById("updateEthicsButton");

async function getEthicsState() {
  try {
      const response = await fetch("/getEthicsState", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
          const data = await response.json();
          console.log("Current Ethics State:", data.ethicsState);

          return data.ethicsState;
      } else {
          console.error("Failed to retrieve ethics state");
      }
  } catch (error) {
      console.error("Error:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {

  const saveButton = document.querySelector(".save");

  saveButton.addEventListener("click", async () => {
      const saveCur = currentActiveCard;
      console.log("save current:", saveCur);

      try {
          const response = await fetch("/updateEthicsState", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ saveCur }),
          });
          const data = await response.json();

          if (response.ok) {
              console.log(data.message);
          } else {
              console.error(data.message);
          }
      } catch (error) {
          console.error("Error:", error);
      }
  });
});