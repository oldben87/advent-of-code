const fs = require('fs')
const path = require('path')
const { splitAt } = require('ramda')

// parse data to array
const text = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf8')
const data = text.split('\n').map(item => {
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

const moveLeft = (north, east, timesToRun) => {
  let wpNorth = north
  let wpEast = east

  for (let i = timesToRun; i > 0; i--) {
    const wpNCopy = wpNorth
    const wpECopy = wpEast
    if (wpNCopy >= 0 && wpECopy >= 0) {
      wpNorth = Math.abs(wpECopy)
      wpEast = 0 - Math.abs(wpNCopy)
    } else if (wpNCopy >= 0 && wpECopy < 0) {
      wpNorth = 0 - Math.abs(wpECopy)
      wpEast = 0 - Math.abs(wpNCopy)
    } else if (wpNCopy < 0 && wpECopy >= 0) {
      wpNorth = Math.abs(wpECopy)
      wpEast = Math.abs(wpNCopy)
    } else if (wpNCopy < 0 && wpECopy < 0) {
      wpNorth = 0 - Math.abs(wpECopy)
      wpEast = Math.abs(wpNCopy)
    }
  }

  return {
    wpNorth,
    wpEast,
  }
}

const moveRight = (north, east, timesToRun) => {
  let wpNorth = north
  let wpEast = east

  for (let i = timesToRun; i > 0; i--) {
    const wpNCopy = wpNorth
    const wpECopy = wpEast

    if (wpNCopy >= 0 && wpECopy >= 0) {
      wpNorth = 0 - Math.abs(wpECopy)
      wpEast = Math.abs(wpNCopy)
    } else if (wpNCopy >= 0 && wpECopy < 0) {
      wpNorth = Math.abs(wpECopy)
      wpEast = Math.abs(wpNCopy)
    } else if (wpNCopy < 0 && wpECopy >= 0) {
      wpNorth = 0 - Math.abs(wpECopy)
      wpEast = 0 - Math.abs(wpNCopy)
    } else if (wpNCopy < 0 && wpECopy < 0) {
      wpNorth = Math.abs(wpECopy)
      wpEast = 0 - Math.abs(wpNCopy)
    }
  }

  return {
    wpNorth,
    wpEast,
  }
}

function moveToWaypoint(
  arr,
  i = 0,
  north = 0,
  east = 0,
  wpNorth = 1,
  wpEast = 10,
) {
  if (arr[i].cmd === 'N') {
    wpNorth += arr[i].val
  }
  if (arr[i].cmd === 'S') {
    wpNorth -= arr[i].val
  }
  if (arr[i].cmd === 'E') {
    wpEast += arr[i].val
  }
  if (arr[i].cmd === 'W') {
    wpEast -= arr[i].val
  }
  if (arr[i].cmd === 'F') {
    north += arr[i].val * wpNorth
    east += arr[i].val * wpEast
  }
  if (arr[i].cmd === 'L') {
    const timesToRun = Math.floor(arr[i].val / 90)

    const moveWPLeft = moveLeft(wpNorth, wpEast, timesToRun)

    wpNorth = moveWPLeft.wpNorth
    wpEast = moveWPLeft.wpEast
  }
  if (arr[i].cmd === 'R') {
    const timesToRun = Math.floor(arr[i].val / 90)

    const moveWPRight = moveRight(wpNorth, wpEast, timesToRun)

    wpNorth = moveWPRight.wpNorth
    wpEast = moveWPRight.wpEast
  }

  return i === arr.length - 1
    ? Math.abs(north) + Math.abs(east)
    : moveToWaypoint(arr, i + 1, north, east, wpNorth, wpEast)
}

console.time('pt2')
console.log('pt2', moveToWaypoint(data))
console.timeEnd('pt2')
