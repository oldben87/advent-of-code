const fs = require("fs")
const path = require("path")
const { splitAt, splitEvery } = require("ramda")

// parse data to array
const text = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")

const parseInput = (input) => {
  return input.split("\n").map((pair) => pair.split(","))
}

const parseElfSections = (sections) =>
  sections.split("-").map((point) => parseInt(point))

console.time("pt1")
console.log(
  "pt1",
  parseInput(text).reduce((total, [elf1, elf2]) => {
    const [elf1Start, elf1End] = parseElfSections(elf1)
    const [elf2Start, elf2End] = parseElfSections(elf2)

    if (elf1Start <= elf2Start && elf1End >= elf2End) {
      return total + 1
    }
    if (elf1Start >= elf2Start && elf1End <= elf2End) {
      return total + 1
    }
    return total
  }, 0)
)
console.timeEnd("pt1")

console.time("pt2")
console.log("pt2")
console.timeEnd("pt2")
