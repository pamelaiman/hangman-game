import { useState } from "react";
import GenerateButtons from "./GenerateButtons";
import randomWordGenerated from "./RandomWordGenerator";
import resetGame from "./ResetGame";

export default function Hangman() {
    const [wordLength, setWordLength] = useState(7);
    const [randomWordToGuess, setRandomWordToGuess] = useState("");
    const [displayedLetters, setDisplayedLetters] = useState([]);
    const [misses, setMisses] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    if (!randomWordToGuess) {
        const word = randomWordGenerated(wordLength);
        setRandomWordToGuess(word);
        setDisplayedLetters(Array(word.length).fill("_"));
    }

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
            if (misses < 10) {
                const newMisses = misses + 1;

                if (newMisses === 10) {
                    setGameOver(true);
                    alert(`You lose. The word was: ${randomWordToGuess}`);
                } else {
                    setMisses(newMisses);
                }
            }
        }
    }

    function newGameSameLength() {
        resetGame(
            wordLength,
            setRandomWordToGuess,
            setMisses,
            setDisplayedLetters,
            setGameOver,
        );
    }

    function increaseWordLength() {
        if (wordLength < 10) {
            const newWordLength = wordLength + 1;
            setWordLength(newWordLength);
            resetGame(
                newWordLength,
                setRandomWordToGuess,
                setMisses,
                setDisplayedLetters,
                setGameOver,
            );
        }
    }

    function decreaseWordLength() {
        if (wordLength > 3) {
            const newWordLength = wordLength - 1;
            setWordLength(newWordLength);
            resetGame(
                newWordLength,
                setRandomWordToGuess,
                setMisses,
                setDisplayedLetters,
                setGameOver,
            );
        }
    }

    return (
        <div className="hangman-game">
            <h1 className="hangman-title">Hangman</h1>
            <h2>{displayedLetters.join(" ")}</h2>
            <p>Number of misses: {misses}</p>
            <GenerateButtons
                addLetterToGuessedLetters={addLetterToGuessedLetters}
                displayedLetters={displayedLetters}
                gameOver={gameOver}
            />
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
