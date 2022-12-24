const fs = require("fs")
const path = require("path")

// parse data to array
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .split("\n")

const getManhattenDistance = (a, b) => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

const coordString = (x, y) => `${x}-${y}`

const parseInput = (sensors) => {
  return sensors.map((line) => {
    const [a, b] = line.split(": ")
    const [aX, aY] = a.replace("Sensor at ", "").split(", ")
    const [bX, bY] = b.replace("closest beacon is at ", "").split(", ")
    const sensor = {
      x: parseInt(aX.replace("x=", ""), 10),
      y: parseInt(aY.replace("y=", ""), 10),
    }
    const beacon = {
      x: parseInt(bX.replace("x=", ""), 10),
      y: parseInt(bY.replace("y=", ""), 10),
    }
    return { ...sensor, distance: getManhattenDistance(sensor, beacon), beacon }
  })
}

const countSensorDeadZone = (sensors, rowToCount) => {
  const parsedSensors = parseInput(sensors)

  const beaconList = parsedSensors.map(({ beacon: { x, y } }) =>
    coordString(x, y)
  )

  const minX = parsedSensors.reduce((acc, curr) => {
    const currentMin = curr.x - curr.distance
    return acc <= currentMin ? acc : currentMin
  }, 0)

  const maxX = parsedSensors.reduce((acc, curr) => {
    const currentMin = curr.x + curr.distance
    return acc >= currentMin ? acc : currentMin
  }, 0)

  const res = new Set()

  for (let i = minX; i <= maxX; i++) {
    const coords = coordString(i, rowToCount)
    if (beaconList.includes(coords)) {
      continue
    }

    const position = { x: i, y: rowToCount }
    parsedSensors.forEach((sensor) => {
      const distance = getManhattenDistance(sensor, position)
      if (distance <= sensor.distance) {
        res.add(coords)
      }
    })
  }

  return res.size
}

console.time("pt1")
console.log("pt1", countSensorDeadZone(input, 2000000))
console.timeEnd("pt1")

// console.time("pt2")
// console.log("pt2")
// console.timeEnd("pt2")
