const fs = require("fs")
const path = require("path")

// parse data to array
const text = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .split("\n")

const createFileStructure = (input) => {
  const directoryMap = { files: [] }
  let currentDirectory = []
  input.forEach((cmd) => {
    const [left, middle, right] = cmd.split(" ")
    const isHome = currentDirectory.length === 0

    if (left === "$" && middle === "cd" && right === "/") {
      currentDirectory = []
      return
    } else if (left === "$" && middle === "cd" && right !== "..") {
      currentDirectory.push(right)
      const exists = directoryMap[currentDirectory.join("-")]
      if (!exists) {
        directoryMap[currentDirectory.join("-")] = {
          files: [],
          subDirs: [],
          name: currentDirectory.join("-"),
        }
      }

      return
    } else if (left === "$" && middle === "cd" && right === "..") {
      currentDirectory.pop()
      return
    }

    if (left === "dir") {
      if (isHome) return
      const alreadyHasDir = directoryMap[
        currentDirectory.join("-")
      ].subDirs.includes(currentDirectory.join("-") + "-" + middle)
      if (alreadyHasDir) {
        return
      }
      directoryMap[currentDirectory.join("-")].subDirs.push(
        currentDirectory.join("-") + "-" + middle
      )
    }

    const fileSize = parseInt(left, 10)
    if (!isNaN(fileSize)) {
      const file = {
        size: fileSize,
        name: currentDirectory.join("-") + "-" + middle,
      }

      if (isHome) {
        directoryMap.files.push(file)
        return
      }
      const alreadyHasFile = directoryMap[
        currentDirectory.join("-")
      ].files.some(
        (file) => file.name === currentDirectory.join("-") + "-" + middle
      )

      if (alreadyHasFile) {
        return
      }

      directoryMap[currentDirectory.join("-")].files = [
        ...directoryMap[currentDirectory.join("-")].files,
        file,
      ]
      return
    }
  })

  return directoryMap
}

const getFolderSize = (dirName, map, memo) => {
  const directory = map[dirName]

  let size = directory.files.reduce((total, current) => current.size + total, 0)

  if (memo[dirName] !== undefined) {
    return memo[dirName]
  }

  if (directory.subDirs.length) {
    size += directory.subDirs.reduce(
      (total, current) => total + getFolderSize(current, map, memo),
      0
    )
  }

  memo[dirName] = size

  return size
}

const getTotalSizeOfSmallestFolders = (input) => {
  const directoryMemo = {}
  const directoryMap = createFileStructure(input)

  const filesToParse = Object.keys(directoryMap)
  const directoryList = filesToParse.filter((obj) => obj !== "files")

  directoryList.forEach((name) =>
    getFolderSize(name, directoryMap, directoryMemo)
  )

  return Object.values(directoryMemo).reduce((total, current) => {
    if (current > 100000) {
      return total
    }
    return total + current
  }, 0)
}

console.time("pt1")
console.log("pt1", getTotalSizeOfSmallestFolders(text))
console.timeEnd("pt1")

const findWhichFolderToDelete = (input) => {
  const directoryMemo = {}
  const directoryMap = createFileStructure(input)

  const filesToParse = Object.keys(directoryMap)
  const directoryList = filesToParse.filter((obj) => obj !== "files")

  directoryList.forEach((name) =>
    getFolderSize(name, directoryMap, directoryMemo)
  )

  // find free space of home drive
  //
  // max space is 70,000,000
  // need at least 30,000,000

  const outerFolders = directoryList.filter((dir) => !dir.includes("-"))
  const sum = outerFolders.reduce(
    (total, current) => total + directoryMemo[current],
    0
  )
  const homeFileSpace = directoryMap.files.reduce(
    (total, current) => total + current.size,
    0
  )
  const usedSpace = sum + homeFileSpace

  const freeSpace = 70000000 - usedSpace

  const spaceNeeded = 30000000 - freeSpace

  const directoriesBigEnough = directoryList.reduce((largeEnough, current) => {
    if (directoryMemo[current] >= spaceNeeded) {
      return [...largeEnough, directoryMemo[current]]
    } else return largeEnough
  }, [])

  return directoriesBigEnough.sort((a, b) => a - b)[0]
}

console.time("pt2")
console.log("pt2", findWhichFolderToDelete(text))
console.timeEnd("pt2")
