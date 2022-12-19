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
    }
  })
  return validIndexSums
}

// console.time("pt1")
// console.log("pt1", sumValidPairIndexes(parseInput(input)))
// console.timeEnd("pt1")

const getIndexOfNewPairs = (pairs) => {
  const parsedInput = parseInput(pairs)
  const newArray = parsedInput.reduce((newArray, { first, second }) => {
    return [...newArray, first, second]
  }, [])
  newArray.push([[2]])
  newArray.push([[6]])

  const sortedPairs = newArray.sort((a, b) => {
    const compared = comparePairs(a, b)
    if (compared) {
      return -1
    }
    if (compared === false) {
      return 1
    }
    return 0
  })

  const indexOf2 =
    sortedPairs.findIndex((current) => {
      if (!current) return false
      if (Array.isArray(current)) {
        if (Array.isArray(current[0])) {
          return (
            current &&
            current.length === 1 &&
            current[0].length === 1 &&
            current[0][0] === 2
          )
        }
      }
      return false
    }) + 1

  const indexOf6 =
    sortedPairs.findIndex((current) => {
      if (!current) return false
      if (Array.isArray(current)) {
        if (Array.isArray(current[0])) {
          return (
            current &&
            current.length === 1 &&
            current[0].length === 1 &&
            current[0][0] === 6
          )
        }
      }
      return false
    }) + 1

  return indexOf2 * indexOf6
}

// make an array with all pairs in.

// use compare function to sort array

// find indexes (index + 1) of [[2]] * [[6]]

console.time("pt2")
console.log("pt2", getIndexOfNewPairs(input))
console.timeEnd("pt2")
