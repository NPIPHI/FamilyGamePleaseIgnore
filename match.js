let gameContainer = document.body.getElementsByClassName("MatchingGame")[0];
let oldCards = []
let newCards = []
let names = []
let selected = { s1: null, s2: null }
let timer = document.createElement("div");
timer.classList.add("timer");
let time;
let missingImages = [];
{
    let remove = document.currentScript.getAttribute("exclude");
    if(remove){
        missingImages = JSON.parse(remove);
    }
}

class Card {
    constructor(name, imagePath) {
        this.selected = false;
        this.visible = true;
        this.domElement = document.createElement("img");
        this.domElement.src = imagePath;
        this.match = name;
        this.domElement.classList.add("gameCard")
        this.domElement.onclick = click => { this.clicked(this) };
    }
    wrong() {
        this.domElement.classList.add("wrong");
        setTimeout(() => this.removeWrong(this), 1000);
    }
    removeWrong(ele) {
        ele.domElement.classList.remove("wrong")
    }
    show() {
        this.domElement.classList.remove("fade");
        this.visible = true;
    }
    hide() {
        this.visible = false;
        setTimeout(() => this.domElement.classList.add("fade"), 500);
    }
    add(element) {
        element.appendChild(this.domElement);
    }
    remove() {
        cardsContainer.removeChild(this.domElement);
    }
    select() {
        this.selected = true;
        this.domElement.classList.add("selected");
        if (selected.s1) {
            selected.s2 = this;
        } else {
            selected.s1 = this;
        }
    }
    deselect() {
        this.selected = false;
        this.domElement.classList.remove("selected");
        if (selected.s1 == this) { selected.s1 = null };
        if (selected.s2 == this) { selected.s2 = null };
    }
    clicked(ele) {
        if (this.selected) {
            ele.deselect();
        } else {
            ele.select()
        }
    }
}

let cardsContainer = document.createElement("div")
cardsContainer.onclick = () => {
    if (selected.s1 && selected.s2) {
        if (selected.s1.match == selected.s2.match) {
            selected.s1.hide();
            selected.s2.hide();
        } else {
            selected.s1.wrong();
            selected.s2.wrong();
            selected.s1.deselect();
            selected.s2.deselect();
        }
        selected = { s1: null, s2: null };
    }
}


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

let folderA = document.currentScript.a;
let folderB = document.currentScript.b;
let count = document.currentScript.count;
let total = document.currentScript.total;

let numbers = [];
for(let i = 1; i <= count; i++){
    numbers.push(i);
}

shuffle(numbers);

for (let i = 1; i <= count; i++) {
    if (missingImages.indexOf(numbers[i]) == -1) {
        oldCards.push(new Card(numbers[i], folderA + "/" + i + ".jpg"));
        newCards.push(new Card(numbers[i], folderB + "/" + i + ".jpg"));
    }
}

// shuffle(oldCards);
// shuffle(newCards);


let combined = oldCards.concat(newCards);
shuffle(combined);
combined.forEach(card => {
    card.add(cardsContainer);
})

let easyMode = document.createElement("button");
easyMode.innerHTML = "Too Hard? Try Easy Mode";
easyMode.addEventListener("click", (ele) => {
    ele.preventDefault();
    cardsContainer.classList.toggle("easy")
    if (cardsContainer.classList.contains("easy")) {
        easyMode.innerHTML = "Too Easy? Try Hard Mode"
    } else {
        easyMode.innerHTML = "Too Hard? Try Easy Mode"
    }
});
gameContainer.addEventListener("click", () => {
    if (time == undefined) {
        timer.innerHTML = 0;
        time = 0;
        let timeIncrement = () => {
            time++;
            timer.innerHTML = "Time: " + time;
            setTimeout(timeIncrement, 1000);
        }
        timeIncrement();
    }
})
gameContainer.appendChild(easyMode)
gameContainer.appendChild(timer);
gameContainer.appendChild(cardsContainer);

oldCards.forEach(card => card.domElement.classList.add("old"))
newCards.forEach(card => card.domElement.classList.add("new"))

// let oldImageContainer = document.createElement("div");
// let newImageContainer = document.createElement("div");
// oldCards.forEach(card => {
//     card.add(oldImageContainer);
// })

// gameContainer.appendChild(document.createElement("br"))
// newCards.forEach(card => {
//     card.add(newImageContainer);
// })

// gameContainer.appendChild(oldImageContainer)
// gameContainer.appendChild(newImageContainer);