const fs = require("fs")
const path = require("path")

// parse data to array
console.time("pt1")
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

const pt1 = text.split("\n").reduce((score, moves) => {
  const [opponent, myMove] = moves.split(" ")
  return score + moveScoreMaps[opponent][myMove] + choiceScore[myMove]
}, 0)
console.log("pt1", pt1)
console.timeEnd("pt1")

const choiceScorePT2 = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
}

const moveScoreMapsPT2 = {
  A: { ROCK: 3, PAPER: 6, SCISSORS: 0 },
  B: { ROCK: 0, PAPER: 3, SCISSORS: 6 },
  C: { ROCK: 6, PAPER: 0, SCISSORS: 3 },
}

const winDrawLoseMap = {
  X: 0,
  Y: 3,
  Z: 6,
}

const pt2 = text.split("\n").reduce((score, moves) => {
  const [opponent, myAction] = moves.split(" ")
  const winDrawLose = winDrawLoseMap[myAction]

  const [myChoice, roundScore] = Object.entries(
    moveScoreMapsPT2[opponent]
  ).find(([_, score]) => score === winDrawLose)

  return score + roundScore + choiceScorePT2[myChoice]
}, 0)

console.time("pt2")
console.log("pt2", pt2)
console.timeEnd("pt2")
