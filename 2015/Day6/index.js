const fs = require("fs")
const path = require("path")
const R = require("ramda")

const text = fs.readFileSync(path.resolve(__dirname, "./data.txt"), "utf8")
const instructions = text.split("\n")

const returnCoords = (string) => {
  const fromCoords = string.split(",")
  return { x: parseInt(fromCoords[0]), y: parseInt(fromCoords[1]) }
}

const cmds = instructions.map((inst) => {
  const breakUp = inst.split(" ")
  if (breakUp[0] === "turn") {
    breakUp.shift()
  }
  const cmd = breakUp[0]

  const from = returnCoords(breakUp[1])
  const to = returnCoords(breakUp[3])

  return { cmd, from, to }
})

const switchBulb = (command, current) => {
  if (command === "on") {
    return true
  }

  if (command === "off") {
    return false
  }

  return current === true ? false : true
}

const getTotalLightsOn = (commands) => {
  const lightHash = {}
  for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 1000; j++) {
      lightHash[`${i},${j}`] = false
    }
  }

  commands.forEach(({ cmd, to, from }) => {
    for (let i = from.x; i <= to.x; i++) {
      for (let j = from.y; j <= to.y; j++) {
        const coords = `${i},${j}`
        lightHash[coords] = switchBulb(cmd, lightHash[coords])
      }
    }
  })

  return Object.values(lightHash).reduce((lightsOn, light) => {
    return light ? lightsOn + 1 : lightsOn
  }, 0)
}

console.time("pt1")
console.log("pt1", getTotalLightsOn(cmds))
console.timeEnd("pt1")

const turnDimmmer = (command, current) => {
  if (command === "on") {
    return current + 1
  }
  if (command === "off") {
    return current - 1 < 0 ? 0 : current - 1
  }
  return current + 2
}

const totalBrightnessValue = (commands) => {
  const lightHash = {}
  for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 1000; j++) {
      lightHash[`${i},${j}`] = 0
    }
  }

  commands.forEach(({ cmd, to, from }) => {
    for (let i = from.x; i <= to.x; i++) {
      for (let j = from.y; j <= to.y; j++) {
        const coords = `${i},${j}`
        lightHash[coords] = turnDimmmer(cmd, lightHash[coords])
      }
    }
  })

  return Object.values(lightHash).reduce(R.add)
}

console.time("pt2")
console.log("pt2", totalBrightnessValue(cmds))
console.timeEnd("pt2")
