
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');

const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions,currentQuestionIndex;
let quizScore = 0;


startButton.addEventListener('click', startGame);

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
})

function startGame(){
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() -0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
    quizScore = 0;
}

function setNextQuestion(){
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question){
    questionElement.innerText = question.question;

    question.answers.forEach((answer) => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });

}

function resetState(){
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e){
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;

    setStatusClass(document.body, correct === "true");
    Array.from(answerButtonsElement.children).forEach((button)=>{
        setStatusClass(button, button.dataset.correct === "true");
    })
    if(shuffledQuestions.length > currentQuestionIndex +1){
        nextButton.classList.remove("hide");
    }
    else{
        startButton.innerText = "restart";
        startButton.classList.remove("hide");
    }
    if(selectedButton.dataset.correct === "true"){
        quizScore++;
    }
    document.getElementById('right-answer').innerText = quizScore;
}


function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');

    }else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}


const questions = [
    {
        question: 'which one is a JavaScript framework', 
        answers :[
            {text: 'python', correct: false},
            {text: 'Django', correct: false},
            {text: 'react', correct: true},
            {text: 'Eclipse', correct: false}

        ],

    },
    {
        question: 'who is the president of Nigeria?', 
        answers :[
            {text: 'Peter Obi', correct: true},
            {text: 'Bola Tinubu', correct: false},

        ],

    },
    {
        question: 'what is 4+3?', 
        answers :[
            {text: '6', correct: false},
            {text: '7', correct: true},
            {text: '8', correct: false},
            {text: '9', correct: false}

        ],

    },
];