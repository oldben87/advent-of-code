const fs = require('fs')
const path = require('path')

// parse data
const text = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf8')
const data = text.split('\n').map((item) => {
  const cmdVal = item.split(' ')
  return { cmd: cmdVal[0], val: parseInt(cmdVal[1]) }
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
    return stopInfinate(acc + data[i].val, i + 1, arr)
  }
  if (data[i].cmd === 'jmp') {
    arr.push(i)
    return stopInfinate(acc, i + data[i].val, arr)
  }
}

console.log('pt1', stopInfinate())

// pt 2 change item in array

function fixGameboy(acc = 0, i = 0, switched = false) {
  if (i === data.length) {
    return acc
  }
  if (data[i].cmd === 'nop' && switched) {
    return fixGameboy(acc, i + 1, switched)
  } else if (data[i].cmd === 'nop' && !switched) {
    try {
      return fixGameboy(acc, i + data[i].val, true)
    } catch {
      return fixGameboy(acc, i + 1, false)
    }
  }
  if (data[i].cmd === 'jmp' && switched) {
    return fixGameboy(acc, i + data[i].val, switched)
  } else if (data[i].cmd === 'jmp' && !switched) {
    try {
      return fixGameboy(acc, i + 1, true)
    } catch {
      return fixGameboy(acc, i + data[i].val, false)
    }
  }
  if (data[i].cmd === 'acc') {
    return fixGameboy(acc + data[i].val, i + 1, switched)
  }
}

console.log('pt2', fixGameboy())
