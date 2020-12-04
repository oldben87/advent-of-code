const fs = require('fs')
const path = require('path')

// parse data to array
let text = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf8')
const data = text.split('\r\n')

/*
steps to solve day 1:
 - const col = keep track of column 
 - const row = keep track of row
 - 
 
 recursive solution?
*/

function countTrees(arr, row = 0, col = 0, count = 0) {
  arr[row][col] === '#' ? count++ : null

  if (row === arr.length - 1) {
    return count
  }

  if (!arr[row][col + 1]) {
    col = 2
  } else if (!arr[row][col + 2]) {
    col = 1
  } else if (!arr[row][col + 3]) {
    col = 0
  } else {
    col += 3
  }
  row++

  return countTrees(arr, row, col, count)
}

console.log('pt1:', countTrees(data))
