import add from "../../utils/add.js"
import runAOC from "../../utils/runAOC.js"
import sum from "../../utils/sum.js"

const MAX_RED = 12
const MAX_GREEN = 13
const MAX_BLUE = 14

/**
 *
 * @param {string} rawId
 */
const parseId = (rawId) => {
  const parsed = rawId.replace("Game ", "")

  const idNumber = parseInt(parsed, 10)

  if (isNaN(idNumber)) {
    throw new Error(`Invalid ID passeed in: ${rawId}`)
  }

  return idNumber
}

/**
 *
 * @param {string} rawGames
 */
const parseGames = (rawGames) => {
  const games = rawGames.split("; ")
  return games.map((game) => {
    const rawCubes = game.split(", ")
    const cubes = {}
    rawCubes.forEach((cube) => {
      const [value, key] = cube.split(" ")
      cubes[key] = parseInt(value, 10)
      if (isNaN(cubes[key])) {
        throw new Error(`Error: Value not a number: ${cubes[key]} | ${cube}`)
      }
    })

    return cubes
  })
}

/**
 *
 * @param {Array<string>} data
 */
const parseInput = (data) => {
  return data.reduce((result, current) => {
    const [rawId, rawGames] = current.split(": ")
    const id = parseId(rawId)

    result[id] = parseGames(rawGames)

    return result
  }, {})
}

const isGameValid = ({ red, green, blue }) => {
  if (red === undefined && green === undefined && blue === undefined) {
    return false
  }

  if (!!red) {
    if (red > MAX_RED) {
      return false
    }
  }

  if (!!green) {
    if (green > MAX_GREEN) {
      return false
    }
  }

  if (!!blue) {
    if (blue > MAX_BLUE) {
      return false
    }
  }

  return true
}

/**
 *
 * @param {Array<string>} dataInput
 *
 */
const part1 = (dataInput) => {
  const data = parseInput(dataInput)

  const dataEntries = Object.entries(data)

  const ids = dataEntries.map(([idAsString, games]) => {
    const isValid = games.every(isGameValid)
    return isValid ? parseInt(idAsString, 10) : 0
  })

  return add(ids)
}

/**
 * @typedef {Object} Games
 * @property {number=} red
 * @property {number=} green
 * @property {number=} blue
 *
 * @param {Array<Games>} games
 * @returns
 */
const getPowerFromCubes = (games) => {
  const maxes = {
    red: 0,
    green: 0,
    blue: 0,
  }

  games.forEach(({ red, green, blue }) => {
    if (!!red) {
      maxes.red = Math.max(red, maxes.red)
    }

    if (!!green) {
      maxes.green = Math.max(green, maxes.green)
    }

    if (!!blue) {
      maxes.blue = Math.max(blue, maxes.blue)
    }
  })

  return sum(Object.values(maxes))
}

/**
 *
 * @param {Array<string>} dataInput
 *
 */
const part2 = (dataInput) => {
  const data = parseInput(dataInput)

  const values = Object.values(data)

  const maxCubes = values.map(getPowerFromCubes)

  return add(maxCubes)
}

runAOC({ part1, part2 })
