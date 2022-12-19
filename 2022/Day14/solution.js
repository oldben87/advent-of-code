const fs = require("fs")
const path = require("path")

// parse data to array
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .split("\n")

const parseInput = (rockLayers) => {
  return rockLayers.map((current) => {
    let commandList = []
    current.split(" -> ").forEach((cmd) => {
      const [x, y] = cmd.split(",").map((num) => parseInt(num, 10))
      commandList.push({ x, y })
    })

    return commandList
  })
}
const coordinateString = (x, y) => `${x}-${y}`

const generateRockArray = (rockCoords) => {
  const result = []
  rockCoords.forEach((layer) => {
    layer.forEach(({ x, y }, index) => {
      result.push(coordinateString(x, y))
      if (index + 1 === layer.length) {
        return
      }
      const next = layer[index + 1]
      if (next.x === x) {
        const blocks = Math.abs(y - next.y)
        for (let i = 1; blocks > i; i++) {
          const amount = y - next.y < 0 ? y + i : y - i

          result.push(coordinateString(x, amount))
        }
      } else {
        const blocks = Math.abs(x - next.x)

        for (let i = 1; blocks >= i; i++) {
          const amount = x - next.x < 0 ? x + i : x - i

          result.push(coordinateString(amount, y))
        }
      }
    })
  })
  return Array.from(new Set(result.sort()))
}

const getLowestRockShelf = (rockLayers) => {
  return rockLayers.reduce((acc, curr) => {
    const maxY = Math.max(...curr.map(({ y }) => y))
    return acc < maxY ? maxY : acc
  }, 0)
}

const getNextMove = (currentX, currentY, filledSpaces) => {
  const y = currentY + 1

  const spaceBelow = coordinateString(currentX, currentY + 1)

  if (!filledSpaces.includes(spaceBelow)) {
    return { x: currentX, y }
  }
  const diagLeft = coordinateString(currentX - 1, currentY + 1)
  if (!filledSpaces.includes(diagLeft)) {
    return { x: currentX - 1, y }
  }

  const diagRight = coordinateString(currentX + 1, currentY + 1)
  if (!filledSpaces.includes(diagRight)) {
    return { x: currentX + 1, y }
  }

  return null
}
const countFallingSand = (layers) => {
  const parsedInput = parseInput(layers)
  const noGoArray = generateRockArray(parsedInput)

  // find lowest Y coordinate
  const lowestYCoordinate = getLowestRockShelf(parsedInput)

  // start at 500, 0 drop until you cannot move
  // if unable to go down 1, try diag left, then try diag right.
  let currentX = 500
  let currentY = 0
  let sandUnitsReleased = 0
  while (true) {
    if (currentY === lowestYCoordinate) {
      break
    }
    const nextMove = getNextMove(currentX, currentY, noGoArray)
    if (nextMove) {
      currentX = nextMove.x
      currentY = nextMove.y
    } else {
      noGoArray.push(coordinateString(currentX, currentY))
      currentX = 500
      currentY = 0
      sandUnitsReleased++
    }
  }

  return sandUnitsReleased
}

console.time("pt1")
console.log("pt1", countFallingSand(input))
console.timeEnd("pt1")

// console.time("pt2")
// console.log("pt2")
// console.timeEnd("pt2")
