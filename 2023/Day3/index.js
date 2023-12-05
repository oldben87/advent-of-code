import runAOC from "../../utils/runAOC.js"
import isNumber from "../../utils/isNumber.js"
import add from "../../utils/add.js"

const ROW_AND_COLUMN_START = 0

/**
 * @param {any=} value
 */
const validatePartNumber = (value) => {
  if (value === undefined) {
    return false
  }
  if (isNumber(value)) {
    return false
  }

  if (value === ".") {
    return false
  }

  return true
}

/**
 *
 * @param {Array<string>} data
 * @returns
 */
const part1 = (data) => {
  const height = data.length
  const width = data[0]?.length
  if (!width) {
    throw new Error("Width could not be determind")
  }

  let numberStartIndex, numberEndIndex
  let isPartNumber = false
  const partNumbersToSum = []

  for (let row = ROW_AND_COLUMN_START; row < width; row++) {
    for (let column = ROW_AND_COLUMN_START; column < height; column++) {
      if (column === ROW_AND_COLUMN_START) {
        numberEndIndex = numberStartIndex = undefined
        isPartNumber = false
      }
      const valueToCheck = data[row][column]

      const valueIsNumber = isNumber(valueToCheck)

      if (valueIsNumber) {
        if (numberStartIndex === undefined) {
          numberStartIndex = column
        }

        numberEndIndex = column

        // Check if surrounding squares are a valid option
        const positions = [
          [-1, -1],
          [-1, 0],
          [-1, 1],
          [0, -1],
          [0, 1],
          [1, -1],
          [1, 0],
          [1, 1],
        ]

        positions.forEach(([x, y]) => {
          const dataRow = data[row + x]
          const dataValue =
            dataRow !== undefined ? dataRow[column + y] : undefined
          if (validatePartNumber(dataValue)) {
            isPartNumber = true
          }
        })
      }

      if (!valueIsNumber || data[row][column + 1] === undefined) {
        if (numberStartIndex !== undefined && numberEndIndex !== undefined) {
          let toBeNum = ""

          for (let i = numberStartIndex; i <= numberEndIndex; i++) {
            toBeNum += data[row][i]
          }

          if (isPartNumber) {
            partNumbersToSum.push(parseInt(toBeNum, 10))
          }

          numberStartIndex = numberEndIndex = undefined
          isPartNumber = false
        }
      }
    }
  }

  return add(partNumbersToSum)
}

/**
 *
 * @param {Array<string>} data
 * @returns
 */
const part2 = (data) => {
  // create memo of all part numbers
  // create memo of all gears
  // search for all gears with only 2 part numbers, sum the part numbers and add them together?
  // check all
}

runAOC({ part1 })
