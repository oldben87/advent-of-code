const fs = require("fs")
const path = require("path")

// parse data to array
console.time("pt1")
// console.time("pt2")
const text = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")

/* 
Rock = A & X
Paper = B & Y
Scissors = C & Z

*/
const moveScoreMaps = {
  A: { X: 3, Y: 6, Z: 0 },
  B: { X: 0, Y: 3, Z: 6 },
  C: { X: 6, Y: 0, Z: 3 },
}
const choiceScore = {
  X: 1,
  Y: 2,
  Z: 3,
}

const data = text.split("\n").reduce((score, moves) => {
  const [opponent, myMove] = moves.split(" ")
  return score + moveScoreMaps[opponent][myMove] + choiceScore[myMove]
}, 0)
console.log("pt1", data)
console.timeEnd("pt1")
