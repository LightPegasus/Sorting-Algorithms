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

let frequency = 0 // control the hertz of the sorting sound
var context = new window.AudioContext();
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

// Change the visable value for the sliders
sliderCountNumber.oninput = function() {
    sliderCountNumberIndicator.innerHTML = "Count of number: " + this.value;
    display.fill(sliderCountNumber.value)
    arrayIsSorted = false
}

sliderIterationDelay.oninput = function () {
    sliderIterationDelayIndicator.innerHTML = "Iteration delay: " + this.value
    display.iterationDelay = parseInt(this.value)
}

buttonStartSort.addEventListener("click", async function() {
    if (!display.isSorted) {
        setStatusButtonSlides(true)
        switch (sortAlgorithm.value) {
            case ("bubbleSort"):
                await display.bubbleSort()
                console.log(display.array)
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

buttonRandomize.addEventListener("click", async function() {
    display.fill(sliderCountNumber.value);
})

// delay function for animation
async function delay(delayIter) {
    return new Promise(resolve => {
        setTimeout(() => { resolve(10) }, delayIter);
    })
}

// Load the bars
document.addEventListener("DOMContentLoaded", async function() {
    display = new Display({ box, maxValue: parseInt(sliderCountNumber.value)});
    display.fill(sliderCountNumber.value);
})