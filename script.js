// create a variable for our questions
var questions = [{
        title: "What does HTML stand for?",
        choices: ["HyperText Markdown Language", "HyperText Markup Language", "Help Tom Make Lasagna", "HyperTool Makes Language"],
        answer: "HyperText Markup Language"
    },
    {
        title: "What does CSS stand for?",
        choices: ["Cascading Style Sheets", "Cascading Style Sentence", "Connected Syle Short", "Can Susie Sleep"],
        answer: "Cascading Style Sheets"
    },
    {
        title: "Which is NOT an HTML element?",
        choices: ["div", "head", "long", "nav"],
        answer: "<long>"
    },
    {
        title: "Which of these IS a boolean data type?",
        choices: ["True", "Nope", "Maybe", "Not"],
        answer: "True"
    },
    {
        title: "To get the ordered list we use?",
        choices: ["h1", "ul", "ol", "ml"],
        answer: "ol"
    }
]

//data
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

// this will start our countdown
function start() {

    timeLeft = 75;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(); 
        }
    }, 1000);

    next();
}

// Functions
function endGame() {
    clearInterval(timer);

    var quizContent = `
    <h2>Game over!</h2>
    <h3>You got a ` + score +  ` /100!</h3>
    <h3>That means you got ` + score / 20 +  ` questions correct!</h3>
    <input type="text" id="name" placeholder="First name"> 
    <button onclick="setScore()">Set score!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

// this function allows use to store the highscore in local storage
function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName",  document.getElementById('name').value);
    getScore();
}


function getScore() {
    var quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 
    
    <button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>
    
    `;

    document.getElementById("quizBody").innerHTML = quizContent;
}

// this clears the name ans scored in our local storage
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName",  "");

    resetGame();
}

// this resets our game for the yser
function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;

    var quizContent = `
    <h1>
        JavaScript Quiz!
    </h1>
    <h3>
        Click to play!   
    </h3>
    <button onclick="start()">Start!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

// this function will take away 10 points from the user if they answer a question incorrectly
function incorrect() {
    timeLeft -= 10; 
    next();
}


function correct() {
    score += 25;
    next();
}


function next() {
    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }

    var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }

// inititalization
    document.getElementById("quizBody").innerHTML = quizContent;
}