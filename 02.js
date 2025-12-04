const { Client } = require('aocjs')
const tools = require('./tools')
const client = new Client({ session: tools.session })

async function main() {
  const input = await client.getInput(2025, 2)
  const ranges = input.split(',').map(line => {
    const [start, end] = line.split('-').map(Number)
    return [start, end]
  })

  step1(ranges)
  step2(ranges)
}
main()

function step1(ranges) {
  const invalids = []
  ranges.forEach(([start, end]) => {
    for (let i = start; i <= end; i++) {
      if (isInvalid1(i)) invalids.push(i)
    }
  })
  console.log('step1: ', tools.sum(invalids))
}

function step2(ranges) {
  const invalids = []
  let count = 0
  ranges.forEach(([start, end]) => {
    for (let i = start; i <= end; i++) {
      count++
      if (isInvalid2(i)) invalids.push(i)
    }
  })
  console.log('step2: ', tools.sum(invalids))
}

function isInvalid1(id) {
  const string = id.toString()
  if (string.length % 2 !== 0) return false
  if (string.slice(0, Math.floor(string.length / 2)) === string.slice(Math.floor(string.length / 2))) return true
  return false
}

function isInvalid2(id) {
  const string = id.toString()
  const factors = tools.factors(string.length)

  return factors.some(factor => {
    if (factor === string.length) return false

    const segment = string.slice(0, factor)
    if (Array.from({ length: string.length / factor }).every((_, i) => string.slice(i * factor, (i + 1) * factor) === segment)) return true
    return false
  })
}
