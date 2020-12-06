const fs = require('fs')
const path = require('path')
const R = require('ramda')

const { allPass, gte, lte, __, test, keys } = R
// parse data
let text = fs.readFileSync(path.resolve(__dirname, 'data.txt'), 'utf8')
const data = text.split('\n\n').map((item) => {
  const arr2Obj = item
    .replace(/\n/g, ' ')
    .split(' ')
    .map((obj) => {
      const arr = obj.split(':')
      return { [arr[0]]: arr[1] }
    })
  return Object.assign({}, ...arr2Obj)
})

// Create object & strings to compare with
const control = {
  byr: '',
  iyr: '',
  eyr: '',
  hgt: '',
  hcl: '',
  ecl: '',
  pid: '',
  cid: '',
}
const keysBString = JSON.stringify(keys(control).sort())
const keysCString = JSON.stringify(keys(R.omit(['cid'], control)).sort())

//Part 1 Function
function validatePassports1(arr) {
  let isValid = 0
  arr.forEach((obj) => {
    //Convert keys to string to compare with above strings to see if they exist
    const keysAString = JSON.stringify(keys(obj).sort())
    if (keysAString === keysBString || keysAString === keysCString) {
      // increment if they are valid
      isValid++
    }
  })

  return isValid
}

// part 2
//Define Tests:
const is4Digits = (item) => item.length === 4
const birthYear = ({ byr }) => {
  return allPass([is4Digits, gte(__, 1920), lte(__, 2002)])(byr)
}
const issueYear = ({ iyr }) => {
  return allPass([is4Digits, gte(__, 2010), lte(__, 2020)])(iyr)
}
const expirationYear = ({ eyr }) => {
  return allPass([is4Digits, gte(__, 2020), lte(__, 2030)])(eyr)
}

const is9Digits = (num) => num.length === 9
const passportID = ({ pid }) => allPass([test(/[0-9]{9}$/), is9Digits])(pid)

const eyeList = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
const eyeColour = ({ ecl }) => eyeList.some((colour) => colour === ecl)

const regex = /\B#[0-9a-f]{6}/g
const hairColour = ({ hcl }) => test(regex)(hcl)

const height = ({ hgt }) => {
  const splitHeight = R.splitAt(-2, hgt)
  if (
    splitHeight[1] === 'cm' &&
    splitHeight[0] <= 193 &&
    splitHeight[0] >= 150
  ) {
    return true
  } else if (
    splitHeight[1] === 'in' &&
    splitHeight[0] <= 76 &&
    splitHeight[0] >= 59
  ) {
    return true
  } else {
    return false
  }
}

function validateItems(passport) {
  return allPass([
    birthYear,
    issueYear,
    expirationYear,
    height,
    hairColour,
    eyeColour,
    passportID,
  ])(passport)
}

function validatePassports2(arr) {
  let isValid = 0
  arr.forEach((obj) => {
    const keysAString = JSON.stringify(keys(obj).sort())
    if (keysAString === keysBString || keysAString === keysCString) {
      // Validate object values, increment if valid
      validateItems(obj) ? isValid++ : null
    }
  })

  return isValid
}

console.log('pt1', validatePassports1(data))
console.log('pt2', validatePassports2(data))
