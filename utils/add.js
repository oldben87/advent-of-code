/**
 *
 * @param {Array<number>} numbers
 * @returns {number}
 */
const add = (numbers) => {
  return numbers.reduce((total, current) => total + current, 0)
}

export default add
