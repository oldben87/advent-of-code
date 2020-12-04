const { data } = require('./data')

function findSum2(arr) {
  let result
  arr.forEach((a) => {
    arr.forEach((b) => {
      if (a + b === 2020) {
        result = a * b
      }
    })
  })
  return result
}

console.log('Pt1:', findSum2(data))

function findSum3(arr) {
  let result
  arr.forEach((a) => {
    arr.forEach((b) => {
      arr.forEach((c) => {
        if (a + b + c === 2020) {
          result = a * b * c
        }
      })
    })
  })
  return result
}

console.log('Pt2:', findSum3(data))
