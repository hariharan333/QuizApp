const questions = [
    {
        question: "Which is the largest element in the world?",
        answeres: [
            { text: "Shark", correct: false},
            { text: "Blue wales", correct: true},
            { text: "Elephant", correct: false},
            { text: "Giraffe", correct:false},
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answeres: [
            { text: "Vatican City", correct: true},
            { text: "Bhutan", correct: false},
            { text: "Nepal", correct: false},
            { text: "Sri Lanka", correct:false},
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answeres: [
            { text: "kalahari", correct: false},
            { text: "Gobi", correct: false},
            { text: "Sahara", correct: false},
            { text: "Antarctica", correct:true},
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answeres: [
            { text: "Asia", correct: false},
            { text: "Australia", correct: true},
            { text: "Arctic", correct: false},
            { text: "Africa", correct:false},
        ]
    }
];
const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer-buttons");
const nextBtnElement = document.getElementById("next-btn"); 

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtnElement.innerHTML = "Next"
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    questionElement.innerHTML = questionNo+". "+currentQuestion.question;

    currentQuestion.answeres.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerElement.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    })
}

function resetState(){
    nextBtnElement.style.display = "none";
    while(answerElement.firstChild){
        answerElement.removeChild(answerElement.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerElement.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtnElement.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you are scored ${score} out of ${questions.length}!`;
    nextBtnElement.innerHTML = "Play Again";
    nextBtnElement.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextBtnElement.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();