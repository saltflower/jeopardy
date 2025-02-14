const categories = document.getElementsByClassName("category");
const questions = document.getElementsByClassName("question");
const categoryNames={"Sports": 21, "Animals": 27, "Science & Nature": 17, "History": 23, "Art":25};

/* add event listeners for start & reset buttons here */

const start = document.getElementById("startButton");
const reset = document.getElementById("resetButton");
const total = document.getElementById("total");
start.addEventListener("click", setToken);
reset.addEventListener("click", resetGame);
let curId;


/* complete functions below */




function startGame(){

    start.toggleAttribute("disabled");
    reset.toggleAttribute("disabled");
    
    populateBoard();
    total.textContent = 0;

    document.getElementById("submitResponse").addEventListener("click", checkResponse);
    


}

function populateBoard(){
    let categoryKeys = Object.keys(categoryNames);
    for (let i = 0; i < categories.length; i++) {
        categories[i].textContent = categoryKeys[i];
    }

    for (let i = 0; i < questions.length; i++) {
        questions[i].textContent = (Math.floor(i / 5)+1) * 10;
        questions[i].id = "q"+(i+1);
        questions[i].addEventListener("click", loadQuestion);
        switch (questions[i].textContent) {
            case "10": questions[i].setAttribute("data-cat", categoryKeys[Math.floor(i % 5)]); questions[i].setAttribute("data-difficulty", "easy"); break;
            case "20": questions[i].setAttribute("data-cat", categoryKeys[Math.floor(i % 5)]); questions[i].setAttribute("data-difficulty", "medium"); break;
            case "30": questions[i].setAttribute("data-cat", categoryKeys[Math.floor(i % 5)]); questions[i].setAttribute("data-difficulty", "medium"); break;
            case "40": questions[i].setAttribute("data-cat", categoryKeys[Math.floor(i % 5)]); questions[i].setAttribute("data-difficulty", "medium"); break;
            case "50": questions[i].setAttribute("data-cat", categoryKeys[Math.floor(i % 5)]); questions[i].setAttribute("data-difficulty", "hard"); break;
        }
    }

}






function viewQuestion(json){
    console.log(json);
    let correctAnswer = json.correct_answer;
    let optionsArr = [];
    optionsArr.push(correctAnswer);
    optionsArr.push(...json.incorrect_answers.slice(1));
    optionsArr = shuffle(optionsArr);

    console.log(optionsArr);
    // Get the modal
    // Not using var makes it global
    modal = document.getElementById("qaModal");
    let curQuestion = JSON.stringify(json.question).replace(/(&quot\;)/g, "\"").replace(/(&#039;)/g, "\'").replace(/(&uuml;)/g, "ü").replace(/(&eacute;)/g, "é").replace(/(&ouml;)/g, "ö").replace(/(&rdquo;)/g, "”").replace(/(&ldquo;)/g, "“");
    document.getElementById("questionArea").children[0].textContent = curQuestion;

    let answerArea = document.getElementById("answerArea").children[0];

    for (let i = 0; i < 3; i++) {
        answerArea.children[i].lastChild.textContent = optionsArr[i];
        if (optionsArr[i]==correctAnswer) { answerArea.children[i].firstChild.value = "correct"; }
        else { answerArea.children[i].firstChild.value = "incorrect"; }
    }

    // Get the <span> element that closes the modal
    var closeX = document.getElementsByClassName("close")[0];

    // Display modal
    modal.style.display = "block";



    // When the user clicks on <span> (x), close the modal
    closeX.onclick = function() {
        modal.style.display = "none";
    }




}


function checkResponse(e){
    e.preventDefault();
    const form = document.querySelector("form");
    const feedback = document.getElementById("feedback");
    const curEl = document.getElementById(window.localStorage.getItem("currentIndex"));
    for (let i = 0; i < form.children.length; i++) {
        if (form.children[i].firstChild.value == "correct" && form.children[i].firstChild.checked) {
            feedback.innerHTML = "Correct!";
            
            total.textContent = parseInt(total.textContent) + parseInt(curEl.textContent);
        }
        else if (form.children[i].firstChild.value == "correct" && !form.children[i].firstChild.checked) {
            feedback.innerHTML = "Wrong. The correct answer is: " + form.children[i].textContent.trim();
            
            total.textContent = parseInt(total.textContent) - parseInt(curEl.textContent);
        }
        }
        
    form.reset();
    modal.style.display = "none";
    curEl.innerHTML = "";
    curEl.removeEventListener("click", viewQuestion);
}

function resetGame(){
    total.textContent = 0;
    for (let el of questions) {
        el.id = "";
        el.removeEventListener("click", viewQuestion);
        el.textContent = "";
    }
    for (let el of categories) {
        el.textContent = "";
    }

    reset.toggleAttribute("disabled");
    start.toggleAttribute("disabled");
    document.getElementById("feedback").innerHTML = "Click Start to begin.";
}

async function setToken() {
    document.getElementById("feedback").innerText = "Loading...";
    let url = "https://opentdb.com/api_token.php?command=request";
    let response = await fetch(url);
    let json = await response.json();
    let token = (json.token);
    window.localStorage.setItem("sessionToken", token);
    document.getElementById("feedback").innerText = "Game Started";
    startGame();
}

async function loadQuestion() {
    window.localStorage.setItem("currentIndex", this.id);
    let sessionToken = window.localStorage.getItem("sessionToken");
    let categoryChosen = categoryNames[this.getAttribute("data-cat")];
    let difficulty = this.getAttribute("data-difficulty");
    let url = `https://opentdb.com/api.php?amount=1&category=${categoryChosen}&difficulty=${difficulty}&type=multiple&token=${sessionToken}`;
    
    
    try {
        let response = await fetch(url);
        let json = await response.json();
        viewQuestion(json.results[0]);
    } catch (error) {
        console.log(error);
        if (error instanceof TypeError) console.log("meow");
        if (error instanceof TypeError) document.getElementById("feedback").textContent = "Slow down!";
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
  
      // swap elements array[i] and array[j]
      // we use "destructuring assignment" syntax to achieve that
      // you'll find more details about that syntax in later chapters
      // same can be written as:
      // let t = array[i]; array[i] = array[j]; array[j] = t
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
