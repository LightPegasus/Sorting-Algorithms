// Global Variables
var workflow = document.getElementsByClassName("workflow")[0]
var box = document.getElementsByClassName("box")[0]
var sliderCountNumber = document.getElementsByClassName("sliderCountNumber")[0];
var sliderIterationDelay = document.getElementsByClassName("sliderIterationDelay")[0];
var sliderCountNumberIndicator = document.getElementsByClassName("sliderCountNumberIndicator")[0];
var sliderIterationDelayIndicator = document.getElementsByClassName("sliderIterationDelayIndicator")[0];
var sortAlgorithm = document.getElementsByClassName("sortAlgorithm")[0];
var buttonStartSort = document.getElementsByClassName("buttonStartSort")[0];
var buttonRandomize = document.getElementsByClassName("buttonRandomize")[0];
var buttonMute = document.getElementsByClassName("buttonMute")[0];

let frequency = 10 // control the hertz of the sorting sound
var context = new window.AudioContext(); // allow use of audio to be played
var display;

// Function for generating random number
function getRandomInt(max) { return Math.floor(Math.random() * max); }

// Function to dis/able interactables
async function setStatusButtonSlides(status) {
    buttonStartSort.disabled = status;
    sliderCountNumber.disabled = status;
    sliderIterationDelay.disabled = status;
    buttonRandomize.disabled = status;
}

// Change the number of bars
sliderCountNumber.oninput = function() {
    sliderCountNumberIndicator.innerHTML = "Count of number: " + this.value;
    display.fill(sliderCountNumber.value)
    arrayIsSorted = false
}

// Change the speed of the bars (lower is faster)
sliderIterationDelay.oninput = function () {
    sliderIterationDelayIndicator.innerHTML = "Iteration delay: " + this.value
    display.iterationDelay = parseInt(this.value)
}

// The Start button: starts the selected sort algorithm
buttonStartSort.addEventListener("click", async function() {
    if (!display.isSorted) {
        setStatusButtonSlides(true)
        switch (sortAlgorithm.value) {
            case ("bubbleSort"):
                await display.bubbleSort()
                break
            case ("insertionSort"):
                await display.insertionSort()
                break
            case ("selectionSort"):
                await display.selectionSort()
                break
            case ("quickSort"):
                await display.quickSort()
                break
            case ("mergeSort"):
                await display.mergeSort()
                break
        }
        setStatusButtonSlides(false);
    }
});

// The Randomize button: randomize the bars' positions
buttonRandomize.addEventListener("click", async function() {
    display.fill(sliderCountNumber.value);
});

// THe Mute button: silent the audio and change the text from mute <--> unmute
buttonMute.addEventListener("click", function() {
    if (frequency === 10) { 
        frequency = 0;
        buttonMute.textContent = "Unmute"
    }
    else { 
        frequency = 10;
        buttonMute.textContent = "Mute"
    }
})

// delay function for animation
async function delay(delayIter) {
    return new Promise(resolve => {
        setTimeout(() => { resolve(1_000) }, delayIter);
    })
}

// Load the bars
document.addEventListener("DOMContentLoaded", async function() {
    display = new Display({ box, maxValue: parseInt(sliderCountNumber.value) });
    display.fill(sliderCountNumber.value);
})