const fs = require('fs')
const path = require('path')
const { sort, insert } = require('ramda')

// parse data
const text = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf8')
const data = insert(
  0,
  0,
  sort((a, b) => a - b)(text.split('\n').map((num) => parseInt(num)))
)

// Function to count and multiply the numbers
function countDiff(arr) {
  let one = 0
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

console.time('pt1')
console.log('pt1', countDiff(data))
console.timeEnd('pt1')

const memoize = (fn) => {
  let cache = {}
  return (...args) => {
    let n = args[0]
    if (n in cache) {
      return cache[n]
    } else {
      let result = fn(n)
      cache[n] = result
      return result
    }
  }
}

const numberOfValid = memoize((i = 0, steps = 1) => {
  if (data[i + 3] === data[i] + 3) {
    return numberOfValid(i + 1) + numberOfValid(i + 2) + numberOfValid(i + 3)
  }
  if (data[i + 2] <= data[i] + 3) {
    return numberOfValid(i + 1) + numberOfValid(i + 2)
  }
  if (data[i + 1] <= data[i] + 3) {
    return numberOfValid(i + 1)
  }
  return steps
})

console.time('pt2')
console.log('pt2', numberOfValid())
console.timeEnd('pt2')
