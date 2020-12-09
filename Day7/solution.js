const fs = require('fs')
const path = require('path')
const { splitAt, hasPath, keys } = require('ramda')

// parse data to array
const text = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf8')
const data = text.split('\n')
let bagsObject = []
data.forEach((bag) => {
  const bags = bag.split(' bags contain ')
  const topBag = bags[0]
  const children = bags[1].replace(/\ bag[s]?\./, '').split(/\ bag[s]?[\,]? /g)
  let innerBags = {}
  children.forEach((item) => {
    if (item === 'no other') {
      innerBags === null
    } else {
      const arr = splitAt(1)(item)
      const key = arr[1].replace(/\ /, '')
      innerBags = { ...innerBags, [key]: arr[0] }
    }
  })
  bagsObject.push({
    name: topBag,
    children: { ...innerBags },
  })
})

// create recusrisve pt1 function, returns array of valid parents
function checkParent(string, hasGold = [], i = 0) {
  if (hasPath([string])(bagsObject[i].children)) {
    hasGold.push(bagsObject[i].name)
    hasGold.push(...checkParent(bagsObject[i].name))
  }

  i === bagsObject.length - 1 ? hasGold : checkParent(string, hasGold, i + 1)
}

//remove duplicate parents
const pt1 = new Set(checkParent('shiny gold')).size

// day7 pt 2, returns total number of child bags
function countChildren(string, bagTotal = 0, i = 0) {
  if (bagsObject[i].name === string) {
    keys(bagsObject[i].children).forEach((item) => {
      bagTotal += parseInt(bagsObject[i].children[item])
      bagTotal += parseInt(bagsObject[i].children[item]) * countChildren(item)
    })
  }

  return i === bagsObject.length - 1
    ? bagTotal
    : countChildren(string, bagTotal, i + 1)
}

console.log('pt1', pt1)
console.log('pt2', countChildren('shiny gold'))
