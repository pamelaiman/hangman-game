export default function randomWordGenerated(wordLength) {
    const words = {
        3: ["cat", "dog", "sun", "bat", "hat"],
        4: ["moon", "star", "fish", "frog", "tree"],
        5: ["apple", "grape", "train", "table", "chair"],
        6: ["planet", "castle", "orange", "bottle", "sponge"],
        7: ["diamond", "picture", "monster", "country", "freight"],
        8: ["elephant", "daughter", "sentence", "building", "computer"],
        9: ["pineapple", "strawberry", "television", "kangaroos", "direction"],
        10: [
            "basketball",
            "complicated",
            "information",
            "volleyball",
            "assignment",
        ],
    };

    const listOfWords = words[wordLength];
    const randomNumber = Math.floor(Math.random() * listOfWords.length);
    return listOfWords[randomNumber];
}
