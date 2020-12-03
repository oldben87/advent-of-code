const fs = require('fs')
const path = require('path')

let text = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf8')

const data = text.split('\r\n')
let isValid = 0
/*
Day 2 pt 1
data.forEach((item) => {
  const arr = item.toString().split(' ')
  const minMax = arr[0].split('-')
  let obj = {
    min: parseInt(minMax[0]),
    max: parseInt(minMax[1]),
    letter: arr[1][0],
    password: arr[2],
  }
  let counter = 0
  obj.password
    .split('')
    .forEach((letter) => (letter === obj.letter ? counter++ : null))

  if (counter >= obj.min && counter <= obj.max) {
    isValid++
  }
})
*/

// Day 2 pt 2
data.forEach((item) => {
  const arr = item.toString().split(' ')
  const minMax = arr[0].split('-')
  let obj = {
    ind1: parseInt(minMax[0]),
    ind2: parseInt(minMax[1]),
    letter: arr[1][0],
    password: arr[2],
  }
  let valid = false
  let isMatch1 = obj.password[obj.ind1 - 1] === obj.letter
  let isMatch2 = obj.password[obj.ind2 - 1] === obj.letter
  if (isMatch1 && isMatch2) {
    valid = false
  }
  if (isMatch1 && !isMatch2) {
    valid = true
  }
  if (!isMatch1 && isMatch2) {
    valid = true
  }
  if (!isMatch1 && !isMatch2) {
    valid = false
  }

  if (valid) {
    isValid++
  }
})

console.log(isValid)
