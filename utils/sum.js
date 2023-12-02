/**
 *
 * @param {Array<number>} numbers
 * @returns {number}
 */
const sum = (numbers) => {
  return numbers.reduce((current, total) => total * current, 1)
}

export default sum
