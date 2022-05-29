const fs = require("fs")
const path = require("path")

const text = fs.readFileSync(path.resolve(__dirname, "./data.txt"), "utf8")
const strings = text.split("\n")

const vowels = ["a", "e", "i", "o", "u"]
const has3Vowels = (string) => {
  let numOfVowels = 0
  string.split("").forEach((letter) => {
    if (vowels.includes(letter)) {
      numOfVowels++
    }
  })

  return numOfVowels >= 3
}

const hasConsectuiveSameLetters = (string) => {
  const letters = string.split("")
  let twoLetters = false

  letters.forEach((letter, index, arr) => {
    if (index === letters.length - 1) {
      return
    }

    if (arr[index + 1] === letter) {
      twoLetters = true
    }
  })

  return twoLetters
}

const excludedStrings = ["ab", "cd", "pq", "xy"]

const noExcludedStrings = (string) => {
  let noExcludedString = true
  string.split("").forEach((letter, index, array) => {
    if (index === array.length - 1) {
      return
    }

    if (excludedStrings.includes(letter + array[index + 1])) {
      noExcludedString = false
    }
  })

  return noExcludedString
}

const isNice = (string) => {
  const nice =
    has3Vowels(string) &&
    hasConsectuiveSameLetters(string) &&
    noExcludedStrings(string)

  return nice
}

console.time("pt1")
console.log("pt1", strings.map(isNice).filter(Boolean).length)
console.timeEnd("pt1")

const newIsNice = (string) => {
  // break array up into all it's pairs?
  const letters = string.split("")
  const allPairs = []
  letters.forEach((letter, index, array) => {
    if (index === array.length - 1) {
      return
    }

    allPairs.push(`${letter}${array[index + 1]}`)
  })

  const nonConsectivePairs = allPairs.map((pair, index, array) => {
    return array.some((p, ind) => {
      if (ind === array.length - 1) {
        return false
      }

      if (index === ind || index === ind - 1 || index === ind + 1) {
        return false
      }
      if (pair === p) {
        return true
      }

      return false
    })
  })

  const hasMatchingSpacedLetter = letters.map((pair, index, array) => {
    return array.some((p, ind) => {
      if (ind >= array.length - 1) {
        return false
      }

      if (index === ind || ind === index - 1 || index === ind + 1) {
        return false
      }
      if (pair === p && (index === ind + 2 || index === ind - 2)) {
        return true
      }
      return false
    })
  })

  return (
    nonConsectivePairs.some((p) => p) && hasMatchingSpacedLetter.some((p) => p)
  )
}

console.time("pt2")
console.log("pt2", strings.map(newIsNice).filter(Boolean).length)
console.timeEnd("pt2")
