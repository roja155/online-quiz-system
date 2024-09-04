const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "Berlin", "Madrid", "Rome"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Venus", "Jupiter"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the largest mammal?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correctAnswer: "Blue Whale"
    },
    {
        question: "In which year did World War II end?",
        options: ["1943", "1945", "1947", "1950"],
        correctAnswer: "1945"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correctAnswer: "William Shakespeare"
    }
];

let currentQuestionIndex = 0;
let score = 0;

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question").innerHTML = `Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`;

    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach((option) => {
        const button = document.createElement("button");
        button.className = "option";
        button.innerHTML = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedOption === currentQuestion.correctAnswer) {
        score++;
    }

    document.getElementById("next-btn").disabled = false;
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
        document.getElementById("next-btn").disabled = true;
    } else {
        displayResult();
    }
}

function displayResult() {
    const resultContainer = document.getElementById("result-container");
    resultContainer.innerHTML = `<p>Your score: ${score} out of ${questions.length}</p>`;

    // Send result to the server
    const resultData = { score: score, totalQuestions: questions.length };
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(resultData),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

// Initial question display
displayQuestion();
function logout() {
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (confirmLogout) {
        alert("Logout successful!");
        window.location.href = "index.html";
    }
}

