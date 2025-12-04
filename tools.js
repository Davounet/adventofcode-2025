const session = '53616c7465645f5fb818aa8c21aef356518417eb7f53a2e4559623e26b7344939172843bf20a87ae2e8f8c59e56aca811be6a7362992e0f3f877741b0a0b9fce'

function sum(arr) {
  return arr.reduce((a, b) => a + b, 0)
}

function factors(number) {
  return Array.from(Array(number + 1), (_, i) => i).filter(i => number % i === 0)
}

module.exports = { session, sum, factors }
