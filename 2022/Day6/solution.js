const fs = require("fs")
const path = require("path")

// parse data to array
const text = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")

const findFirstMarker = (dataStream, markerLength) => {
  const last3 = []
  let firstNonMarkerIndex = 0
  const dataArray = dataStream.split("")

  for (let i = 0; i < dataArray.length; i++) {
    const data = dataArray[i]
    last3.push(data)

    if (last3.length !== markerLength) continue

    const newSet = new Set(last3)
    if (newSet.size === markerLength) {
      firstNonMarkerIndex = i + 1
      break
    } else {
      last3.shift()
      continue
    }
  }

  return firstNonMarkerIndex
}

// console.time("pt1")
// console.log("pt1", findFirstMarker(text, 4))
// console.timeEnd("pt1")

console.time("pt2")
console.log("pt2", findFirstMarker(text, 14))
console.timeEnd("pt2")
