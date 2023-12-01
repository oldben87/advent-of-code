const { getSetup } = require("../../utils/getSetup")

const { data, runPart1, runPart2 } = getSetup()

const numbersAsStrings = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
}

const isNumber = (char) => !isNaN(Number(char))

const reverseString = (str) => {
  return str.split("").reverse().join("")
}

const findFirstNumber = (calibration) => {
  return calibration.split("").find(isNumber)
}

const findNumbers = (calibrations) => {
  return calibrations.reduce((total, calibration) => {
    const firstNumber = findFirstNumber(calibration)
    if (firstNumber === undefined) {
      throw new Error(`No first number found: ${calibration}`)
    }
    const lastNumber = findFirstNumber(reverseString(calibration))
    if (lastNumber === undefined) {
      throw new Error(`No last number found: ${calibration}`)
    }
    return total + parseInt(firstNumber + lastNumber, 10)
  }, 0)
}

const findFirstWordOrNumber = (calibration, reverse) => {
  return Object.entries(numbersAsStrings).reduce(
    (current, [key, value]) => {
      const keyIndex = reverse
        ? reverseString(calibration).search(reverseString(key))
        : calibration.search(key)

      const valueIndex = reverse
        ? reverseString(calibration).search(value)
        : calibration.search(value)

      const indexs = []
      if (keyIndex !== -1) {
        indexs.push(keyIndex)
      }

      if (valueIndex !== -1) {
        indexs.push(valueIndex)
      }

      if (indexs.length) {
        const position = Math.min(...indexs)
        if (position <= current?.position) {
          return { position, value }
        }
      }
      return current
    },
    { position: calibration.length + 1 }
  )
}

const getNumbersPt2 = (calibration) => {
  const firstNumber = findFirstWordOrNumber(calibration)?.value
  if (firstNumber === undefined) {
    throw new Error(`No first number found: ${calibration}`)
  }
  const lastNumber = findFirstWordOrNumber(calibration, true)?.value

  if (lastNumber === undefined) {
    throw new Error(`No last number found: ${calibration}`)
  }

  return firstNumber + lastNumber
}

const findWordsAndNumbers = (calibrations) => {
  const result = calibrations.map(getNumbersPt2)
  return result.reduce((total, current) => total + parseInt(current, 10), 0)
}

const part1 = (dataInput) => {
  return findNumbers(dataInput)
}

const part2 = (dataInput) => {
  return findWordsAndNumbers(dataInput)
}

if (runPart1) {
  console.time("pt-1")
  console.log("pt-1", part1(data))
  console.timeEnd("pt-1")
}
if (runPart2) {
  console.time("pt-2")
  console.log("pt-2", part2(data))
  console.timeEnd("pt-2")
}
