const categories = document.getElementsByClassName("category");
const questions = document.getElementsByClassName("question");


/* add event listeners for start & reset buttons here */

const start = document.getElementById("startButton");
const reset = document.getElementById("resetButton");
const total = document.getElementById("total");
start.addEventListener("click", startGame);
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
    

    const categoryNames = ["sports", "animals", "science & nature", "history", "art"];

    for (let i = 0; i < categories.length; i++) {
        categories[i].textContent = categoryNames[i];
    }

    for (let i = 0; i < questions.length; i++) {
        questions[i].textContent = (Math.floor(i / 5)+1) * 10;
        questions[i].id = "q"+(i+1);
        questions[i].addEventListener("click", viewQuestion);
    }

}






function viewQuestion(){
    
    console.log(this.id);
    // If id is set earlier, saving it to local storage
    window.localStorage.setItem("currentIndex", this.id);
    curId = this.id;

    // Get the modal
    // Not using var makes it global
    modal = document.getElementById("qaModal");

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
    const curEl = document.getElementById(curId);
    console.log("helloooo");
    for (let i = 0; i < form.children.length; i++) {
        console.log(form.children[i].firstChild.checked);
        if (form.children[i].firstChild.value == "correct" && form.children[i].firstChild.checked) {
            feedback.innerHTML = "Correct!";
            
            total.textContent = parseInt(total.textContent) + parseInt(curEl.textContent);
        }
        else if (form.children[i].firstChild.value == "correct" && !form.children[i].firstChild.checked) {
            feedback.innerHTML = "Wrong! " + form.children[i].textContent.trim() + " was the correct answer.";
            
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