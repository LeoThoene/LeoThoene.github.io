const quizData = [
    {
        "question": "Which option correctly represents the typical order of words in a normal English sentence?",
        "options": ["Verb - Subject - Object", "Subject - Object - Verb", "Object - Subject - Verb", "Subject - Verb - Object"],
        "answer": 3
    },
    {
        "question": "In sentences with auxiliary verbs, which option shows the correct word order?",
        "options": [
            "Auxiliary verb - Main verb - Subject - Object",
            "Main verb - Subject - Auxiliary verb - Object",
            "Subject - Auxiliary verb - Main verb - Object",
            "Main verb - Auxiliary verb - Subject - Object"
        ],
        "answer": 2
    },
    {
        "question": "Which option demonstrates the correct placement of time, place, and object references in a sentence?",
        "options": [
            "Time - Place - Object - Subject - Verb",
            "Place - Time - Object - Subject - Verb",
            "Subject - Verb - Time - Place - Object",
            "Subject - Verb - Object - Place - Time"
        ],
        "answer": 3
    },
    {
        "question": "Identify the correctly negated form of the sentence 'She likes ice cream.'",
        "options": ["She doesn't like ice cream.", "She does like ice cream.", "She not like ice cream.", "She like not ice cream."],
        "answer": 0
    }
]



const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const resultElement = document.getElementById("result");
const summaryElement = document.getElementById("summary");

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionElement.innerText = currentQuizData.question;

    optionsElement.innerHTML = "";
    for (let i = 0; i < currentQuizData.options.length; i++) {
        const option = document.createElement("button");
        option.innerText = currentQuizData.options[i];
        option.classList.add("option-btn");
        optionsElement.appendChild(option);
        option.addEventListener("click", checkAnswer);
    }
}

function checkAnswer(e) {
    const selectedOption = e.target;
    const currentQuizData = quizData[currentQuestion];

    const selectedAnswer = currentQuizData.options.indexOf(selectedOption.innerText);
    if (selectedAnswer === currentQuizData.answer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionElement.style.display = "none";
    optionsElement.style.display = "none";

    resultElement.innerText = `You scored ${score} out of ${quizData.length}!`;
}

loadQuestion();

