import sheHasQuestions from "./questions/to-have/present-possessive/she-has.js";
import heHasQuestions from "./questions/to-have/present-possessive/he-has.js";
import itHasQuestions from "./questions/to-have/present-possessive/it-has.js";
import weHaveQuestions from "./questions/to-have/present-possessive/we-have.js";
import theyHaveQuestions from "./questions/to-have/present-possessive/they-have.js";

function shuffleArrays(...arrays) {
  const flattenedArray = arrays.flat();
  const shuffledArray = [];
  while (flattenedArray.length) {
    const randomIndex = Math.floor(Math.random() * flattenedArray.length);
    shuffledArray.push(flattenedArray.splice(randomIndex, 1)[0]);
  }
  return shuffledArray;
}

const questions = shuffleArrays(
  sheHasQuestions,
  heHasQuestions,
  weHaveQuestions,
  theyHaveQuestions,
  itHasQuestions
);

const container = document.getElementById("flashcard-app-container");
let currentQuestionIndex = 0;

function createDropdown(options) {
  const select = document.createElement("select");
  select.classList.add("form-select", "mb-3", "w-auto", "ms-2");

  options.forEach((option) => {
    const opt = document.createElement("option");
    opt.value = option;
    opt.textContent = option;
    select.appendChild(opt);
  });

  return select;
}

function checkAnswer() {
  const userAnswer = document.getElementById("answer").value;
  const feedback = document.getElementById("feedback");

  if (userAnswer === questions[currentQuestionIndex].correct) {
    feedback.textContent = "Correct!";
    feedback.classList.remove("text-danger");
    feedback.classList.add("text-success");
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      setTimeout(loadQuestion, 1000);
    } else {
      container.innerHTML =
        "<h3>Congratulations! You've completed the exercise!</h3>";
    }
  } else {
    feedback.textContent = "Incorrect. Please try again.";
    feedback.classList.remove("text-success");
    feedback.classList.add("text-danger");
  }
}

function loadQuestion() {
  container.innerHTML = "";
  const question = questions[currentQuestionIndex];

  const sentenceWrapper = document.createElement("div");
  sentenceWrapper.classList.add("d-flex", "align-items-center", "mb-3");

  const sentence = document.createElement("p");
  sentence.classList.add("fs-4", "fw-bold", "mb-3", "me-1");
  const sentenceParts = question.sentence.split("___");
  sentence.textContent = sentenceParts[0];
  sentenceWrapper.appendChild(sentence);

  const dropdown = createDropdown(question.options);
  dropdown.id = "answer";
  sentenceWrapper.appendChild(dropdown);

  const sentenceEnd = document.createElement("span");
  sentenceEnd.classList.add("fs-2", "fw-bold", "ms-2", "mb-3", "me-2");
  sentenceEnd.textContent = sentenceParts[1];
  sentenceWrapper.appendChild(sentenceEnd);

  container.appendChild(sentenceWrapper);

  const button = document.createElement("button");
  button.textContent = "Check Answer";
  button.classList.add("btn", "btn-primary", "ms-2", "mb-3");
  button.onclick = checkAnswer;
  container.appendChild(button);

  const feedback = document.createElement("p");
  feedback.id = "feedback";
  container.appendChild(feedback);
}

loadQuestion();
