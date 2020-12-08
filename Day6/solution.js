const fs = require('fs')
const path = require('path')
const { values } = require('ramda')

// parse data to array
const text = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf8')
const data = text.split('\n\n')

const pt1 = data
  .map((answers) => {
    const yes = answers.replace(/\n/g, '').split('')
    return new Set(yes).size
  })
  .reduce((a, b) => a + b)

const pt2 = data
  .map((answers) => {
    const noPeople = answers.split(/\n/g).length
    let charMap = {}
    const yes = answers.replace(/\n/g, '').split('')
    for (let char of yes) {
      charMap[char] = charMap[char] + 1 || 1
    }
    const result = values(charMap).filter((a) => a === noPeople).length

    return result
  })
  .reduce((a, b) => a + b)

console.log('pt1', pt1)
console.log('pt2', pt2)
