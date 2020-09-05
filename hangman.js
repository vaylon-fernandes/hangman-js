/**
* Hangman Javascript class
* Author: @jelofsson
* Author: @JadeMaverc
**/

var wordlist = [
    {
        "word": "SPHIX MACAW",
        "hint": "Also know as the little blue macaw and went extinct due to habit extinction"
    },
    {
        "word": "HIBISCUS",
        "hint": "A flower whose most common feature is an epicalyx and the stamens are typically fused into tube"
    },
    {
        "word": "MINT",
        "hint": "Manufacturers of toothpaste, gum, candy, and beauty products often use this plant's oil"
    },
    {
        "word": "DOG",
        "hint": "Man's best friend"
    },
    {
        "word": "OSTRICH",
        "hint": "a flightless bird with the largest eggs"
    },
    {
        "word": "FLAMINGO",
        "hint": "a tall pink wading bird with a thick downturned bill"
    },
    {
        "word": "ETYMOLOGY",
        "hint": "the study of the origin of words and the way in which their meanings have changed throughout history."
    },
    {
        "word": "KIWI",
        "hint": "A flightless bird native to New zealand and is also the name of a fruit"
    },
    {
        "word": "BLUE WHALE",
        "hint": "Largest mammal on earth"
    },
    {
        "word": "BUMBLEBEE BAT",
        "hint": "Smallest mammal on earth"
    },
    {
        "word": "MANGO",
        "hint": "National fruit of India, Haiti, and the Philippines, belonging to the cashew family"
    },
    {
        "word": "ENVIRONMENT",
        "hint": "Habitat or natural surroundings"
    },
    {
        "word": "TIGER",
        "hint": "Large striped animal of the cat family"
    },
    {
        "word": "GRETA THUNBERG",
        "hint": "Swedish environmental activist"
    },
    {
        "word": "ANTARCTICA",
        "hint": "the southernmost continent and site of the South Pole"
    },
    {
        "word": "PANGOLIN",
        "hint": "Scaly aardvark"
    },
    {
        "word": "MANGA",
        "hint": "Japanese Comic books"
    },
    {
        "word": "COYOTE",
        "hint": "Trickster who want to catch the Roadrunner"
    },
    {
        "word": "MAUNA KEA",
        "hint": "tallest mountain on Earth"
    },
    {
        "word": "AMAZON",
        "hint": "Largest tropical forest in the world"
    }
];

var Hangman = (function () {

    'use strict';

    function Hangman(elId) {

        // Dom is ready
        this.elId       = elId;
        this.words      = [];
        this.hints      = [];

        wordlist.forEach( entry => {
            this.words.push(entry.word);
            this.hints.push(entry.hint);
        })
        
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

        // Show spaces
        this.guess(' ');
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

        if (this.WORD.indexOf(guess) < 0 && guess != ' ') {

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