const { getSetup } = require("../../utils/getSetup")

const { data, isPart1, isPart2, runAll } = getSetup()

const numbersAsStrings = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
]

const findFirstNumber = (str) => {
  return str.split("").find((char) => parseInt(char, 10) > 0)
}

const findLastNumber = (str) => {
  return str
    .split("")
    .reverse()
    .find((char) => parseInt(char, 10) > 0)
}

const findNumbers = (data) => {
  return data.reduce((total, calibration) => {
    const firstNumber = findFirstNumber(calibration)
    if (firstNumber === undefined) {
      throw new Error(`No first number found: ${calibration}`)
    }
    const lastNumber = findLastNumber(calibration)
    if (lastNumber === undefined) {
      throw new Error(`No last number found: ${calibration}`)
    }
    return total + parseInt(firstNumber + lastNumber, 10)
  }, 0)
}

const part1 = (dataInput) => {
  return findNumbers(dataInput)
}

const part2 = (dataInput) => {
  return 0
}

if (isPart1 || runAll) {
  console.time("pt-1")
  console.log("pt-1", part1(data))
  console.timeEnd("pt-1")
}
if (isPart2 || runAll) {
  console.time("pt-2")
  console.log("pt-2", part2(data))
  console.timeEnd("pt-2")
}
