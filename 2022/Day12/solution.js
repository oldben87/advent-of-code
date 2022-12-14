const fs = require("fs")
const path = require("path")

const alphaIndex = "abcdefghijklmnopqrstuvwxyz"
// parse data to array
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .split("\n")
  .map((row) =>
    row.split("").map((letter) => {
      if (alphaIndex.includes(letter)) {
        return alphaIndex.split("").findIndex((let) => let === letter)
      }
      return letter
    })
  )

const findStartAndEnd = (map) => {
  const start = []
  const end = []

  map.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === "S") {
        start.push(rowIndex)
        start.push(colIndex)
      }

      if (cell === "E") {
        end.push(rowIndex)
        end.push(colIndex)
      }
    })
  })
  return { start, end }
}

const getDistanceToEnd = (x, y, map, visited, moveCount) => {
  if (map[x] === undefined || map[x][y] === undefined) {
    return
  }
  const memoKey = `${x}-${y}`

  if (map[x][y] === "E") {
    if (visited[memoKey] === undefined || visited[memoKey] > moveCount) {
      visited[memoKey] = moveCount
    }
    return
  }

  if (visited[memoKey] === undefined || visited[memoKey] > moveCount) {
    visited[memoKey] = moveCount
  } else {
    return
  }

  const currentValue = map[x][y] === "S" ? 0 : map[x][y]

  // left
  if (map[x - 1] !== undefined) {
    const left = map[x - 1][y]
    if (left !== undefined) {
      if (
        left <= currentValue ||
        left - 1 === currentValue ||
        (currentValue === 25 && left === "E")
      ) {
        getDistanceToEnd(x - 1, y, map, visited, moveCount + 1)
      }
    }
  }

  // right
  if (map[x + 1] !== undefined) {
    const right = map[x + 1][y]
    if (right !== undefined) {
      if (
        right <= currentValue ||
        right - 1 === currentValue ||
        (currentValue === 25 && right === "E")
      ) {
        getDistanceToEnd(x + 1, y, map, visited, moveCount + 1)
      }
    }
  }
  // up
  const up = map[x][y - 1]

  if (up !== undefined) {
    if (
      up <= currentValue ||
      up - 1 === currentValue ||
      (currentValue === 25 && up === "E")
    ) {
      getDistanceToEnd(x, y - 1, map, visited, moveCount + 1)
    }
  }
  // down
  const down = map[x][y + 1]

  if (down !== undefined) {
    if (
      down <= currentValue ||
      down - 1 === currentValue ||
      (currentValue === 25 && down === "E")
    ) {
      getDistanceToEnd(x, y + 1, map, visited, moveCount + 1)
    }
  }
}

const getShortestRoute = (map) => {
  const { start, end } = findStartAndEnd(map)

  const [startX, startY] = start

  const visitedMemo = {}

  getDistanceToEnd(startX, startY, map, visitedMemo, 0)

  return visitedMemo[`${end[0]}-${end[1]}`]
}

console.time("pt1")
console.log("pt1", getShortestRoute(input))
console.timeEnd("pt1")

// console.time("pt2")
// console.log("pt2")
// console.timeEnd("pt2")
