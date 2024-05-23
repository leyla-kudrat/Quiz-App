let questions = [];
let currentQuestionIndex = 0;
let userAnswers = [];

async function fetchQuestions() {
    const response = await fetch('/questions');
    questions = await response.json();
    displayQuestion();
}

function displayQuestion() {
    const quizContainer = document.getElementById('quiz-container');
    const question = questions[currentQuestionIndex];
    quizContainer.innerHTML = `
        <h2>${question.question}</h2>
        <form id="quiz-form">
            ${question.options.map((option, index) => `
                <div>
                    <input type="radio" name="answer" value="${index}" id="option${index}">
                    <label for="option${index}">${option}</label>
                </div>
            `).join('')}
        </form>
    `;
}

function submitQuiz() {
    const form = document.getElementById('quiz-form');
    const answer = form.answer.value;
    userAnswers.push(answer);
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers: userAnswers }),
    })
    .then(response => response.json())
    .then(data => {
        window.location.href = `/results?score=${data.score}`;
    });
}

window.onload = fetchQuestions;
