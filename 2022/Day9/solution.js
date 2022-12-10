const fs = require("fs")
const path = require("path")

// parse data to array
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .split("\n")
  .map((cmd) => {
    const [direction, steps] = cmd.split(" ")

    return { direction, steps: parseInt(steps, 10) }
  })

const getTailCoords = (head, tail) => {
  let x = tail.x
  let y = tail.y
  const makeHorizontalStep = Math.abs(head.x - tail.x) > 1
  const makeVerticalalStep = Math.abs(head.y - tail.y) > 1

  if (makeHorizontalStep) {
    x = (head.x + tail.x) / 2
  }
  if (makeVerticalalStep) {
    y = (head.y + tail.y) / 2
  }
  if (makeHorizontalStep && !makeVerticalalStep) {
    y = head.y
  }

  if (!makeHorizontalStep && makeVerticalalStep) {
    x = head.x
  }

  return { x, y }
}

const getTailUniqueSteps = (commands) => {
  const headCoords = { x: 0, y: 0 }
  let tailCoods = { x: 0, y: 0 }
  let uniqueSteps = []

  commands.forEach(({ direction, steps }) => {
    for (let i = 0; i < steps; i++) {
      if (direction === "R") {
        headCoords.x++
      }
      if (direction === "L") {
        headCoords.x--
      }
      if (direction === "U") {
        headCoords.y--
      }
      if (direction === "D") {
        headCoords.y++
      }

      tailCoods = getTailCoords(headCoords, tailCoods)
      uniqueSteps.push(`${tailCoods.x}-${tailCoods.y}`)
    }
  })

  return new Set(uniqueSteps).size
}

const get9TailUniqueSteps = (commands) => {
  const headCoords = { x: 0, y: 0 }
  let tail1Coods = { x: 0, y: 0 }
  let tail2Coods = { x: 0, y: 0 }
  let tail3Coods = { x: 0, y: 0 }
  let tail4Coods = { x: 0, y: 0 }
  let tail5Coods = { x: 0, y: 0 }
  let tail6Coods = { x: 0, y: 0 }
  let tail7Coods = { x: 0, y: 0 }
  let tail8Coods = { x: 0, y: 0 }
  let tail9Coods = { x: 0, y: 0 }

  let uniqueSteps = []

  commands.forEach(({ direction, steps }) => {
    for (let i = 0; i < steps; i++) {
      if (direction === "R") {
        headCoords.x++
      }
      if (direction === "L") {
        headCoords.x--
      }
      if (direction === "U") {
        headCoords.y--
      }
      if (direction === "D") {
        headCoords.y++
      }

      tail1Coods = getTailCoords(headCoords, tail1Coods)
      tail2Coods = getTailCoords(tail1Coods, tail2Coods)
      tail3Coods = getTailCoords(tail2Coods, tail3Coods)
      tail4Coods = getTailCoords(tail3Coods, tail4Coods)
      tail5Coods = getTailCoords(tail4Coods, tail5Coods)
      tail6Coods = getTailCoords(tail5Coods, tail6Coods)
      tail7Coods = getTailCoords(tail6Coods, tail7Coods)
      tail8Coods = getTailCoords(tail7Coods, tail8Coods)
      tail9Coods = getTailCoords(tail8Coods, tail9Coods)
      uniqueSteps.push(`${tail9Coods.x}-${tail9Coods.y}`)
    }
  })

  return new Set(uniqueSteps).size
}

console.time("pt1")
console.log("pt1", getTailUniqueSteps(input))
console.timeEnd("pt1")

console.time("pt2")
console.log("pt2", get9TailUniqueSteps(input))
console.timeEnd("pt2")
