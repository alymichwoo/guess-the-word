// GLOBAL VARIABLES

//Unordered list where the player’s guessed letters will appear
const guessedLetters = document.querySelector(".guessed-letters");
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
    const letterGuessed = letterInput.value;
    console.log(letterGuessed);
    letterInput.value = "";
});