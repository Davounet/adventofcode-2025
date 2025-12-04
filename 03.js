const { Client } = require('aocjs')
const tools = require('./tools')
const client = new Client({ session: tools.session })

async function main() {
  const input = await client.getInput(2025, 3)
  const banks = input
    .split('\n')
    .map(line => line.split('').map(Number))
    .filter(line => line.length > 0)

  step1(banks)
  step2(banks)
}
main()

function step1(banks) {
  const joltages = banks.map(getJoltage1)
  console.log('step1: ', tools.sum(joltages))
}

function step2(banks) {
  const joltages = banks.map(getJoltage2)
  console.log('step2: ', tools.sum(joltages))
}

function getJoltage1(bank) {
  const target1 = bank.slice(0, bank.length - 1)
  const max1 = Math.max(...target1)

  const target2 = bank.slice(bank.indexOf(max1) + 1)
  const max2 = Math.max(...target2)

  return max1 * 10 + max2
}

function getJoltage2(bank) {
  const maxes = getMax(bank, 12)
  return Number(maxes.join(''))
}
function getMax(source, level, list = []) {
  const target = source.slice(0, source.length - level + 1)
  const max = Math.max(...target)

  const next = source.slice(source.indexOf(max) + 1)
  if (level === 1) return list.concat(max)
  return getMax(next, level - 1, list.concat(max))
}
