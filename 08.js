const { Client } = require('aocjs')
const tools = require('./tools')
const client = new Client({ session: tools.session })

async function main() {
  const input = await client.getInput(2025, 8)
  const boxes = input
    .trim()
    .split('\n')
    .map(line => line.split(',').map(Number))

  const { distances, links } = compute(boxes)
  step1(boxes, distances, links)
  step2(boxes, distances, links)
}
main()

function compute(boxes) {
  const links = Array.from({ length: boxes.length }, () => Array.from({ length: boxes.length }, () => 0))
  const distances = []
  boxes.forEach((box1, i) => {
    boxes.forEach((box2, j) => {
      if (i === j) return
      if (links[j][i] !== 0) return (links[i][j] = links[j][i])
      links[i][j] = distance(box1, box2)
      distances.push({ d: links[i][j], i, j })
    })
  })
  distances.sort((a, b) => a.d - b.d)
  return { distances, links }
}

function step1(boxes, distances) {
  const circuits = Array.from({ length: boxes.length }, (_, i) => [i])
  const connections = distances.slice(0, 1000)
  connections.forEach(({ i, j }) => merge(circuits, i, j))

  const lengths = circuits.map(c => c.length).sort((a, b) => b - a)
  const result = lengths[0] * lengths[1] * lengths[2]
  console.log('step1: ', result)
}

function step2(boxes, distances) {
  let i = 0,
    j = 0
  const circuits = Array.from({ length: boxes.length }, (_, i) => [i])
  while (circuits.length > 1) {
    const next = distances.shift()
    i = next.i
    j = next.j
    merge(circuits, i, j)
  }
  console.log('step2: ', boxes[i][0] * boxes[j][0])
}

function distance(box1, box2) {
  return Math.sqrt(Math.pow(box1[0] - box2[0], 2) + Math.pow(box1[1] - box2[1], 2) + Math.pow(box1[2] - box2[2], 2))
}
function merge(circuits, i, j) {
  const ci = circuits.find(c => c.includes(i))
  const cj = circuits.find(c => c.includes(j))
  if (ci === cj) return false

  ci.push(...cj)
  circuits.splice(circuits.indexOf(cj), 1)
  return true
}
