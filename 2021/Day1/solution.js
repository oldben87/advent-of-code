const fs = require("fs");
const path = require("path");

// parse data to array
const text = fs.readFileSync(path.resolve(__dirname, "./data.txt"), "utf8");
const data = text.split("\n").map((num) => parseInt(num));

const getDepthIncreaseCount = (input) => {
  console.log(input);
  return input.reduce((acc, item, index, array) => {
    return item > array[index - 1] ? acc + 1 : acc;
  }, 0);
};

console.time("pt1");
console.log("pt1", getDepthIncreaseCount(data));
console.timeEnd("pt1");
