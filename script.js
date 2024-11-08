// Sample Questions
const questions = [
    { question: "Which is a valid C expression?", options: ["int my_num = 100,000", "int my_num = 100000;", "int my num = 1000", "int $my_num = 10000"], answer: 1 },
    { question: "Which of the following is true for variable names in C?", options: ["They can contain alphanumeric characters as well as special characters", "It is not an error to declare a variable to be one of the keywords (like goto, static)", "Variable names cannot start with a digit", "Variable can be of any length"], answer: 2 },
    { question: "Which of the following cannot be a variable name in C", options: ["Volatile", "True", "Friend", "Export"], answer: 0},
    { question: "What is short int in C programming?", options: ["The basic data type of C", "Qualifier", "Short is the qualifier and int is the basic data type", "All of the mentioned"], answer: 2},
    { question: "Which of the following declaration is not supported by C language?", options: ["String str;", "char *str;", "float str = 3e2;"," Both “String str;” and “float str = 3e2;”" ], answer: 0},
    { question: "Which of the following is the correct syntax of including a user defined header files in C++?", options: ["#include [userdefined]", "#include “userdefined”", "#include <userdefined.h>", "#include <userdefined>"], answer: 1},
    { question: "Which of the following is a correct identifier in C++?", options: ["VAR_1234", " $var_name", "7VARNAME", "7var_name"], answer: 0},
    { question: "Which of the following approach is used by C++?", options: ["Left-right", "Right-left", "Bottom-up", "Top-bottom"], answer: 2},
    { question: "Which of the following is correct about this pointer in C++?", options: ["this pointer is passed as a hidden argument in all static variables of a class", "this pointer is passed as a hidden argument in all the functions of a class", "this pointer is passed as a hidden argument in all non-static functions of a class", "this pointer is passed as a hidden argument in all static functions of a class"], answer: 2},
    { question: "Which of the following type is provided by C++ but not C?", options: ["double", "float", "int", "bool"], answer: 3},
    { question: "Which component is used to compile, debug and execute the java programs?", options: ["JRE", "JIT", "JDK", "JVM"], answer: 2},
    { question: "Which of these cannot be used for a variable name in Java?", options: ["identifier & keyword", "identifier", "keyword", "none of the above"], answer: 2},
    { question: "What is not the use of “this” keyword in Java?", options: ["Referring to the instance variable when a local variable has the same name", "Passing itself to the method of the same class", "Passing itself to another method", "Calling another constructor in constructor chaining"], answer: 1},
    { question: "Which of the following is a type of polymorphism in Java Programming?", options: ["Multiple polymorphism", "Compile time polymorphism", "Multilevel polymorphism", "Execution time polymorphism"], answer: 1},
    { question: "What is Truncation in Java?", options: ["Floating-point value assigned to a Floating type", "Floating-point value assigned to an integer type", "Integer value assigned to floating type", "Integer value assigned to floating type"], answer: 1},
    { question: "Which type of Programming does Python support?", options: ["object-oriented programming", "Structured Programming", "functional programming", "all of the above"], answer: 3},
    { question: "is Python case sensitive when dealing with indentifiers?", options: ["no", "yes", "Machine Independent", "none of the above"], answer: 1},
    { question: "is python code is compiled or interpreted?", options: ["both", "neither compiled nor interpreted", "only compiled", "only interpreted"], answer: 0},
    { question: "All keywords in the python are ____", options: ["Capitalized", "lower case", "UPPER CASE", "none of the above"], answer: 3},
    { question: "Which of the following is used to define a block of code in Python language?", options: ["Indentation", "Key", "Brackets", "All of the above"], answer: 0}
];

let candidateName = "";
let candidateMobile = "";
let userAnswers = new Array(questions.length).fill(null);
let markedForReview = new Array(questions.length).fill(false);
let currentQuestion = 0;

// Elements
const welcomeScreen = document.getElementById('welcomeScreen');
const quizScreen = document.getElementById('quizScreen');
const resultScreen = document.getElementById('resultScreen');
const questionText = document.getElementById('questionText');
const optionsDiv = document.getElementById('options');
const tracker = document.getElementById('tracker');

// Start Quiz
document.getElementById('startBtn').addEventListener('click', () => {
    candidateName = document.getElementById('name').value;
    candidateMobile = document.getElementById('mobile').value;
    if (candidateName && candidateMobile) {
        welcomeScreen.style.display = 'none';
        quizScreen.style.display = 'flex';
        loadQuestion();
        updateTracker();
    } else {
        alert("Please enter your name and mobile number.");
    }
});

// Load Question
function loadQuestion() {
    const question = questions[currentQuestion];
    questionText.innerText = question.question;
    optionsDiv.innerHTML = ""; // Clear previous options
    question.options.forEach((option, index) => {
        const optionBtn = document.createElement("button");
        optionBtn.innerText = option;
        optionBtn.onclick = () => selectAnswer(index);
        optionBtn.className = userAnswers[currentQuestion] === index ? "selected option-btn" : "option-btn";
        optionsDiv.appendChild(optionBtn);
    });
}

// Select Answer
function selectAnswer(index) {
    userAnswers[currentQuestion] = index;
    loadQuestion(); // Reload question to update selected option styling
    updateTracker();
}

// Navigation Between Questions
function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    }
}

// Mark for Review
function markForReview() {
    markedForReview[currentQuestion] = !markedForReview[currentQuestion];
    updateTracker();
}

// Update Tracker
function updateTracker() {
    tracker.innerHTML = "";
    questions.forEach((_, index) => {
        const status = userAnswers[index] !== null ? "attempted" : markedForReview[index] ? "review" : "unattempted";
        const span = document.createElement("span");
        span.innerText = index + 1;
        span.className = status;
        tracker.appendChild(span);
    });
}

// Submit Quiz
function submitQuiz() {
    const score = userAnswers.reduce((acc, answer, index) => acc + (answer === questions[index].answer ? 1 : 0), 0);
    const grade = score > 15 ? "A" : score > 10 ? "B" : "C";
    quizScreen.style.display = 'none';
    resultScreen.style.display = 'block';
    document.getElementById('resultName').innerText = candidateName;
    document.getElementById('resultMobile').innerText = candidateMobile;
    document.getElementById('scoreText').innerText = `Score: ${score}/${questions.length}`;
    document.getElementById('gradeText').innerText = `Grade: ${grade}`;
}