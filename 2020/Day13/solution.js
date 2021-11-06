const fs = require('fs')
const path = require('path')
const { sortBy } = require('ramda')

// parse data to array
const text = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf8')
const data = text.split('\n')
const earliestTimestamp = parseInt(data[0])
const busIds = data[1]
  .split(',')
  .filter(id => id !== 'x')
  .map(id => parseInt(id))
  .sort((a, b) => a - b)

const findShortestTimeToWait = (earliestTimestamp, busIds) => {
  let busesAndWaitTimes = []

  for (let id of busIds) {
    let result

    let counter = 0

    do {
      result = (earliestTimestamp + counter) % id

      if (result === 0) {
        busesAndWaitTimes.push({ time: counter, bus: id })
      } else {
        counter++
      }
    } while (result !== 0)
  }

  const { bus, time } = sortBy(bus => bus.time)(busesAndWaitTimes)[0]

  return bus * time
}

console.time('pt1')
console.log('pt1', findShortestTimeToWait(earliestTimestamp, busIds))
console.timeEnd('pt1')

// Brute force method, took 14 hours to run :(

const findTimestampWithConsecutiveBuses = busIds => {
  const largestNumber = Math.max(
    ...busIds.filter(id => id !== 'x').map(id => parseInt(id)),
  )

  const largestIndex = busIds.findIndex(id => id == largestNumber)
  const startingNumber = largestNumber - largestIndex

  let timestampCounter = startingNumber
  let idCounter = 0

  do {
    if (busIds[idCounter] === 'x') {
      idCounter++
      continue
    }

    if ((timestampCounter + idCounter) % parseInt(busIds[idCounter]) === 0) {
      if (idCounter >= busIds.length - 1) {
        break
      } else {
        idCounter++
        continue
      }
    } else {
      timestampCounter += largestNumber
      idCounter = 0
    }
  } while (idCounter < busIds.length)

  return timestampCounter
}

console.time('pt2')
console.log('pt2', findTimestampWithConsecutiveBuses(data[1].split(',')))
console.timeEnd('pt2')
