const fs = require("fs")
const path = require("path")

const text = fs.readFileSync(path.resolve(__dirname, "./data.txt"), "utf8")

const floorNumber = (instructions) => {
  return instructions.split("").reduce((floor, inst) => {
    if (inst === "(") {
      return floor + 1
    }
    return floor - 1
  }, 0)
}

const instructionForBasement = (instructions) => {
  return instructions.split("").reduce(
    (res, inst, index) => {
      if (res.firstBasement !== undefined) {
        return res
      }

      let newFloor
      if (inst === "(") {
        newFloor = res.floor + 1
      } else {
        newFloor = res.floor - 1
      }

      return {
        floor: newFloor,
        firstBasement: newFloor === -1 ? index + 1 : undefined,
      }
    },
    { floor: 0, firstBasement: undefined }
  )
}

console.time("pt1")
console.log("pt1", floorNumber(text))
console.timeEnd("pt1")

console.time("pt2")
console.log("pt2", instructionForBasement(text))
console.timeEnd("pt2")
