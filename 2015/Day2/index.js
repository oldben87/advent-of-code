const fs = require("fs")
const path = require("path")
const R = require("ramda")

// parse data to array
const text = fs.readFileSync(path.resolve(__dirname, "./data.txt"), "utf8")
const data = text.split("\n").map((dimensions) => {
  return dimensions.split("x").map((num) => parseInt(num))
})

const sortSides = (dimensions) => {
  return R.sort(R.subtract, dimensions)
}

const calculateWrapping = (dimensions) => {
  const [length, width, height] = dimensions

  const surfaceArea =
    2 * length * width + 2 * width * height + 2 * height * length

  const orderedSides = sortSides(dimensions)
  const smallestArea = orderedSides[0] * orderedSides[1]

  return surfaceArea + smallestArea
}

const getSurfaceArea = (dimensionList) => {
  return dimensionList.map(calculateWrapping).reduce(R.add)
}

const calcRibbon = (dimensions) => {
  const [short, med, long] = sortSides(dimensions)
  const ribbon = short * 2 + med * 2

  return short * med * long + ribbon
}

const addAllRibbons = (arr) => arr.map(calcRibbon).reduce(R.add)

console.time("pt1")
console.log("pt1", getSurfaceArea(data))
console.timeEnd("pt1")

console.time("pt2")
console.log("pt2", addAllRibbons(data))
console.timeEnd("pt2")
