const fs = require('fs')
const path = require('path')

// parse data
const text = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf8')
const data = text.split('\n').map((item) => {
  const cmdVal = item.split(' ')
  return { cmd: cmdVal[0], val: cmdVal[1] }
})
// return acc when re-hit same data
function stopInfinate(acc = 0, i = 0, arr = []) {
  if (arr.find((check) => check === i)) {
    return acc
  }
  if (data[i].cmd === 'nop') {
    arr.push(i)
    return stopInfinate(acc, i + 1, arr)
  }
  if (data[i].cmd === 'acc') {
    arr.push(i)
    return stopInfinate(acc + parseInt(data[i].val), i + 1, arr)
  }
  if (data[i].cmd === 'jmp') {
    arr.push(i)
    return stopInfinate(acc, i + parseInt(data[i].val), arr)
  }
}

console.log('pt1', stopInfinate())
