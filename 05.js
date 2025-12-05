const { Client } = require('aocjs')
const tools = require('./tools')
const client = new Client({ session: tools.session })

async function main() {
  const input = await client.getInput(2025, 5)
  const [first, second] = input.split('\n\n')
  const ranges = first.split('\n').map(line => {
    const [min, max] = line.split('-').map(Number)
    return { min, max }
  })
  const numbers = second.split('\n').map(Number)

  step1(ranges, numbers)
  step2(ranges)
}
main()

function step1(ranges, numbers) {
  let count = 0
  numbers.forEach(num => {
    const inRange = ranges.some(({ min, max }) => num >= min && num <= max)
    if (inRange) count++
  })
  console.log('step1: ', count)
}

function step2(ranges) {
  const aggregated = []
  ranges.sort((a, b) => a.min - b.min)
  ranges.forEach(range => {
    const last = aggregated.at(-1)

    if (!last) aggregated.push({ ...range }) // Pas encore de range agrégé
    else if (range.min <= last.max) last.max = Math.max(last.max, range.max) // Fusionner les ranges qui se chevauchent
    else aggregated.push({ ...range }) // Nouveau range distinct
  })

  const sum = aggregated.reduce((acc, { min, max }) => acc + (max - min + 1), 0)
  console.log('step2: ', sum)
}
