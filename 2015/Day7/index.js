const fs = require("fs")
const path = require("path")
const R = require("ramda")

const text = fs.readFileSync(path.resolve(__dirname, "./data.txt"), "utf8")
const commands = text.split("\n").map((ins) => ins.split(" "))

const wireHash = {}

const not = (number) => 65535 - number
const and = (num1, num2) => num1 & num2
const or = (num1, num2) => num1 | num2
const lShift = (num1, num2) => num1 << num2
const rShift = (num1, num2) => num1 >> num2

const findWireAValue = (cmds) => {
  let commandsReduced = cmds

  while (true) {
    commandsReduced = commandsReduced.reduce((acc, cmd) => {
      if (!isNaN(parseInt(cmd[0])) && cmd.length === 3) {
        const current = wireHash[cmd[2]] || 0
        const newValue = parseInt(cmd[0]) + current
        wireHash[cmd[2]] = newValue

        return acc
      }

      if (cmd[0] === "NOT") {
        const input = wireHash[cmd[1]]
        if (input === undefined) {
          return [...acc, cmd]
        }

        const newPosition = `${cmd[3]}`

        const current = wireHash[newPosition] || 0

        const newValue = current + not(input)

        wireHash[newPosition] = newValue

        return acc
      }

      if (cmd[1] === "AND") {
        const input1 = isNaN(parseInt(cmd[0], 10)) ? wireHash[cmd[0]] : cmd[0]
        const input2 = wireHash[cmd[2]]

        if (input1 === undefined || input2 === undefined) {
          return [...acc, cmd]
        }

        const newPosition = `${cmd[4]}`
        const current = wireHash[newPosition] || 0

        wireHash[newPosition] = current + and(input1, input2)

        return acc
      }

      if (cmd[1] === "OR") {
        const input1 = wireHash[cmd[0]]
        const input2 = wireHash[cmd[2]]

        if (input1 === undefined || input2 === undefined) {
          return [...acc, cmd]
        }

        const newPosition = `${cmd[4]}`
        const current = wireHash[newPosition] || 0
        wireHash[newPosition] = current + or(input1, input2)

        return acc
      }

      if (cmd[1] === "LSHIFT") {
        const input1 = wireHash[cmd[0]]
        const input2 = cmd[2]

        if (input1 === undefined) {
          return [...acc, cmd]
        }

        const newPosition = `${cmd[4]}`
        const current = wireHash[newPosition] || 0
        wireHash[newPosition] = current + lShift(input1, input2)
        return acc
      }

      if (cmd[1] === "RSHIFT") {
        const input1 = wireHash[cmd[0]]
        const input2 = cmd[2]

        if (input1 === undefined) {
          return [...acc, cmd]
        }

        const newPosition = `${cmd[4]}`
        const current = wireHash[newPosition] || 0
        wireHash[newPosition] = current + rShift(input1, input2)
        return acc
      }

      if (cmd.length === 3) {
        const input = wireHash[cmd[0]]
        if (input === undefined) {
          return [...acc, cmd]
        }

        const current = wireHash[cmd[2]] || 0
        const newValue = input + current
        wireHash[cmd[2]] = newValue
        return acc
      }
    }, [])

    if (commandsReduced.length === 0) {
      break
    }
  }
  return wireHash.a
}

console.time("pt1")
console.log("pt1", findWireAValue(commands))
console.timeEnd("pt1")

// console.time("pt2")
// console.log("pt2", totalBrightnessValue(cmds))
// console.timeEnd("pt2")
