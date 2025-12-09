const { Client } = require('aocjs')
const tools = require('./tools')
const client = new Client({ session: tools.session })

const sample = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`

async function main() {
  const input = await client.getInput(2025, 9)

  const tiles = input
    .trim()
    .split('\n')
    .map(line => line.split(',').map(Number))

  step1(tiles)
  step2(tiles)
}
main()

function step1(tiles) {
  let max = 0
  tiles.forEach(tile1 => {
    tiles.forEach(tile2 => {
      if (tile1 === tile2) return

      const area = Math.abs(tile1[0] - tile2[0] + 1) * Math.abs(tile1[1] - tile2[1] + 1)
      if (area > max) max = area
    })
  })
  console.log('step1: ', max)
}

function step2(tiles) {
  let max = 0
  tiles.forEach(tile1 => {
    tiles.forEach(tile2 => {
      if (tile1 === tile2) return
      if (hasCollisions(tile1, tile2, tiles)) return

      const area = Math.abs(tile1[0] - tile2[0] + 1) * Math.abs(tile1[1] - tile2[1] + 1)
      if (area > max) max = area
    })
  })
  console.log('step1: ', max)
}

function hasCollisions(tile1, tile2, tiles) {
  const tl = [Math.min(tile1[0], tile2[0]), Math.min(tile1[1], tile2[1])]
  const bl = [Math.max(tile1[0], tile2[0]), Math.min(tile1[1], tile2[1])]
  const br = [Math.max(tile1[0], tile2[0]), Math.max(tile1[1], tile2[1])]
  const tr = [Math.min(tile1[0], tile2[0]), Math.max(tile1[1], tile2[1])]

  
}

function intersects([as, ae], [bs, be]) {
  const av = as[1] !== ae[1] ? 1 : 0
  const bv = bs[1] !== be[1] ? 1 : 0
  if (av === 1 && bv === 1) return false // both vertical
  if (av === 0 && bv === 0) return false // both horizontal

  const v = av === 1 ? [as, ae] : [bs, be]
  const h = av === 0 ? [as, ae] : [bs, be]

  return min(h[0][1], h[1][1]) <= v[0][1] && max(h[0][1], h[1][1]) >= v[0][1] && min(v[0][0], v[1][0]) <= h[0][0] && max(v[0][1], v[1][1]) >= h[0][0]
}
