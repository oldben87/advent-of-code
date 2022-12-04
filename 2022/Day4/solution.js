const fs = require("fs")
const path = require("path")

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

const getTaskOverlap = (elf1, elf2) => {
  const [elf1Start, elf1End] = parseElfSections(elf1)
  const [elf2Start, elf2End] = parseElfSections(elf2)

  if (elf1Start <= elf2End && elf2Start <= elf1End) return true

  return false
}

console.time("pt2")
console.log(
  "pt2",
  parseInput(text).reduce((total, [elf1, elf2]) => {
    const isOverlapping = getTaskOverlap(elf1, elf2)
    return isOverlapping ? total + 1 : total
  }, 0)
)
console.timeEnd("pt2")
