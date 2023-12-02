const fs = require("fs")
const path = require("path")

/**
 *
 * @param {function=} part1
 * @param {function=} part2
 */
const runAOC = (part1, part2) => {
  // List of cli arguements to check for.
  const isPart1 = process.argv.includes("pt1")
  const isPart2 = process.argv.includes("pt2")
  const isTest = process.argv.includes("test")
  const useAltData = process.argv.includes("altData")

  const pathToCheck = process.argv[1].split("/")

  const day = pathToCheck.find((str) => {
    if (str.length !== 4 && str.length !== 5) {
      return false
    }

    if (str.startsWith("Day")) {
      return true
    } else return false
  })

  if (!day) {
    throw new Error("Day not found")
  }

  const year = pathToCheck.find((str) => {
    if (str.length !== 4) {
      return false
    }
    if (str.startsWith("20") && parseInt(str, 10) >= 2015) {
      return true
    } else return false
  })

  if (!year) {
    throw new Error("Year not found")
  }

  const runAll = !isPart1 && !isPart2

  const inputFile = `${useAltData ? "alt-" : ""}${
    isTest ? "test-" : ""
  }input.txt`

  // parse data to array
  const file = `${year}/${day}/${inputFile}`
  const rawInput = fs.readFileSync(path.resolve(file), "utf8")

  const data = rawInput.split("\n")

  const runPart1 = isPart1 || runAll
  const runPart2 = isPart2 || runAll

  if (runPart1) {
    console.time("Part 1:")
    console.log("Part 1:", part1?.(data))
    console.timeEnd("Part 1:")
  }

  if (runPart2) {
    console.time("Part 2:")
    console.log("Part 2:", part2?.(data))
    console.timeEnd("Part 2:")
  }
}
module.exports = { runAOC }
