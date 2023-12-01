const fs = require("fs")
const path = require("path")

const getSetup = () => {
  const isPart1 = process.argv.includes("pt-1")
  const isPart2 = process.argv.includes("pt-2")
  const isTest = process.argv.includes("test")
  const useAltTest = process.argv.includes("altData")
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
    if (str.startsWith("20") && parseInt(str, 10) > 2015) {
      return true
    } else return false
  })

  if (!year) {
    throw new Error("Year not found")
  }

  const runAll = !isPart1 && !isPart2

  const inputFile = `${useAltTest && isTest ? "alt-" : ""}${
    isTest ? "test-" : ""
  }input.txt`

  // parse data to array
  const file = `${year}/${day}/${inputFile}`
  const rawInput = fs.readFileSync(path.resolve(file), "utf8")
  return { isPart1, isPart2, runAll, data: rawInput.split("\n") }
}
module.exports = { getSetup }
