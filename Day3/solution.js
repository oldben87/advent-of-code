const fs = require('fs')
const path = require('path')

// parse data to array
let text = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf8')
const data = text.split('\r\n')

function countTrees(arr, right, down, row = 0, col = 0, count = 0) {
  arr[row][col] === '#' ? count++ : null

  if (row === arr.length - 1) {
    return count
  }

  for (let i = 1; i <= right; i++) {
    if (arr[row][col + 1]) {
      col++
    } else {
      col = 0
    }
  }

  row += down

  return countTrees(arr, right, down, row, col, count)
}
const pt2 =
  countTrees(data, 1, 1) *
  countTrees(data, 3, 1) *
  countTrees(data, 5, 1) *
  countTrees(data, 7, 1) *
  countTrees(data, 1, 2)

console.log('pt1:', countTrees(data, 3, 1))
console.log('pt2:', pt2)
