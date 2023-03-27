const questions = [
  {
    sentence: "___ a car.",
    correct: "I have",
    options: ["I have", "You has", "He have"],
  },
  {
    sentence: "___ a dog.",
    correct: "She has",
    options: ["She has", "They has", "We have"],
  },
  // Add more questions here
];

const container = document.getElementById("flashcard-app-container");
let currentQuestionIndex = 0;

function createDropdown(options) {
  const select = document.createElement("select");
  select.classList.add("form-select", "mb-3", "d-inline-block");

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
      container.innerHTML = "<h3>Congratulations! You've completed the exercise!</h3>";
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
  sentence.classList.add("fs-4", "fw-bold", "mb-0");
  const sentenceParts = question.sentence.split("___");
  sentence.textContent = sentenceParts[0];
  sentenceWrapper.appendChild(sentence);

  const dropdown = createDropdown(question.options);
  dropdown.id = "answer";
  sentenceWrapper.appendChild(dropdown);

  const sentenceEnd = document.createElement("span");
  sentenceEnd.classList.add("fs-4", "fw-bold");
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
