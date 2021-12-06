const fs = require("fs");
const path = require("path");

// parse data to array
const text = fs.readFileSync(path.resolve(__dirname, "./data.txt"), "utf8");
const data = text.split("\n").map((cmd) => {
  const [instruction, value] = cmd.split(" ");

  return { instruction, value: parseInt(value, 10) };
});

const calculateFinalPosition = (commands) => {
  let horizontal = 0;
  let depth = 0;

  for (let command of commands) {
    if (command.instruction === "forward") {
      horizontal += command.value;
    }
    if (command.instruction === "down") {
      depth += command.value;
    }
    if (command.instruction === "up") {
      depth -= command.value;
    }
  }
  return horizontal * depth;
};

const calculatePositionUsingAim = (commands) => {
  let aim = 0;
  let depth = 0;
  let horizontal = 0;

  for (let command of commands) {
    const { instruction, value } = command;
    if (instruction === "forward") {
      horizontal += value;
      depth += aim * value;
    }
    if (instruction === "down") {
      aim += value;
    }
    if (instruction === "up") {
      aim -= value;
    }
  }
  return horizontal * depth;
};

console.time("pt1");
console.log("pt1", calculateFinalPosition(data));
console.timeEnd("pt1");

console.time("pt2");
console.log("pt2", calculatePositionUsingAim(data));
console.timeEnd("pt2");
