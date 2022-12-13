const fs = require("fs")
const path = require("path")
const { sortBy, prop } = require("ramda")

// parse data to array
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .split("\n")

const parseInput = (monkeys) => {
  const parsedMonkeys = []
  let currentMonkey = { itemsThrown: 0 }
  monkeys.forEach((line) => {
    if (!line) {
      return
    }

    if (line.startsWith("Monkey ")) {
      currentMonkey.id = parseInt(line.split(" ")[1].replace(":", ""), 10)
      return
    }

    if (line.startsWith("  Starting items: ")) {
      currentMonkey.startingItems = line
        .replace("Starting items: ", "")
        .split(",")
        .map((num) => parseInt(num, 10))
      return
    }
    if (line.startsWith("  Operation: ")) {
      const [first, middle, last] = line
        .replace("  Operation: new = ", "")
        .split(" ")
      const firstIsWorryLevel = first === "old"
      const lastIsWorryLevel = last === "old"

      currentMonkey.op = (worryLevel) =>
        eval(
          `${firstIsWorryLevel ? worryLevel : first}${middle}${
            lastIsWorryLevel ? worryLevel : last
          }`
        )
      return
    }
    if (line.startsWith("  Test: divisible by ")) {
      currentMonkey.testNumber = parseInt(
        line.replace("  Test: divisible by ", ""),
        10
      )
      return
    }
    if (line.startsWith("    If true: throw to monkey ")) {
      currentMonkey.true = parseInt(
        line.replace("    If true: throw to monkey ", ""),
        10
      )
      return
    }
    if (line.startsWith("    If false: throw to monkey ")) {
      currentMonkey.false = parseInt(
        line.replace("    If false: throw to monkey ", ""),
        10
      )

      parsedMonkeys.push(currentMonkey)

      currentMonkey = { itemsThrown: 0 }
      return
    }
  })

  return parsedMonkeys
}

const getTopMonkeyItems = (monkeyList) => {
  const monkeys = parseInput(monkeyList)
  for (let i = 0; i < 20; i++) {
    monkeys.forEach((monkey) => {
      monkey.startingItems.forEach((lvl) => {
        let newLvl = Math.floor(Math.floor(monkey.op(lvl)) / 3)

        const test = newLvl % monkey.testNumber === 0
        monkeys[test ? monkey.true : monkey.false].startingItems.push(newLvl)

        monkey.startingItems = monkey.startingItems.filter((_, i) => i !== 0)
        monkey.itemsThrown++
      })
    })
  }

  const sorted = sortBy((item) => prop("itemsThrown", item))(monkeys).reverse()
  return sorted[0].itemsThrown * sorted[1].itemsThrown
}

// console.time("pt1")
// console.log("pt1", getTopMonkeyItems(input))
// console.timeEnd("pt1")

const parseBigIntInput = (monkeys) => {
  const parsedMonkeys = []
  let currentMonkey = { itemsThrown: 0 }
  monkeys.forEach((line) => {
    if (!line) {
      return
    }

    if (line.startsWith("Monkey ")) {
      currentMonkey.id = parseInt(line.split(" ")[1].replace(":", ""), 10)
      return
    }

    if (line.startsWith("  Starting items: ")) {
      currentMonkey.startingItems = line
        .replace("Starting items: ", "")
        .split(",")
        .map((num) => parseInt(num))
      return
    }
    if (line.startsWith("  Operation: ")) {
      const [first, middle, last] = line
        .replace("  Operation: new = ", "")
        .split(" ")
      const firstIsWorryLevel = first === "old"
      const lastIsWorryLevel = last === "old"

      currentMonkey.op = (worryLevel) =>
        parseInt(
          eval(
            `${firstIsWorryLevel ? worryLevel : first}${middle}${
              lastIsWorryLevel ? worryLevel : last
            }`
          )
        )
      return
    }
    if (line.startsWith("  Test: divisible by ")) {
      currentMonkey.testNumber = parseInt(
        line.replace("  Test: divisible by ", "")
      )
      return
    }
    if (line.startsWith("    If true: throw to monkey ")) {
      currentMonkey.true = parseInt(
        line.replace("    If true: throw to monkey ", "")
      )
      return
    }
    if (line.startsWith("    If false: throw to monkey ")) {
      currentMonkey.false = parseInt(
        line.replace("    If false: throw to monkey ", "")
      )

      parsedMonkeys.push(currentMonkey)

      currentMonkey = { itemsThrown: 0 }
      return
    }
  })

  return parsedMonkeys
}

const getTopMonkeyBusiness = (monkeyList) => {
  const monkeys = parseBigIntInput(monkeyList)

  const divisor = monkeys.reduce((acc, cur) => acc * cur.testNumber, 1)
  console.log(divisor)

  for (let i = 0; i < 10000; i++) {
    monkeys.forEach((monkey) => {
      monkey.startingItems.forEach((lvl) => {
        const mod = lvl
        let newLvl = monkey.op(mod) % divisor

        const test = newLvl % monkey.testNumber === 0
        monkeys[test ? monkey.true : monkey.false].startingItems.push(newLvl)

        monkey.startingItems = monkey.startingItems.filter((_, i) => i !== 0)
        monkey.itemsThrown++
      })
    })
  }

  const sorted = sortBy((item) => prop("itemsThrown", item))(monkeys).reverse()
  console.log(monkeys)
  return sorted[0].itemsThrown * sorted[1].itemsThrown
}

console.time("pt2")
console.log("pt2", getTopMonkeyBusiness(input))
console.timeEnd("pt2")
