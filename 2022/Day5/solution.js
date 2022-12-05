const fs = require("fs")
const path = require("path")

// parse data to array
const text = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .split("\n")

console.time("pt1")
console.log("pt1")
console.timeEnd("pt1")

// console.time("pt2")
// console.log("pt2")
// console.timeEnd("pt2")
