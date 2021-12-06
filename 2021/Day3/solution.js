const fs = require("fs")
const path = require("path")

// parse data to array
const text = fs.readFileSync(path.resolve(__dirname, "./data.txt"), "utf8")
const data = text.split("\n")

const convertBitToValue = (bit) => {
  const bits = bit.split("")
  let value = 0

  bits.forEach((char, index, array) => {
    let bitValue = Math.pow(2, array.length - index - 1)

    if (char === "1") {
      value += bitValue
    }
  })

  return value
}

const findPowerRating = (input) => {
  let bit = ""
  let leastCommon = ""
  for (let i = 0; i < input[0].length; i++) {
    let one = 0
    let zero = 0

    for (let j = 0; j < input.length; j++) {
      if (input[j][i] === "1") {
        one++
      } else zero++
    }

    if (one > zero) {
      bit += "1"
      leastCommon += "0"
    } else {
      bit += "0"
      leastCommon += "1"
    }
  }
  return convertBitToValue(bit) * convertBitToValue(leastCommon)
}

console.time("pt1")
console.log("pt1", findPowerRating(data))
console.timeEnd("pt1")
