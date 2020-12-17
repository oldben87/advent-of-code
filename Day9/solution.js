const fs = require('fs')
const path = require('path')
const { slice, splitAt, equals, tail } = require('ramda')

// parse data
const text = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf8')
const data = text.split('\n').map((num) => parseInt(num))
const dataCopy = data.slice(0)
function sumLast25(arr) {
  //change below based on input
  const numberToSum = 25

  const prevItems = slice(0, numberToSum)(arr)

  for (let a = 0; a <= prevItems.length - 1; a++) {
    for (let b = 0; b <= prevItems.length - 1; b++) {
      if (prevItems[a] + prevItems[b] === arr[numberToSum]) {
        arr.shift()
        return sumLast25(arr)
      }
      if (
        a + b !== arr[numberToSum] &&
        b === prevItems.length - 1 &&
        a === prevItems.length - 1
      ) {
        return arr[numberToSum]
      }
    }
  }
}

// funtction 2; split data at sumLast25
// set number to sum
const pt1 = sumLast25(dataCopy)
const dataSplit = splitAt(data.findIndex(equals(pt1)))(data)

function calculateSumRange(arr, matchingValue) {
  let sumIndex
  arr.reduce((acc, val, ind) => {
    if (acc === matchingValue) {
      sumIndex = ind
    }
    return acc + val
  }, 0)

  if (sumIndex) {
    const getLargest = arr.slice(0, sumIndex + 1).sort()
    return arr[0] + getLargest.pop()
  } else {
    arr.shift()
    return calculateSumRange(arr, matchingValue)
  }
}
console.time('pt1')
console.log('pt1', pt1)
console.timeEnd('pt1')

console.time('pt2')
console.log('pt2', calculateSumRange(dataSplit[0], pt1))
console.timeEnd('pt2')
