const fs = require('fs')
const path = require('path')
const { splitAt } = require('ramda')

// parse data to array
const text = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf8')
const data = text.split('\n').map((item) => {
  const cmdParse = splitAt(1)(item)
  return {
    cmd: cmdParse[0],
    val: parseInt(cmdParse[1]),
  }
})

function navigateShip(arr, i = 0, curDir = 90, north = 0, east = 0) {
  if (arr[i].cmd === 'N') {
    north += arr[i].val
  }
  if (arr[i].cmd === 'S') {
    north -= arr[i].val
  }
  if (arr[i].cmd === 'E') {
    east += arr[i].val
  }
  if (arr[i].cmd === 'W') {
    east -= arr[i].val
  }
  if (arr[i].cmd === 'F') {
    if (curDir === 90) {
      east += arr[i].val
    }
    if (curDir === 0) {
      north += arr[i].val
    }
    if (curDir === 180) {
      north -= arr[i].val
    }
    if (curDir === 270) {
      east -= arr[i].val
    }
  }
  if (arr[i].cmd === 'L') {
    curDir -= arr[i].val
    if (curDir < -1) {
      curDir = 360 + curDir
    }
  }
  if (arr[i].cmd === 'R') {
    curDir += arr[i].val
    if (curDir >= 360) {
      curDir = curDir - 360
    }
  }

  return i === arr.length - 1
    ? Math.abs(north) + Math.abs(east)
    : navigateShip(arr, i + 1, curDir, north, east)
}
console.time('pt1')
console.log('pt1', navigateShip(data))
console.timeEnd('pt1')
