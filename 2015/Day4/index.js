const fs = require("fs")
const path = require("path")

const md5 = require("blueimp-md5")

const text = fs.readFileSync(path.resolve(__dirname, "./data.txt"), "utf8")
const test = "pqrstuv"

const findFirstKeyDecimal = (string) => {
  let number = 1
  let newHash = md5(string + number)

  while (true) {
    if (newHash.startsWith("00000")) {
      break
    }
    number += 1
    newHash = md5(string + number)
  }
  return number
}

const findSecondKeyDecimal = (string) => {
  let number = 1
  let newHash = md5(string + number)

  while (true) {
    if (newHash.startsWith("000000")) {
      break
    }
    number += 1
    newHash = md5(string + number)
  }
  return number
}

console.time("pt1")
console.log("pt1", findFirstKeyDecimal(text))
console.timeEnd("pt1")

console.time("pt2")
console.log("pt2", findSecondKeyDecimal(text))
console.timeEnd("pt2")
