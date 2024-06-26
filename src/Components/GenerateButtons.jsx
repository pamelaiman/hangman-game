export default function GenerateButtons({
    addLetterToGuessedLetters,
    displayedLetters,
    gameOver,
}) {
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
