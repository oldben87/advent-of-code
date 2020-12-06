const fs = require('fs')
const path = require('path')
const R = require('ramda')

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
function validatePassports(arr) {
  let isValid = 0
  const keysBString = JSON.stringify(R.keys(control).sort())
  const keysCString = JSON.stringify(R.keys(R.omit(['cid'], control)).sort())
  arr.forEach((obj) => {
    const keysAString = JSON.stringify(R.keys(obj).sort())
    if (keysAString === keysBString || keysAString === keysCString) {
      isValid++
    }
  })

  return isValid
}

console.log('pt1', validatePassports(data))
console.log('pt2')
