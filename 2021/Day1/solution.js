const fs = require("fs");
const path = require("path");

// parse data to array
const text = fs.readFileSync(path.resolve(__dirname, "./data.txt"), "utf8");
const data = text.split("\n").map((num) => parseInt(num));

const getDepthIncreaseCount = (array) => {
  return array.reduce((acc, item, index, array) => {
    return item > array[index - 1] ? acc + 1 : acc;
  }, 0);
};

console.time("pt1");
console.log("pt1", getDepthIncreaseCount(data));
console.timeEnd("pt1");

const mergeEveryThreeDepths = (numArr) => {
  const merged = numArr.map((num, ind, arr) => {
    if (arr[ind + 1] != null && arr[ind + 2] != null) {
      return num + arr[ind + 1] + arr[ind + 2];
    } else return null;
  });

  const filteredMerge = merged.filter((number) => number != null);

  return filteredMerge;
};

console.time("pt2");
console.log("pt2", getDepthIncreaseCount(mergeEveryThreeDepths(data)));
console.timeEnd("pt2");
