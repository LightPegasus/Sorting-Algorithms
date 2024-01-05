async function swap(arr, leftIndex, rightIndex) {
    let temp = arr[leftIndex]
    arr[leftIndex] = arr[rightIndex]
    arr[rightIndex] = temp
}

async function partition(arr, left, right) {
    // We take the middle element as the pivot of the arr in the interval (left, right)
    let pivot = arr[Math.floor((left + right) / 2)]
    let i = left
    let j = right
    while (i <= j) {
        while (arr[i] < pivot) i++
        while (arr[j] > pivot) j--
        if (i <= j) {
            await swap(arr, i, j)
            await display.swap(i, j)
            await display.paintBar(i, display.colorBarSelect)
            await display.paintBar(j, display.colorBarSelect)
            await playSound(frequency * i)
            await delay(display.iterationDelay)
            await display.paintBar(j, display.colorBarDefault)
            await display.paintBar(i, display.colorBarDefault)
            i++
            j--
        }
    }
    return i
}

async function quickSort(arr, left, right) {
    if (left === undefined) {
        left = 0;
        right = arr.length - 1;
    } else if (left >= right) {
        return arr;
    }
    let pivot // index of pivot element
    pivot = await partition(arr, left, right);
    if (left < pivot - 1) await quickSort(arr, left, pivot - 1);
    if (pivot < right) await quickSort(arr, pivot, right);
}
