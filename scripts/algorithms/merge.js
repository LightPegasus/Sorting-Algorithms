async function merge(arr, start, mid, end)
{
    let start2 = mid + 1;
 
    // If the direct merge is already sorted
    if (arr[mid] <= arr[start2]) return;
 
    // Two pointers to maintain start
    // of both arrays to merge
    while (start <= mid && start2 <= end) {
        // If element 1 is in right place
        if (arr[start] <= arr[start2]) start++;
        else {
            let value = arr[start2];
            let index = start2;
 
            // Shift all the elements between element 1
            // element 2, right by 1.
            while (index != start) {
                await display.paintBar(index, display.colorBarSelect);
                await display.changeBarHeight(index, arr[index - 1] / display.array.length * 100 );
                arr[index] = arr[index - 1];
                playSound(frequency*index);
                await display.paintBar(index, display.colorBarDefault);
                index--;
            }
            arr[start] = value;
            await display.paintBar(start, display.colorBarSelect);
            await display.changeBarHeight(index, value / display.array.length * 100);
            playSound(frequency*start);
            await delay(display.iterationDelay);
            await display.paintBar(start, display.colorBarDefault);
            
            // Update all the pointers
            start++;
            mid++;
            start2++;
        }
    }
}
 
async function mergeSort(arr, left, right) {
    if (left === undefined) {
        left = 0;
        right = arr.length - 1;
    }
    if (left < right) {
        // Same as (l + r) / 2, but avoids overflow
        // for large l and r
        let mid = left + Math.floor((right - left) / 2);

        // Sort first and second halves
        await mergeSort(arr, left, mid);
        await mergeSort(arr, mid + 1, right);

        await merge(arr, left, mid, right);
    }
}
