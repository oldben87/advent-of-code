const fs = require('fs')
const path = require('path')
const { slice } = require('ramda')

// parse data
const text = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf8')
const data = text.split('\n').map((num) => parseInt(num))
console.log(data)

function sumLast25(arr) {
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

console.log(sumLast25(data))
