import randomWordGenerated from "./RandomWordGenerator";

export default function resetGame(
    newWordLength,
    setRandomWordToGuess,
    setMisses,
    setDisplayedLetters,
    setGameOver,
) {
    const newWord = randomWordGenerated(newWordLength);
    setRandomWordToGuess(newWord);
    setMisses(0);
    setDisplayedLetters(Array(newWord.length).fill("_"));
    setGameOver(false);
}
