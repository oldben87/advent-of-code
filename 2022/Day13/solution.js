const fs = require("fs")
const path = require("path")
const { splitEvery } = require("ramda")

// parse data to array
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .split("\n")

const parseInput = (pairs) => {
  const parsed = splitEvery(3)(pairs)
  return parsed.map(([pair1, pair2]) => ({
    first: eval(pair1),
    second: eval(pair2),
  }))
}

const compareNumbers = (a, b) => {
  if (a > b) return false
  if (a < b) return true
  return null
}

const comparePairs = (a, b) => {
  if (a === undefined && b === undefined) return null
  if (a === undefined) return true
  if (b === undefined) return false

  if (typeof a === "number" && typeof b === "number") {
    return compareNumbers(a, b)
  }

  if (typeof a === "number" && Array.isArray(b)) {
    return comparePairs([a], b)
  }

  if (typeof b === "number" && Array.isArray(a)) {
    return comparePairs(a, [b])
  }

  if (a.length > b.length) {
    return a.reduce((correct, current, index) => {
      if (correct !== null) return correct
      return comparePairs(current, b[index])
    }, null)
  }

  return b.reduce((correct, current, index) => {
    if (correct !== null) return correct

    return comparePairs(a[index], current)
  }, null)
}

const sumValidPairIndexes = (pairs) => {
  let validIndexSums = 0
  pairs.forEach(({ first, second }, index) => {
    if (comparePairs(first, second)) {
      validIndexSums += index + 1
      console.log({ first, second, index: index + 1 })
    }
  })
  return validIndexSums
}

console.time("pt1")
console.log("pt1", sumValidPairIndexes(parseInput(input)))
console.timeEnd("pt1")

// console.time("pt2")
// console.log("pt2")
// console.timeEnd("pt2")
