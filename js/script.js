// GLOBAL VARIABLES

//Unordered list where the player’s guessed letters will appear
const guessedLettersList = document.querySelector(".guessed-letters");
//Button with the text “Guess!” in it
const guessButton = document.querySelector(".guess");
//Text input where the player will guess a letter
const letterInput = document.querySelector(".letter");
//Empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
//Paragraph where the remaining guesses will display
const remainingGuessesMessage = document.querySelector(".remaining");
//Span inside the paragraph where the remaining guesses will display
const remainingGuessesSpan = document.querySelector(".remaining span");
//Empty paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");
//Hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again");


let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    createPlaceholders(word);
};

//Start the game
getWord();

// Add placeholder symbols for each letter in the secret word

const createPlaceholders = function(word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
    ;
};

guessButton.addEventListener("click", function(e){
    e.preventDefault();
    message.innerText = "";
    const guess = letterInput.value;
    const goodGuess = validateInput(guess);
    if (goodGuess) {
        makeGuess(guess);
    }
    letterInput.value = ""
});

//Check and validate the players input

const validateInput = function(input) {
    const acceptedLetter = /[a-zA-Z]/;

    if (input.length === 0) {
        message.innerText = "You forgot to make a guess! Please enter a letter from A to Z.";
    } else if (input.length > 1) {
        message.innerText = "Please only guess one letter at a time."
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z.";
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You've already guessed that letter! Pick a different one.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showGuessedLetters();
        numGuessesRemaining(guess);
        updateWordInProgress(guessedLetters);
    }
};

//Show the guessed letters

const showGuessedLetters = function () {
    guessedLettersList.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersList.append(li);
    }
};

//Update the word in progress

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const showWord = [];
    console.log(wordArray);
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            showWord.push(letter.toUpperCase());
        } else {
            showWord.push("●");
        }
    }
    console.log(showWord);
    wordInProgress.innerText = showWord.join("");
    checkIfWinner();
};

//Count the number of guesses remaining

const numGuessesRemaining = function(guess) {
    const wordUpper = word.toUpperCase();
    if (wordUpper.includes(guess) === true) {
        message.innerText = `Good guess! The word has the letter ${guess}.`;
    } else {
        message.innerText = `Sorry, the word doesn't have the letter ${guess}.`;
        remainingGuesses -= 1;
    }
    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The secret word was <span class="highlight">${word}</span>!`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

//Check if the player won

const checkIfWinner = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = '<p class=highlight"> You guessed the correct word! Congrats!</p>';
        startOver();
    }
};

//Hide the Guess button and show the Play Again button when the game ends
const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuessesMessage.classList.add("hide");
    guessedLettersList.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    message.innerText = "";
    guessedLettersList.innerHTML = "";
    remainingGuesses = 8;
    guessedLetters = [];
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessButton.classList.remove("hide");
    remainingGuessesMessage.classList.remove("hide");
    guessedLettersList.classList.remove("hide");
    playAgainButton.classList.add("hide");
    getWord();
});