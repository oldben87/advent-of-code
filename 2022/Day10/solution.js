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

console.time("pt1")
console.log("pt1", getSumOfPositions(input, positionsToSum))
console.timeEnd("pt1")

// console.time("pt2")
// console.log("pt2")
// console.timeEnd("pt2")
