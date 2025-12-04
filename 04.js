const { Client } = require('aocjs')
const tools = require('./tools')
const client = new Client({ session: tools.session })

const adjacents = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
]

async function main() {
  const input = await client.getInput(2025, 4)
  const map = input.split('\n').map(line => line.split(''))

  step1(map)
  step2(map)
}
main()

function step1(map) {
  const accessible = []
  map.forEach((line, y) => {
    line.forEach((cell, x) => {
      if (cell === '@' && isAccessible(x, y, map)) accessible.push([x, y])
    })
  })
  console.log('step1: ', accessible.length)
}

function step2(map) {
  console.log('step2: ', handler(map, 0))
}

function isAccessible(x, y, map) {
  return adjacents.filter(([ay, ax]) => map?.[y + ay]?.[x + ax] === '@').length < 4
}
function handler(map, count) {
  const toRemove = []
  map.forEach((line, y) => {
    line.forEach((cell, x) => {
      if (cell === '@' && isAccessible(x, y, map)) toRemove.push([x, y])
    })
  })

  if (toRemove.length === 0) return count
  toRemove.forEach(([x, y]) => (map[y][x] = '.'))
  return handler(map, count + toRemove.length)
}
