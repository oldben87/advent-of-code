const fs = require('fs')
const path = require('path')

// parse data to array
const text = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf8')
const data = text.split('\n')

const MAX_BIT_LENGTH = 36  

const convertValueToBit = (number) => {
  let total = number
  let buildBit = Array.apply(null ,Array(MAX_BIT_LENGTH)).map((_, i) => {
    let bitValue = Math.pow(2, MAX_BIT_LENGTH - i - 1)

    if (total >= bitValue) {
      total = total - bitValue

      return 1
    } else return 0
  
})
    
    return buildBit.join("")
}

const convertDataToInput = (arrayOfStrings) => {
  let result = []
  let newRes = {}

  arrayOfStrings.forEach((string, index) => {
    const item = string.split(" = ")

    if (item[0] === "mask") {
      
      if (Object.values(newRes).length) {
        result.push(newRes)
        newRes = {}
      }

      newRes = {
        ...newRes,
        [item[0]]: item[1]
      }
    } else {
      const key = item[0].split('mem[')[1].split(']')[0]

      newRes = {
        ...newRes,
        [key]: convertValueToBit(item[1])
       }
    }

    if (index === arrayOfStrings.length - 1) {
      result.push(newRes)
    }

  })

  return result
}

const input = convertDataToInput(data)

const convertBitToValue = (bit) => {
  // Takes an array of strings
  let value = 0 
     
  bit.forEach((char, index) => {
    let bitValue = Math.pow(2, MAX_BIT_LENGTH - index - 1)

    if (char === '1') {
    value += bitValue             
    }
  })

  return value
}

const generateSumFromBitMasks = (bitMasks) => {
  
  let memory = {}

  bitMasks.forEach(bm => {
  const mask = bm.mask
  const items = Object.entries(bm)

  items.forEach(([key, value]) => {
    if (key !== 'mask') {
      
      const bitWithMask =  mask.split("").map((val, ind) => {
        if(val === 'X' || val === value[ind]) {
          return value[ind]
        } else {
          return val === '1' ? '1': '0'
        }
      })

      // check if it is the same if so add 0, else add value       
        memory = {
          ...memory,
          [key]: convertBitToValue(bitWithMask)
        }
      }

    })
  })
        
  // iterate through the final object summing values
  return Object.values(memory).reduce((a, b) => a + b, 0)

}

console.time('pt1')
console.log('pt1', generateSumFromBitMasks(input))
console.timeEnd('pt1')

// console.time('pt2')
// console.log('pt2',)
// console.timeEnd('pt2')
