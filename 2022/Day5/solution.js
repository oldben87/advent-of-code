const fs = require("fs")
const path = require("path")
const { splitEvery, remove, splitAt } = require("ramda")

// parse data to array
const text = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .split("\n\n")

const parseStacks = (stackString) => {
  const stackRows = stackString.split("\n").map((row) => splitEvery(4, row))
  const parsedStackRows = stackRows.map((row) =>
    row.map((cell) => {
      if (!cell.includes("[") && cell.trim()) {
        return parseInt(cell.trim(), 10)
      }
      return cell.replace("[", "").replace("]", "").trim()
    })
  )

  const removedAnnotation = remove(
    parsedStackRows.length - 1,
    parsedStackRows.length - 1,
    parsedStackRows
  )

  const columns = []
  removedAnnotation.forEach((row) => {
    row.forEach((row, index) => {
      if (!row) return
      columns[index] = columns[index] ? [row, ...columns[index]] : [row]
    })
  })

  return columns
}

const parseMoves = (cmds) => {
  return cmds.split("\n").reduce((parsedCmds, current) => {
    const [_, numToMove, __, fromCol, ___, toCol] = current
      .split(" ")
      .map((num) => parseInt(num, 10))
    return [...parsedCmds, { numToMove, fromCol, toCol }]
  }, [])
}

const getTopItems = (columns) => {
  return columns.reduce((lastItems, current) => {
    return lastItems + current.pop()
  }, "")
}

const getPart1 = (input) => {
  const [stacks, commands] = input

  const result = parseStacks(stacks)
  const moves = parseMoves(commands)

  moves.forEach(({ numToMove, fromCol, toCol }) => {
    for (let i = 0; i < numToMove; i++) {
      const removed = result[fromCol - 1].pop()
      result[toCol - 1].push(removed)
    }
  })
  return getTopItems(result)
}

const getPart2 = (input) => {
  const [stacks, commands] = input

  const result = parseStacks(stacks)
  const moves = parseMoves(commands)

  moves.forEach(({ numToMove, fromCol, toCol }) => {
    const colLength = result[fromCol - 1].length

    const removed = result[fromCol - 1].splice(colLength - numToMove, colLength)
    result[toCol - 1] = [...result[toCol - 1], ...removed]
  })
  return getTopItems(result)
}

console.time("pt1")
console.log("pt1", getPart1(text))

console.timeEnd("pt1")

console.time("pt2")
console.log("pt2", getPart2(text))
console.timeEnd("pt2")
