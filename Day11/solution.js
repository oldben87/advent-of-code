const fs = require('fs')
const path = require('path')

// parse data to array
const text = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf8')
const data = text.split('\n')

function countOccupied(array) {
  let occupied = 0
  array.forEach((row) => {
    row.split('').forEach((col) => {
      col === '#' ? occupied++ : null
    })
  })

  return occupied
}

function seatSwap(arr) {
  let newArr = [...arr]
  arr.forEach((row, rowInd) => {
    row.split('').forEach((col, colInd) => {
      let occupied = 0
      for (let i = rowInd - 1; i <= rowInd + 1; i++) {
        for (let j = colInd - 1; j <= colInd + 1; j++) {
          if (i === rowInd && j === colInd) {
            continue
          }
          if (arr[i] && arr[i][j] && arr[i][j] === '#') {
            occupied++
          }
        }
      }

      if (occupied === 0 && arr[rowInd][colInd] === 'L') {
        const split = newArr[rowInd].split('')
        split[colInd] = '#'
        newArr[rowInd] = split.join('')
      }

      if (occupied >= 4 && arr[rowInd][colInd] === '#') {
        const split = newArr[rowInd].split('')
        split[colInd] = 'L'
        newArr[rowInd] = split.join('')
      }
    })
  })
  return newArr.toString() === arr.toString()
    ? countOccupied(arr)
    : seatSwap(newArr)
}

console.log('pt1', seatSwap(data))
