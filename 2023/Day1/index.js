import isNumber from "../../utils/isNumber.js"
import runAOC from "../../utils/runAOC.js"

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

/**
 *
 * @param {string} str
 * @returns
 */
const reverseString = (str) => {
  return str.split("").reverse().join("")
}

/**
 *
 * @param {string} calibration
 * @returns
 */
const findFirstNumber = (calibration) => {
  return calibration.split("").find(isNumber)
}

/**
 *
 * @param {Array<string>} calibrations
 * @returns
 */
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

/**
 *
 * @param {string} calibration
 * @param {boolean=} reverse
 * @returns
 */
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
        if (position <= current.position) {
          return { position, value }
        }
      }
      return current
    },
    { position: calibration.length + 1 }
  )
}

/**
 *
 * @param {string} calibration
 * @returns
 */
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

/**
 *
 * @param {Array<string>} calibrations
 * @returns
 */
const findWordsAndNumbers = (calibrations) => {
  const result = calibrations.map(getNumbersPt2)
  return result.reduce((total, current) => total + parseInt(current, 10), 0)
}

/**
 * @param {Array<string>} dataInput
 * @returns {number}
 */
const part1 = (dataInput) => {
  return findNumbers(dataInput)
}

/**
 * @param {Array<string>} dataInput
 * @returns {number}
 */
const part2 = (dataInput) => {
  return findWordsAndNumbers(dataInput)
}

runAOC(part1, part2)
