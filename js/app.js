/*
 * Create a list that holds all of your cards
 */

//Nodelist listOfCards
 const listOfCards = document.querySelectorAll('.card');
 const deckofCards = document.querySelector('.deck');
 const movesa = document.querySelector('.moves');
 const redo = document.querySelector('.restart');
 //can get teh stars by query the length of stars:-)
 let usrstars = 3;
 let moves = 0;
 let time = 0;
 let matched = 0;
 let clockId;
  let openCards = [];
 let clockOff = true;




/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//Copy the cards as Nodelist into array
 const newList = Array.prototype.slice.call(listOfCards);
//Shuffle it

 //Emptey the match game cards
newStart();
 function newStart()
 {
     moves = 0;
     deckofCards.innerHTML = "";
     movesa.textContent = '0';

     shuffle(newList);

    //Loop through shuffled array and create its HTML
     for(let card of newList)
     {
         const newLi = document.createElement('li');
         newLi.innerHTML = card.innerHTML;
         //Add class (.card) for each list items
         newLi.classList.add('card');
         deckofCards.appendChild(newLi);
     }

 };






// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 deckofCards.addEventListener('click' , showSymbol);
 
//show the card symbol
function showSymbol(evt)
{
    const clickedCard = evt.target;
    if(clockOff === true)
    {
        clockOff = false;
        startClock();

    };

    if(clickedCard.classList.contains('card') && !clickedCard.classList.contains('match') && openCards.length < 2  && !openCards.includes(clickedCard))
    {
        openCard(clickedCard);
        if (openCards.length === 2) {
            cardsMatched();
            Usrmoves();
            stars();
        }

    }
    //Winners
    if(matched === 8)
        toggoleWon();

};

//Open the card and add it to array for later use
function openCard(clickedCard) {
    clickedCard.classList.add('show');
    clickedCard.classList.add('open');
    //add the card to the array
    openCards.push(clickedCard);
};

//check the add card to the array Match or Not
function cardsMatched() {
    if(
        openCards[0].firstElementChild.className === openCards[1].firstElementChild.className)
    {
        matched++;
        cardEffect('add' , 'correct')
        console.log('matched');
        cardEffect('add' , 'match');
        openCards=[];

    }else {
        cardEffect('add' , 'wrong');

        //Timeout for symbol to be shown
        setTimeout(() => {
        cardEffect('remove' , 'open');
        cardEffect('remove' , 'show');
        cardEffect('remove' , 'wrong');

        openCards = [];
    }, 1000);

    }

};


//add and remove classes(for card 1 & 2) (Easier To Read)
function cardEffect(action , efctName)
{
    if (action === 'remove'){
        openCards[0].classList.remove(efctName);
        openCards[1].classList.remove(efctName);
    }
    if (action === 'add')
    {
        openCards[0].classList.add(efctName);
        openCards[1].classList.add(efctName);
    }

};

//count user moves
function Usrmoves() {
    moves++;
    movesa.textContent = moves;

};


//Rating
function stars() {
    const lastStar = document.querySelector(".stats li:last-child");
    const removeStars = Array.prototype.slice.call(document.querySelectorAll(".stars li"));
    //Remove Last Item from the array as well DOM
    switch (moves) {
        case 14:
            removeStars.pop().remove();
            usrstars--;
            break;
        case 18:
            removeStars.pop().remove();
            usrstars--;
            break;
        // will be @ 1 star
        // case 22:
        //     removeStars.pop().remove();
        //     usrstars--;
        //     break;

        default:

    }

};

//make the div visable and change the inner html with Template
function toggoleWon() {
    stopClock();
    const wonBtn = document.createElement('button');
    const wonMsg = document.getElementById('won-game');
    const clockTime = document.querySelector('.clock').innerHTML;
    wonMsg.style.visibility= "visible";
    wonBtn.classList.add('wonBtn')
    wonBtn.textContent = "Replay"
    wonMsg.innerHTML= `<h2>Congratulations! You Won !</h2><p>with ${moves} Moves and ${usrstars} Stars , You finish within ${clockTime}.</p><p>Prees the restart button if u want to play again :-)</p>`;
    wonMsg.appendChild(wonBtn);
    wonBtn.addEventListener('click' , function(){
      window.location.reload();
    });

};


//time function [stackoverflow]
function startClock() {
    clockId = setInterval(() => {
        time++;
        displayTime();
    }, 1000);
};

function displayTime() {
    const clock = document.querySelector('.clock');
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    if (seconds < 10) {
        clock.innerHTML = `${minutes}:0${seconds}`;
    } else {
        clock.innerHTML = `${minutes}:${seconds}`;
    }
};

function stopClock() {
    clearInterval(clockId);
};



//Reload Page to restart the game
redo.addEventListener('click',function () {
    window.location.reload();
});
