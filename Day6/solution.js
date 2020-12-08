const fs = require('fs')
const path = require('path')

// parse data to array
const text = fs.readFileSync(path.resolve(__dirname, './dataTest.txt'), 'utf8')
const data = text
  .split('\n\n')
  .map((answers) => answers.replace(/\n/g, '').split(''))

const pt1 = data.map((yeses) => new Set(yeses).size).reduce((a, b) => a + b)

console.log('pt1', pt1)
