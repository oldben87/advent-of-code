const { data } = require('./data')

function findSum2(arr) {
  let returnMe
  arr.forEach((a, indA, arrayA) => {
    return arrayA.forEach((b, indB, arrayB) => {
      if (a + b === 2020) {
        returnMe = a * b
      }
    })
  })
  return returnMe
}

console.log(findSum2(data))

function findSum3(arr) {
  let returnMe

  arr.forEach((a, indA, arrayA) => {
    return arrayA.forEach((b, indB, arrayB) => {
      return arrayB.forEach((c) => {
        if (a + b + c === 2020) {
          returnMe = a * b * c
        }
      })
    })
  })
  return returnMe
}

console.log(findSum3(data))
