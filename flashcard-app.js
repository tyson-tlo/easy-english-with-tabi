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
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      setTimeout(loadQuestion, 1000);
    } else {
      container.innerHTML = "<h3>Congratulations! You've completed the exercise!</h3>";
    }
  } else {
    feedback.textContent = "Incorrect. Please try again.";
  }
}

function loadQuestion() {
  container.innerHTML = "";
  const question = questions[currentQuestionIndex];

  const sentence = document.createElement("p");
  sentence.textContent = question.sentence.replace("___", "");
  container.appendChild(sentence);

  const dropdown = createDropdown(question.options);
  dropdown.id = "answer";
  container.appendChild(dropdown);

  const button = document.createElement("button");
  button.textContent = "Check Answer";
  button.onclick = checkAnswer;
  container.appendChild(button);

  const feedback = document.createElement("p");
  feedback.id = "feedback";
  container.appendChild(feedback);
}

loadQuestion();
