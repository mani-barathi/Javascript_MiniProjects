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

async function merge(arr, left, middle, right) {
    let i, j, k
    let n1 = middle - left + 1
    let n2 = right - middle

    let leftTemp = []
    let rightTemp = []

    for (i = 0; i < n1; i++)
        leftTemp[i] = arr[left + i].offsetHeight
    for (j = 0; j < n2; j++)
        rightTemp[j] = arr[middle + 1 + j].offsetHeight

    i = 0; j = 0; k = left;

    while (i < n1 && j < n2) {
        await sleep(10)
        if (leftTemp[i] <= rightTemp[j]) {
            arr[k].style.height = leftTemp[i] + 'px';
            i++;
        }
        else {
            arr[k].style.height = rightTemp[j] + 'px';
            j++;
        }
        // await sleep(10)

        k++;
    }

    /* Copy the remaining elements of L[], if there
  are any */
    while (i < n1) {
        await sleep(10)
        arr[k].style.height = leftTemp[i] + 'px';
        i++;
        k++;
    }

    /* Copy the remaining elements of R[], if there
    are any */
    while (j < n2) {
        await sleep(10)
        arr[k].style.height = rightTemp[j] + 'px';
        j++;
        k++;
    }


}

async function mergeSort(arr, left, right) {
    // console.log(left, right)
    await sleep(100)
    if (left < right) {

        arr[left].style.backgroundColor = 'orange';
        arr[right].style.backgroundColor = 'orange';

        let middle = left + parseInt((right - left) / 2)

        arr[middle].style.backgroundColor = 'red'


        await sleep(100)
        arr[left].style.backgroundColor = '';
        arr[right].style.backgroundColor = '';
        arr[middle].style.backgroundColor = ''

        await mergeSort(arr, left, middle)
        await mergeSort(arr, middle + 1, right)
        await merge(arr, left, middle, right)


    }


}


mergeSort(numberElements, 0, parseInt(numberElements.length - 1))
