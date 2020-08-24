/**
* Hangman Javascript class
* Author: @jelofsson
**/
var Hangman = (function () {

    'use strict';

    function Hangman(elId) {

        // Dom is ready
        this.elId       = elId;
        this.words      = [];
        this.hints      = [];

        fetch('/wordlist.json')
            .then( res => res.json() )
            .then( json => json.forEach( entry => {
                this.words.push(entry.word);
                this.hints.push(entry.hint);
            }))
        
        // Hide the flower
        this.hideElementById(this.elId + "_1", null)
        this.hideElementById(this.elId + "_2", null)
        this.hideElementById(this.elId + "_3", null)
        this.hideElementById(this.elId + "_4", null)
        this.hideElementById(this.elId + "_5", null)
        this.hideElementById(this.elId + "_6", null)
    }

    Hangman.prototype.reset = function () {

        // Reset variables
        this.STOPPED        = false;
        this.MISTAKES       = 0;
        this.GUESSES        = [];
        this.INDEX          = Math.floor(Math.random() * this.words.length);
        this.WORD           = this.words[this.INDEX];
        this.HINT           = this.hints[this.INDEX];

        // Reset Elements
        this.hideElementByClass('h');
        this.showElementByIdWithContent(this.elId + "_guessbox", null);
        this.showElementByIdWithContent(this.elId + "_word", this.getGuessedfWord());
        this.showElementByIdWithContent(this.elId + "_hintbox", "<button onclick='Hangman.showHint(); return false'>HINT</button>");

        // Show the flower
        this.showElementByIdWithContent(this.elId + "_1", null)
        this.showElementByIdWithContent(this.elId + "_2", null)
        this.showElementByIdWithContent(this.elId + "_3", null)
        this.showElementByIdWithContent(this.elId + "_4", null)
        this.showElementByIdWithContent(this.elId + "_5", null)
        this.showElementByIdWithContent(this.elId + "_6", null)
    };

    Hangman.prototype.showHint = function () {

        // Replace button with hint text
        this.showElementByIdWithContent(this.elId + "_hintbox", this.HINT);
    }

    Hangman.prototype.guess = function (guess) {

        // Uppercase the guessed letter
        guess = guess.charAt(0).toUpperCase();

        if (this.STOPPED || this.GUESSES.indexOf(guess) > -1) {
            // Game stopped or allready guessed on that letter
            return;
        }

        // Add the letter to array GUESSES
        this.GUESSES.push(guess);
        // Update the word hint
        this.showElementByIdWithContent(this.elId + "_word", this.getGuessedfWord());
        // Update the guessed letter list
        this.showElementByIdWithContent(this.elId + "_guesses", this.GUESSES.join(''));

        if (this.WORD.indexOf(guess) < 0) {

            // Incorrect guess
            this.MISTAKES++;

            // Hide a petal
            this.hideElementById(this.elId + "_" + this.MISTAKES, null);

            if (this.MISTAKES === 6) {
                // Game Over
                this.showElementByIdWithContent(this.elId + "_end", "GAME OVER!<br/>The word was: " + this.WORD);
                this.STOPPED = true;
                return;
            }

        } else if (this.WORD.indexOf(this.getGuessedfWord()) !== -1) {
            // Victory
            this.showElementByIdWithContent(this.elId + "_end", "You made it!<br/>The word was: " + this.WORD);
            this.STOPPED = true;
            return;
        }

    };

    Hangman.prototype.showElementByIdWithContent = function (elId, content) {
        if (content !== null) {
            document.getElementById(elId).innerHTML = content;
        }
        document.getElementById(elId).style.opacity = 1;
    };

    Hangman.prototype.hideElementById = function (elId) {
        document.getElementById(elId).style.opacity = 0;
    }

    Hangman.prototype.hideElementByClass = function (elClass) {
        var elements = document.getElementsByClassName(elClass), i;
        for (i = 0; i < elements.length; i++) {
            elements[i].style.opacity = 0;
        }
    };

    Hangman.prototype.getGuessedfWord = function () {
        var result = "", i;
        for (i = 0; i < this.WORD.length; i++) {
            // Word characters
            result += (this.GUESSES.indexOf(this.WORD[i]) > -1) ?
                this.WORD[i] : "_";
        }
        return result;
    };

    return new Hangman('hangm');

}());