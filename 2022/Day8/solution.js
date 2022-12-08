const fs = require("fs")
const path = require("path")

// parse data to array
const text = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .split("\n")
const grid = text.map((treeRow) => treeRow.split(""))

const findVisibleTrees = (input) => {
  // count edges
  let visible = 0
  for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
    for (let colIndex = 0; colIndex < input[0].length; colIndex++) {
      if (rowIndex === 0 || rowIndex === input.length - 1) {
        visible++
        continue
      }
      if (colIndex === 0 || colIndex === input[0].length - 1) {
        visible++
        continue
      }

      const height = input[rowIndex][colIndex]

      // check up
      let toCheck = []

      for (let row = rowIndex - 1; row >= 0; row--) {
        toCheck.push(input[row][colIndex])
      }

      if (toCheck.every((tree) => height > tree)) {
        visible++
        continue
      } else {
        toCheck = []
      }

      // check down
      for (let row = rowIndex + 1; row < input.length; row++) {
        toCheck.push(input[row][colIndex])
      }

      if (toCheck.every((tree) => height > tree)) {
        visible++
        continue
      } else {
        toCheck = []
      }

      // check left
      for (let col = colIndex - 1; col >= 0; col--) {
        toCheck.push(input[rowIndex][col])
      }

      if (toCheck.every((tree) => height > tree)) {
        visible++
        continue
      } else {
        toCheck = []
      }

      // check right
      for (let col = colIndex + 1; col < input[rowIndex].length; col++) {
        toCheck.push(input[rowIndex][col])
      }

      if (toCheck.every((tree) => height > tree)) {
        visible++
        continue
      }
    }
  }
  return visible
}

const findHighestTreeScore = (input) => {
  // count edges
  let scores = []
  for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
    for (let colIndex = 0; colIndex < input[0].length; colIndex++) {
      if (rowIndex === 0 || rowIndex === input.length - 1) {
        continue
      }
      if (colIndex === 0 || colIndex === input[0].length - 1) {
        continue
      }

      const height = input[rowIndex][colIndex]

      // check up
      let up = 0
      for (let row = rowIndex - 1; row >= 0; row--) {
        up++
        if (input[row][colIndex] >= height) {
          break
        }
      }

      // check down
      let down = 0
      for (let row = rowIndex + 1; row < input.length; row++) {
        down++
        if (input[row][colIndex] >= height) {
          break
        }
      }

      // check left
      let left = 0
      for (let col = colIndex - 1; col >= 0; col--) {
        left++
        if (input[rowIndex][col] >= height) {
          break
        }
      }

      // check right
      let right = 0
      for (let col = colIndex + 1; col < input[rowIndex].length; col++) {
        right++
        if (input[rowIndex][col] >= height) {
          break
        }
      }
      // sum and push
      scores.push(up * down * left * right)
    }
  }
  return Math.max(...scores)
}
// console.time("pt1")
// console.log("pt1", findVisibleTrees(grid))
// console.timeEnd("pt1")

console.time("pt2")
console.log("pt2", findHighestTreeScore(grid))
console.timeEnd("pt2")
