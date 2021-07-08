//Creating sortingOuter Element
const sortingOuter = document.createElement('div')
sortingOuter.classList.add('sortingOuter')

//Creating array of number Elements
const numberElements = []
for (let i = 0; i < 38; i++) {
    let numberElement = document.createElement('div')
    numberElement.setAttribute('id', 'numberElements')
    numberElements.push(numberElement)
}

//pushing the array of number elements into sortingOuter
numberElements.forEach(numberElement => sortingOuter.appendChild(numberElement))

//Prepanding it to bosy element
document.body.prepend(sortingOuter)

// function that returns random number in a given Range.
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

let randomHeight = []; // array of random and unique number in a given range.
while (randomHeight.length < numberElements.length) {
    var r = Math.floor(randomNumber(200, sortingOuter.offsetHeight - 10)) + 1;
    if (randomHeight.indexOf(r) === -1) randomHeight.push(r);
}

// set the height of each number elements.
numberElements.forEach((numElem, index) => {
    numElem.style.height = `${randomHeight[index]}px`
})

function sleep(milliseconds) { // block the callStack for the given value in argument.
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}



/* This function takes last element as pivot, places
the pivot element at its correct position in sorted
array, and places all smaller (smaller than pivot)
to left of pivot and all greater elements to right
of pivot */
async function partition(arr, low, high) {
    // return
    let pivot = arr[high]; // pivot
    let i = (low - 1); // Index of smaller element and indicates the right position of pivot found so far


    for (let j = low; j <= high - 1; j++) {
        // If current element is smaller than the pivot
        arr[j].style.backgroundColor = 'green';
        if (arr[j].offsetHeight < pivot.offsetHeight) {
            i++; // increment index of smaller element
            await sleep(200)
            let t = arr[i].offsetHeight;
            arr[i].style.height = arr[j].offsetHeight + 'px';
            arr[j].style.height = t + 'px';
        }
        arr[j].style.backgroundColor = '';
    }
    await sleep(200)
    let t = arr[i + 1].offsetHeight;
    arr[i + 1].style.height = arr[high].offsetHeight + 'px';
    arr[high].style.height = t + 'px';
    return (i + 1);
}

/* The main function that implements QuickSort
arr[] --> Array to be sorted,
low --> Starting index,
high --> Ending index */
async function quickSort(arr, low, high) {

    if (low < high) {
        arr[low].style.backgroundColor = 'orange';
        arr[high].style.backgroundColor = 'red';
        /* pi is partitioning index, arr[p] is now
        at right place */
        await sleep(200)
        let pi = await partition(arr, low, high);
        arr[low].style.backgroundColor = '';
        arr[high].style.backgroundColor = '';
        // Separately sort elements before
        // partition and after partition
        await quickSort(arr, low, pi - 1);
        await quickSort(arr, pi + 1, high);
    }
}

quickSort(numberElements, 0, parseInt(numberElements.length - 1))



// function mergeSort(arr) {

//     for (let i = 0; i < parseInt(arr.length / 2); i++) {
//         arr[i] = arr[i] + arr[arr.length - (i + 1)]
//         arr[arr.length - (i + 1)] = arr[i] - arr[arr.length - (i + 1)]
//         arr[i] = arr[i] - arr[arr.length - (i + 1)]
//     }
// }
// let arr = [10, 20, 22, 10, 4, 5, 5]
// mergeSort(arr);

// console.log(arr)