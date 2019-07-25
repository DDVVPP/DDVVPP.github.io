/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/



function generateWinningNumber() {
   return (Math.ceil(Math.random() * 100)) 
}

function newGame() {
    return new Game();
}

function shuffle(array) {
    let lastCard = array.length;
    let temp = 0;
    let i = 0;

    while(lastCard) {
        i = Math.floor(Math.random() * lastCard--)
        temp = array[lastCard];
        array[lastCard] = array[i];
        array[i] = temp;
    }

    return array;
}

class Game {
    constructor() {
        this.playersGuess = null;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber();
    }

    difference() {
        return (Math.abs(this.playersGuess - this.winningNumber));
    }

    isLower() {
        return this.playersGuess < this.winningNumber ? true : false;
    }

  

    playersGuessSubmission(num) {
        if (num > 0 && num < 101) {
            this.playersGuess = num;
            return this.checkGuess();
        } else {
            throw `That is an invalid guess.`
        }
     }

    checkGuess() {
        let inputText = '';

        if (this.playersGuess === this.winningNumber) {
            this.pastGuesses.push(this.playersGuess)
            inputText = 'You Win!'
        } else if (this.pastGuesses.length === 4) {
            inputText = 'You Lose.'
        } else if (this.pastGuesses.includes(this.playersGuess)) {
            inputText = 'You have already guessed that number.'
        } else if (this.playersGuess - this.winningNumber < 10) {
            this.pastGuesses.push(this.playersGuess);
            inputText = `You're burning up!`
        } else if (this.playersGuess - this.winningNumber < 25) {
            this.pastGuesses.push(this.playersGuess);
            inputText = `You're lukewarm.`
        } else if (this.playersGuess - this.winningNumber < 50) {
            this.pastGuesses.push(this.playersGuess);
            inputText = `You're a bit chilly.`
        } else if (this.playersGuess - this.winningNumber < 100) {
            this.pastGuesses.push(this.playersGuess);
            inputText = `You're ice cold!`
        } 
        document.querySelector('#guess-feedback > h6').innerHTML = inputText;
        document.querySelector(`#guess-list li:nth-child(${this.pastGuesses.length})`).innerHTML = this.playersGuess;

        return inputText;
    }


    provideHint() {
        const hintArray = [];
        hintArray.push(this.winningNumber);
        hintArray.push(generateWinningNumber());
        hintArray.push(generateWinningNumber());       
        let shuffledArray = shuffle(hintArray);

        document.querySelector('#hint-feedback > h6').innerHTML = `One of these is the winning number: ${shuffledArray.join(', ')}`;

        return shuffledArray;
    }
    
}

function playGame() {
    const game = newGame();

    let submitButton = document.getElementById('submit-text-btn');
    let hintButton = document.getElementById('get-hint');
    let resetButton = document.getElementById('new-game');

    submitButton.addEventListener('click', function () {
        document.querySelector('#hint-feedback > h6').innerHTML = ''
        const playersGuess = +document.querySelector('input').value;
        document.querySelector('input').value = '';

        game.playersGuessSubmission(playersGuess)
    })

    hintButton.addEventListener('click', function () {
        game.provideHint();
    })

    resetButton.addEventListener('click', function() {
        // return game = newGame();
        document.location.reload();
        
    })

}

playGame();


