const { Client } = require('aocjs')
const tools = require('./tools')
const client = new Client({ session: tools.session })

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
  const rects = tiles.map((t1, i) => tiles.slice(i + 1).map(t2 => corners(t1, t2))).flat()
  const areas = rects.map(([t1, t2]) => area(t1, t2))
  console.log('step1: ', Math.max(...areas))
}

function step2(tiles) {
  const rects = tiles
    .map((t1, i) => tiles.slice(i + 1).map(t2 => corners(t1, t2)))
    .flat()
    .sort((a, b) => area(...b) - area(...a)) // sort by area to only look for the first one
  const sides = tiles.map((t1, i) => corners(t1, tiles[(i + 1) % tiles.length])).sort((a, b) => area(...b) - area(...a)) // sort by area to check for biggest side first
  const target = rects.find(a => !sides.find(b => intersects(a, b)))
  console.log('step2: ', area(...target))
}

function corners(t1, t2) {
  return [
    [Math.min(t1[0], t2[0]), Math.min(t1[1], t2[1])],
    [Math.max(t1[0], t2[0]), Math.max(t1[1], t2[1])]
  ]
}

function area(t1, t2) {
  return (t2[0] - t1[0] + 1) * (t2[1] - t1[1] + 1)
}

function intersects(a, b) {
  return b[0][0] < a[1][0] && b[0][1] < a[1][1] && b[1][0] > a[0][0] && b[1][1] > a[0][1]
}
