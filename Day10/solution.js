const fs = require('fs')
const path = require('path')
const { sort } = require('ramda')

// parse data
const text = fs.readFileSync(path.resolve(__dirname, './dataTest.txt'), 'utf8')
const data = sort((a, b) => a - b)(text.split('\n').map((num) => parseInt(num)))

// Function to count and multiply the numbers
function countDiff(arr) {
  let one = 1
  let three = 1
  arr.forEach((val, ind) => {
    if (arr[ind + 1] - val === 1) {
      one++
    }
    if (arr[ind + 1] - val === 3) {
      three++
    }
  })
  return one * three
}

console.log('pt1', countDiff(data))
