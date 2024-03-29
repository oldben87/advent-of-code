import runAOC from "../../utils/runAOC.js"
import isNumber from "../../utils/isNumber.js"
import add from "../../utils/add.js"
import sum from "../../utils/sum.js"

const ROW_AND_COLUMN_START = 0

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

const getKey = (startCoords, endCoords) => {
  return `${startCoords.x}:${startCoords.y}|${endCoords.x}:${endCoords.y}`
}

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

const validateGear = (value) => value === "*"

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
  const height = data.length
  const width = data[0]?.length
  if (!width) {
    throw new Error("Width could not be determind")
  }

  const gearSums = []

  for (let row = ROW_AND_COLUMN_START; row < width; row++) {
    for (let column = ROW_AND_COLUMN_START; column < height; column++) {
      const valueToCheck = data[row][column]

      const isGear = validateGear(valueToCheck)

      if (!isGear) {
        continue
      }

      const partNumbers = {}
      positions.forEach(([x, y]) => {
        const posRow = row + x
        const posCol = column + y

        const dataRow = data[posRow]
        const dataValue = dataRow !== undefined ? dataRow[posCol] : undefined

        const valueIsNumber = isNumber(dataValue)

        if (valueIsNumber) {
          // check for start of number
          let startIndex = posCol
          let endIndex = posCol
          for (let i = posCol; isNumber(dataRow[i]); i--) {
            startIndex = i
          }

          for (let i = posCol; isNumber(dataRow[i]); i++) {
            endIndex = i
          }

          // add to memo
          const key = getKey(
            { x: posRow, y: startIndex },
            { x: posRow, y: endIndex }
          )
          if (partNumbers[key] === undefined) {
            let partNumber = ""

            for (let i = startIndex; i <= endIndex; i++) {
              partNumber += data[posRow][i]
            }

            partNumbers[key] = parseInt(partNumber, 10)
          }
        }
      })

      const partNumbersTotal = Object.values(partNumbers)
      if (partNumbersTotal.length === 2) {
        gearSums.push(sum(partNumbersTotal))
      }
    }
  }

  return add(gearSums)
}

runAOC({ part1, part2 })
