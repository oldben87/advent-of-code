const { runAOC } = require("../../utils/runAOC")

const MAX_RED = 12
const MAX_GREEN = 13
const MAX_BLUE = 14

const MAX_DICT = {
  red: MAX_RED,
  green: MAX_GREEN,
  blue: MAX_BLUE,
}

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

/**
 *
 * @param {Array<string>} dataInput
 *
 */
const part1 = (dataInput) => {
  const data = parseInput(dataInput)
  console.log(data)

  return 0
}

runAOC(part1)
