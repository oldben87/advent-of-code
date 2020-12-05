const fs = require('fs')
const path = require('path')

// parse data to array
let text = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf8')
const data = text.split('\r\n')

function countTrees(arr, right, down, row = 0, col = 0, count = 0) {
  // increment steps right
  const checkEnd = arr[row].slice(col + 1, col + 1 + right).length
  col = checkEnd === right ? col + right : right - 1 - checkEnd

  //move down hill
  row += down

  //check for a tree at current position
  arr[row][col] === '#' ? count++ : null

  // return if at bottom of hill
  if (row === arr.length - 1) {
    return count
  }

  return countTrees(arr, right, down, row, col, count)
}

const pt1 = countTrees(data, 3, 1)

const pt2 =
  pt1 *
  countTrees(data, 1, 1) *
  countTrees(data, 5, 1) *
  countTrees(data, 7, 1) *
  countTrees(data, 1, 2)

console.log('pt1:', pt1)
console.log('pt2:', pt2)
