const { curry } = require('ramda')

export const checkLength = curry((string, size) => string.length === size)
