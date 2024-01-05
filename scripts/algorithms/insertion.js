async function insertionSort(arr) {
    let i, key, j;
    let n = arr.length;
    for (i = 1; i < n; i++) {
        // Choose the first element in the unsorted subarray
        key = arr[i];
        // The last element of the unsorted subarray
        j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            display.paintBar(j + 1, display.colorBarSelect);
            display.paintBar(j, display.colorBarSelect);
            await display.swap(j + 1, j);
            playSound(frequency * j);
            await delay(display.iterationDelay);
            display.paintBar(j + 1, display.colorBarDefault);
            display.paintBar(j, display.colorBarDefault);
            j--;
        }
        arr[j + 1] = key;
    }
    return arr
}
