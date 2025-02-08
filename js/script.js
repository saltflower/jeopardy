
const categories=["Sports", "Animals", "Science & Nature", "History", "Art"]

/* add event listeners for start & reset buttons here */

const start = document.getElementById("startButton");
const reset = document.getElementById("resetButton");
const total = document.getElementById("total");
start.addEventListener("click", startGame);
reset.addEventListener("click", resetGame);


/* complete functions below */




function startGame(){

    start.setAttribute("disabled", true);
    reset.setAttribute("disabled", false);
    populateBoard();
    total.textContent = 0;

    document.getElementById("submitResponse").addEventListener("click", checkResponse);


}

function populateBoard(){
    const categories = document.getElementsByClassName("category");
    const questions = document.getElementsByClassName("question");

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
    
    console.log(this.id)
    // If id is set earlier, saving it to local storage
    window.localStorage.setItem("currentIndex", this.id);


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


function checkResponse(){
    const form = document.querySelector("form");
    const feedback = document.getElementById("feedback");
    console.log("helloooo");
    for (let i = 0; i < form.children.length; i++) {
        console.log(form.children[i].firstChild.value);
        if (form.children[i].firstChild.value == "correct" && form.children[i].firstChild.checked) {
            feedback.innerHTML = "Correct!";
        }
        else if (form.children[i].firstChild.value == "correct" && !form.children[i].firstChild.checked) {
           feedback.innerHTML = form.children[i].firstChild.innerHTML.trim();
           
        }
    }
    




    /* for closing modal */
    //modal.style.display = "none";
}

function resetGame(){





}