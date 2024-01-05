async function selectionSort(arr) {
    let i, j;
    const n = arr.length;
    for (i = 0; i < n; i++) {
        let min = i;
        for (j = i + 1; j < n; j++) {
            display.paintBar(i, display.colorBarSelect);
            display.paintBar(j, display.colorBarSelect);
            display.paintBar(min, "green");
            if (arr[min] > arr[j]) {
                await delay(display.iterationDelay);
                display.paintBar(min, display.colorBarDefault);
                min = j;
                display.paintBar(min, "green");
            }
            await delay(display.iterationDelay);
            display.paintBar(j, display.colorBarDefault);
        }
        if (i != min) {
            await display.swap(i, min);
            [arr[i], arr[min]] = [arr[min], arr[i]];
            await delay(display.iterationDelay);
            playSound(frequency * j);
            display.paintBar(i, display.colorBarDefault);
            display.paintBar(min, display.colorBarDefault);
        }
        else {
            await delay(display.iterationDelay);
            display.paintBar(i, display.colorBarDefault);
            display.paintBar(j-1, display.colorBarDefault);
        }
    }
    return arr;
}
