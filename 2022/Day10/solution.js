const { clear } = require("console")
const fs = require("fs")
const path = require("path")

// parse data to array
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .split("\n")

const parseInput = (command) => {
  const [cmd, value] = command.split(" ")
  return { value: parseInt(value, 10), isNoop: cmd === "noop" }
}

const positionsToSum = [20, 60, 100, 140, 180, 220]

const generateEmptyRow = (number) => {
  return new Array(number).fill(".").join("")
}

const getCycleRow = (cycle) => {
  if (cycle > 200) {
    return 5
  }
  if (cycle > 160) {
    return 4
  }
  if (cycle > 120) {
    return 3
  }
  if (cycle > 80) {
    return 2
  }
  if (cycle > 40) {
    return 1
  }
  return 0
}

const getSumOfPositions = (commands, sumList) => {
  const parsedInputs = commands.map(parseInput)
  let cycle = 0
  let x = 1
  const cycleSums = []
  // start cycle counter
  parsedInputs.forEach(({ isNoop, value }) => {
    if (isNoop) {
      cycle++

      if (sumList.includes(cycle)) {
        cycleSums.push(sumList[sumList.findIndex((val) => val === cycle)] * x)
      }

      return
    }
    for (let i = 0; i < 2; i++) {
      cycle++

      if (sumList.includes(cycle)) {
        cycleSums.push(sumList[sumList.findIndex((val) => val === cycle)] * x)
      }
    }
    x += value
  })
  return cycleSums.reduce((acc, curr) => acc + curr, 0)
}

const printPixels = (cmds, rows) => {
  const parsedInputs = cmds.map(parseInput)
  let cycle = 0
  let x = 1

  const output = []
  for (let i = 0; i < rows; i++) {
    output.push(generateEmptyRow(40))
  }

  parsedInputs.forEach(({ isNoop, value }) => {
    if (isNoop) {
      cycle++
      const char = (cycle % 40) - 1

      if (char === x || char === x - 1 || char === x + 1) {
        const cycleRow = getCycleRow(cycle)
        const newRow = output[cycleRow].split("")

        newRow[char] = "#"
        output[cycleRow] = newRow.join("")
      }
      return
    }

    for (let i = 0; i < 2; i++) {
      cycle++
      const char = (cycle % 40) - 1

      if (char === x || char === x - 1 || char === x + 1) {
        const cycleRow = getCycleRow(cycle)

        const newRow = output[cycleRow].split("")
        newRow[char] = "#"
        output[cycleRow] = newRow.join("")
      }
    }
    x += value
  })
  output.forEach((line) => console.log(line))
}
// console.time("pt1")
// console.log("pt1", getSumOfPositions(input, positionsToSum))
// console.timeEnd("pt1")

console.time("pt2")
console.log("pt2")
printPixels(input, 6)
console.timeEnd("pt2")
