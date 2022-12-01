const fs = require("fs")
const path = require("path")

// parse data to array
console.time("pt1")
console.time("pt2")
const text = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
const data = text
  .split("\n\n")
  .map((elf) =>
    elf
      .split("\n")
      .map((meal) => parseInt(meal, 10))
      .reduce((total, value) => total + value, 0)
  )
  .sort((a, b) => a - b)

console.log("pt1", data[data.length - 1])
console.timeEnd("pt1")

console.log(
  "pt2",
  data[data.length - 1] + data[data.length - 2] + data[data.length - 3]
)
console.timeEnd("pt2")
