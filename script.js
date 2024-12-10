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
    const startButton = document.getElementById('start-btn');
    const stopButton = document.getElementById('stop-btn');
    const retryButton = document.getElementById('retry-btn');
    const userInput = document.getElementById('user-input');
    const levelSpan = document.getElementById('level');
    let startTime, endTime;

    difficultySelect.addEventListener('change', function() {
        const selectedDifficulty = difficultySelect.value;
        const randomText = texts[selectedDifficulty][Math.floor(Math.random() * texts[selectedDifficulty].length)];
        sampleTextDiv.textContent = randomText;
        levelSpan.textContent = selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1);
    });

    startButton.addEventListener('click', startTest);
    stopButton.addEventListener('click', stopTest);
    retryButton.addEventListener('click', resetTest);

    function startTest() {
        startTime = new Date();
        startButton.disabled = true;
        stopButton.disabled = false;
        userInput.disabled = false;
        userInput.value = '';
        userInput.focus();
    }

    function stopTest() {
        endTime = new Date();
        const timeTaken = (endTime - startTime) / 1000;
        const sampleText = sampleTextDiv.textContent;
        const userText = userInput.value;
        const correctWords = calculateCorrectWords(sampleText, userText);
        const wpm = calculateWPM(correctWords, timeTaken);

        document.getElementById('results-area').innerHTML += `
            <p>Time taken: ${timeTaken.toFixed(2)} seconds</p>
            <p>Words per minute: ${wpm}</p>
            <p>Level: ${levelSpan.textContent}</p>
        `;
        startButton.disabled = false;
        stopButton.disabled = true;
        userInput.disabled = true;
    }

    function resetTest() {
        userInput.value = '';
        document.getElementById('results-area').innerHTML = '<h2>Results</h2>';
        startButton.disabled = false;
        stopButton.disabled = true;
        userInput.disabled = true;
    }

    function calculateCorrectWords(sampleText, userText) {
        const sampleWords = sampleText.split(' ');
        const userWords = userText.split(' ');
        let correctWords = 0;

        for (let i = 0; i < userWords.length; i++) {
            if (userWords[i] === sampleWords[i]) {
                correctWords++;
            }
        }

        return correctWords;
    }

    function calculateWPM(correctWords, timeTaken) {
        const minutes = timeTaken / 60;
        return Math.round(correctWords / minutes);
    }

    // Trigger change event to display initial text
    difficultySelect.dispatchEvent(new Event('change'));
});