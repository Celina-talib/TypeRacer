document.addEventListener('DOMContentLoaded', function() {
    const texts = {
        easy: [
            "The quick brown fox jumps over the lazy dog.",
            "Hello world!",
            "Typing is fun."
        ],
        medium: [
            "JavaScript is a versatile programming language.",
            "Practice makes perfect.",
            "Coding challenges improve problem-solving skills."
        ],
        hard: [
            "Asynchronous programming can be tricky to master.",
            "Understanding closures is crucial for JavaScript developers.",
            "The event loop is a fundamental concept in JavaScript."
        ]
    };

    const difficultySelect = document.getElementById('difficulty');
    const sampleTextDiv = document.getElementById('sample-text');

    difficultySelect.addEventListener('change', function() {
        const selectedDifficulty = difficultySelect.value;
        const randomText = texts[selectedDifficulty][Math.floor(Math.random() * texts[selectedDifficulty].length)];
        sampleTextDiv.textContent = randomText;
    });

    // Trigger change event to display initial text
    difficultySelect.dispatchEvent(new Event('change'));
});