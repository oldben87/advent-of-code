const fs = require("fs")
const path = require("path")
const R = require("ramda")

const text = fs.readFileSync(path.resolve(__dirname, "./data.txt"), "utf8")
const strings = text.split("\n")

const hexCharacters = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
]

const removeValuesFromStringLength = (str) => {
  let string = str
  string.replaceAll("\\\\", "-")
  string = str.replaceAll('\\"', "-")

  const strArr = string.split("")
  let initialTotal = strArr.length - 2

  strArr.forEach((char, i) => {
    // deduct 3 from length for every /xAA if the subsequent characters are both in the hexadecimal list
    if (char === "\\" && strArr[i + 1] === "x") {
      if (
        strArr[i + 2] !== undefined &&
        strArr[i + 3] !== undefined &&
        hexCharacters.includes(strArr[i + 2]) &&
        hexCharacters.includes(strArr[i + 3])
      ) {
        initialTotal -= 3
      }
    }
  })

  return initialTotal
}
const actualSize = strings.reduce((acc, str) => str.length + acc, 0)
const AdjustedStrings = strings.map(removeValuesFromStringLength)
console.log(AdjustedStrings)
const inMemory = AdjustedStrings.reduce(R.add)

console.log(actualSize - inMemory)

// console.time("pt1")
// console.log("pt1", findWireAValue(commands))
// console.timeEnd("pt1")

// console.time("pt2")
// console.log(
//   "pt2",
//   findWireAValue(
//     commands.filter((cmd) => R.last(cmd) !== "b"),
//     { b: 956 }
//   )
// )
// console.timeEnd("pt2")
