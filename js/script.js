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
const remainingGuesses = document.querySelector(".remaining");
//Span inside the paragraph where the remaining guesses will display
const remainingGuessesSpan = document.querySelector(".remaining span");
//Empty paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");
//Hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again");

//Starting word placeholder
const word = "magnolia";
const guessedLetters = [];

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

createPlaceholders(word);

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
    }
};