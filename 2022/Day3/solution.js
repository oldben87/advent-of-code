const fs = require("fs")
const path = require("path")
const { splitAt, splitEvery } = require("ramda")

// parse data to array
const text = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")

const itemPriority = (letter) =>
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(letter) + 1

const splitRuckSack = (rucksack) => {
  const whereToSplit = rucksack.length / 2
  return splitAt(whereToSplit, rucksack.split(""))
}

const findDuplicateLetter = ([compA, compB]) => {
  return compA.find((item) => compB.some((it) => it.includes(item)))
}

console.time("pt1")
console.log(
  "pt1",
  text.split("\n").reduce((total, rucksack) => {
    const compartments = splitRuckSack(rucksack)
    const duplicateLetter = findDuplicateLetter(compartments)

    return total + itemPriority(duplicateLetter)
  }, 0)
)

console.timeEnd("pt1")

console.time("pt2")
console.log(
  "pt2",
  splitEvery(3, text.split("\n")).reduce((total, group) => {
    const [rucksack1, rucksack2, rucksack3] = group.map((rucksack) =>
      rucksack.split("")
    )
    const duplicateItem = rucksack1.find(
      (item) => rucksack2.includes(item) && rucksack3.includes(item)
    )

    return total + itemPriority(duplicateItem)
  }, 0)
)
console.timeEnd("pt2")
