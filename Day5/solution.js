const fs = require('fs')
const path = require('path')
const { splitAt } = require('ramda')

// parse data to array
const text = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf8')
const data = text.split('\n').map((code) => code.split(''))
// make plane seat layout
const seatRows = Array.from(Array(128).keys())
const seatNumber = Array.from(Array(8).keys())

const seatsMap = data.map((code) => {
  let plane = [...seatRows]
  let seats = [...seatNumber]
  code.forEach((item) => {
    if (item === 'F') {
      const newPos = splitAt(plane.length / 2)(plane)
      plane = newPos[0]
    }
    if (item === 'B') {
      const newPos = splitAt(plane.length / 2)(plane)
      plane = newPos[1]
    }
    if (item === 'L') {
      const newPos = splitAt(seats.length / 2)(seats)
      seats = newPos[0]
    }
    if (item === 'R') {
      const newPos = splitAt(seats.length / 2)(seats)
      seats = newPos[1]
    }
  })

  return plane[0] * 8 + seats[0]
})

const pt1 = Math.max(...seatsMap)
const pt2 = seatsMap.sort().find((item, index) => item !== index + 100) - 1

console.log('pt1', pt1)
console.log('pt2', pt2)
