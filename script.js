const startButton = document.getElementById("startButton");
const startButtonText = document.getElementById("startButtonText");
const progressInhale = document.getElementById("progressInhale");
const progressHold = document.getElementById("progressHold");
const progressExhale = document.getElementById("progressExhale");
const breathCount = document.getElementById("breathCount");

let isBreathing = false;
let inhaleInterval, holdInterval, exhaleInterval;
let breathCountValue = 0;

function startBreathing() {
    if (isBreathing) {
        // Stop the breathing exercise and reset progress
        resetBreathing();
        startButtonText.textContent = "Start Breathing";
        isBreathing = false;
    } else {
        // Start the breathing exercise
        startButtonText.textContent = "Stop Breathing";
        isBreathing = true;
        startExercise();
    }
}

document.addEventListener("keydown", (event) => {
    if (event.key === " ") {
        startButton.click();
    }
});

function updateProgressBar(progressBar, duration, callback) {
    const bar = progressBar.querySelector(".progress-bar");
    let startTime = Date.now();
    let timer = setInterval(() => {
        let elapsedTime = (Date.now() - startTime) / 1000;

        if (elapsedTime >= duration) {
            elapsedTime = duration;
            clearInterval(timer);
            if (callback) setTimeout(callback, 0);
        }

        // Update width
        const percentage = (elapsedTime / duration) * 100;
        bar.style.width = `${percentage}%`;

        // Update text
        const remainingTime = (duration - elapsedTime).toFixed(1);
        if (progressBar === progressInhale) {
            if (breathCountValue > 0) {
                breathCount.textContent = breathCountValue;
            }
            bar.textContent = `Inhale ${remainingTime}s`;
        } else if (progressBar === progressHold) {
            bar.textContent = `Hold ${remainingTime}s`;
        } else if (progressBar === progressExhale) {
            bar.textContent = `Exhale ${remainingTime}s`;
        }
    }, 100);

    if (progressBar === progressExhale) {
        
    }

    return timer;
}

function startExercise() {
    // Reset all progress bars
    resetBreathing();

    // Inhale Phase (4 seconds)
    inhaleInterval = updateProgressBar(progressInhale, 4, startHoldPhase);
}

function startHoldPhase() {
    if (!isBreathing) return;
    // Hold Phase (7 seconds)
    holdInterval = updateProgressBar(progressHold, 7, startExhalePhase);
}

function startExhalePhase() {
    if (!isBreathing) return;
    breathCountValue++;
    // Exhale Phase (8 seconds)
    exhaleInterval = updateProgressBar(progressExhale, 8, () => {
        if (isBreathing) {
            startExercise(); // Restart the cycle
        }
    });
}

function resetBreathing() {
    breathCountValue = 0;
    breathCount.textContent = "0";
    
    // Clear all intervals
    clearInterval(inhaleInterval);
    clearInterval(holdInterval);
    clearInterval(exhaleInterval);

    // Reset all progress bars to initial state
    progressInhale.querySelector(".progress-bar").style.width = "0%";
    progressInhale.querySelector(".progress-bar").textContent = "Inhale 4.0s";

    progressHold.querySelector(".progress-bar").style.width = "0%";
    progressHold.querySelector(".progress-bar").textContent = "Hold 7.0s";

    progressExhale.querySelector(".progress-bar").style.width = "0%";
    progressExhale.querySelector(".progress-bar").textContent = "Exhale 8.0s";
}

startButton.addEventListener("click", startBreathing);
