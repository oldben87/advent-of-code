const fs = require("fs")
const path = require("path")

const DATA_PATH_ARGUMENT = "-dp"

/**
 * A function that takes 2 functions as arguements, the first part of the AoC chanllenge, and the second part of the AoC challenge.
 *
 * @typedef {Object} Options
 * @property {function=} part1 - [ (data: Array<string> | T) => number ] Function for first part of AoC challenges
 * @property {function=} part2 - [ (data: Array<string> | T) => number ] function for second part of AoC challenges
 * @property {function=} customDataParser - [ (rawData: string) => T ] optional data parser when the input is in a different shape than expected.
 * @param {Options} options - options object for
 */
const runAOC = ({ part1, part2, customDataParser }) => {
  // List of cli arguements to check for.
  const isPart1 = process.argv.includes("pt1")
  const isPart2 = process.argv.includes("pt2")
  const isTest = process.argv.includes("test")
  const useAltData = process.argv.includes("altData")
  const hasDataPath = process.argv.includes(DATA_PATH_ARGUMENT)

  let file

  if (hasDataPath) {
    const index =
      process.argv.findIndex((arg) => arg === DATA_PATH_ARGUMENT) + 1
    const maybePath = process.argv[index]
    if (maybePath === undefined) {
      throw new Error(
        `Data file path argument required after '${DATA_PATH_ARGUMENT}' command`
      )
    }
    file = maybePath
  }

  const pathToCheck = process.argv[1].split("/")
  if (file === undefined) {
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

    const inputFile = `${useAltData ? "alt-" : ""}${
      isTest ? "test-" : ""
    }input.txt`

    file = `${year}/${day}/${inputFile}`
  }

  // parse data to array
  const rawInput = fs.readFileSync(path.resolve(file), "utf8")

  const data = !!customDataParser
    ? customDataParser(rawInput)
    : rawInput.split("\n")

  const runAll = !isPart1 && !isPart2

  const runPart1 = (isPart1 || runAll) && !!part1
  const runPart2 = (isPart2 || runAll) && !!part2

  if (runPart1) {
    console.time("Part 1:")
    console.log("Part 1:", part1(data))
    console.timeEnd("Part 1:")
  }

  if (runPart2) {
    console.time("Part 2:")
    console.log("Part 2:", part2(data))
    console.timeEnd("Part 2:")
  }
}
module.exports = { runAOC }
