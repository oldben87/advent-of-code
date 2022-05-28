const fs = require("fs")
const path = require("path")

const text = fs.readFileSync(path.resolve(__dirname, "./data.txt"), "utf8")

const test = "^>v<"

const [N, S, E, W] = ["^", "v", ">", "<"]

const getNumberOfRepeatVisits = (directions) => {
  const directionArray = directions.split("")

  let houseHash = { "0,0": 1 }
  let x = 0

  let y = 0
  directionArray.forEach((dir) => {
    if (dir === N) {
      y++
    }
    if (dir === S) {
      y--
    }
    if (dir === E) {
      x++
    }
    if (dir === W) {
      x--
    }

    const coords = `${x},${y}`
    const newValue = houseHash[coords] !== undefined ? houseHash[coords] + 1 : 1
    houseHash[coords] = newValue
  })

  return Object.values(houseHash).length
}

console.time("pt1")
console.log("pt1", getNumberOfRepeatVisits(text))
console.timeEnd("pt1")

const takeTurnsDeliveringPresents = (directions) => {
  const directionArray = directions.split("")

  let houseHash = { "0,0": 1 }
  let xS = 0
  let yS = 0

  let xRS = 0
  let yRS = 0

  let santasMove = true

  directionArray.forEach((dir) => {
    if (dir === N) {
      if (santasMove) {
        yS++
      } else {
        yRS++
      }
    }
    if (dir === S) {
      if (santasMove) {
        yS--
      } else {
        yRS--
      }
    }
    if (dir === E) {
      if (santasMove) {
        xS++
      } else {
        xRS++
      }
    }
    if (dir === W) {
      if (santasMove) {
        xS--
      } else {
        xRS--
      }
    }

    const coords = santasMove ? `${xS},${yS}` : `${xRS},${yRS}`
    const newValue = houseHash[coords] !== undefined ? houseHash[coords] + 1 : 1
    houseHash[coords] = newValue

    santasMove = !santasMove
  })

  return Object.values(houseHash).length
}

console.time("pt2")
console.log("pt2", takeTurnsDeliveringPresents(text))
console.timeEnd("pt2")
