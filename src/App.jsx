// @ts-nocheck
import "./App.css";
import { useState } from "react";

function Hangman() {
    const [wordLength, setWordLength] = useState(7);
    const [randomWordToGuess, setRandomWordToGuess] = useState("");
    const [displayedLetters, setDisplayedLetters] = useState([]);
    const [misses, setMisses] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    function addLetterToGuessedLetters(letter) {
        if (randomWordToGuess.includes(letter)) {
            const newDisplayedLetters = [...displayedLetters];

            for (let i = 0; i < randomWordToGuess.length; i++) {
                if (randomWordToGuess[i] === letter) {
                    newDisplayedLetters[i] = letter;
                }
            }
            setDisplayedLetters(newDisplayedLetters);

            if (newDisplayedLetters.join("") === randomWordToGuess) {
                setGameOver(true);
                alert("You win!");
            }
        } else {
            const newMisses = misses + 1;
            setMisses(newMisses);
            if (newMisses === 10) {
                setGameOver(true);
                alert("You lose. The word was:"`${randomWordToGuess}`);
            }
        }
    }

    function GenerateButtons() {
        const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

        function createButtons() {
            return alphabet.map((letter) => (
                <button
                    className="button"
                    key={letter}
                    onClick={() => addLetterToGuessedLetters(letter)}
                    disabled={displayedLetters.includes(letter) || gameOver}
                >
                    {letter}
                </button>
            ));
        }

        return <div className="keyboard">{createButtons()}</div>;
    }

    function resetGame(newWordLength) {
        const newWord = randomWordGenerated(newWordLength);
        setRandomWordToGuess(newWord);
        setMisses(0);
        setDisplayedLetters(Array(newWord.length).fill("_"));
        setGameOver(false);
    }

    function newGameSameLength() {
        const newWord = randomWordGenerated(wordLength);
        setRandomWordToGuess(newWord);
        setMisses(0);
        setDisplayedLetters(Array(newWord.length).fill("_"));
        setGameOver(false);
    }

    function increaseWordLength() {
        if (wordLength < 10) {
            const newWordLength = wordLength + 1;
            setWordLength(newWordLength);
            resetGame(newWordLength);
        }
    }

    function decreaseWordLength() {
        if (wordLength > 3) {
            const newWordLength = wordLength - 1;
            setWordLength(newWordLength);
            resetGame(newWordLength);
        }
    }

    function randomWordGenerated(count) {
        const words = {
            3: ["cat", "dog", "sun", "bat", "hat"],
            4: ["moon", "star", "fish", "frog", "tree"],
            5: ["apple", "grape", "train", "table", "chair"],
            6: ["planet", "castle", "orange", "bottle", "sponge"],
            7: ["diamond", "picture", "monster", "country", "freight"],
            8: ["elephant", "daughter", "sentence", "building", "computer"],
            9: [
                "pineapple",
                "strawberry",
                "television",
                "kangaroos",
                "direction",
            ],
            10: [
                "basketball",
                "complicated",
                "information",
                "volleyball",
                "assignment",
            ],
        };

        const listOfWords = words[count];
        const randomNumber = Math.floor(Math.random() * listOfWords.length);
        return listOfWords[randomNumber];
    }

    if (!randomWordToGuess) {
        const word = randomWordGenerated(wordLength);
        setRandomWordToGuess(word);
        setDisplayedLetters(Array(word.length).fill("_"));
    }

    return (
        <div className="hangman-game">
            <h1 className="hangman-title">Hangman</h1>
            <h2>{displayedLetters.join(" ")}</h2>
            <p>Number of misses: {misses}</p>
            <GenerateButtons />
            <p>word length: {wordLength} letters</p>
            <button className="gameSettings" onClick={newGameSameLength}>
                New Game
            </button>
            <button className="gameSettings" onClick={decreaseWordLength}>
                ➖
            </button>
            <button className="gameSettings" onClick={increaseWordLength}>
                ➕
            </button>
        </div>
    );
}

function App() {
    return (
        <div className="hangman-main">
            <Hangman />
        </div>
    );
}

export default App;
