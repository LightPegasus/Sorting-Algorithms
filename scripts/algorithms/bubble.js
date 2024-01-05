async function bubbleSort(arr) {
    let i, j;
    let n = arr.length;
    for (i = 0; i < n; i++) {
        for (j = 0; j < n - i - 1; j++) {
            display.paintBar(j+1, display.colorBarSelect);
            display.paintBar(j, display.colorBarSelect);
            if (arr[j] > arr[j + 1]) {
                await display.swap(j, j+1);
                playSound(frequency * j);
                [arr[j], arr[j + 1]] = [arr[j+1], arr[j]];
            }
            await delay(display.iterationDelay);
            display.paintBar(j+1, display.colorBarDefault);
            display.paintBar(j, display.colorBarDefault);
        }
    }
    return arr
}
