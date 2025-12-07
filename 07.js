const { Client } = require('aocjs')
const tools = require('./tools')
const client = new Client({ session: tools.session })

async function main() {
  const input = await client.getInput(2025, 7)
  const lines = input
    .trim()
    .split('\n')
    .map(line => line.trim().split(''))

  handler(lines)
}
main()

function handler(lines) {
  const nbCols = lines[0].length

  let split = 0
  let last = Array.from({ length: nbCols }, () => 0)
  lines.forEach((line, r) => {
    const newRow = Array.from({ length: nbCols }, () => 0)
    last.forEach((cell, c) => {
      if (line[c] === 'S') {
        newRow[c] = 1
      } else if (line[c] === '^' && last[c] > 0) {
        split++
        newRow[c - 1] += last[c]
        newRow[c + 1] += last[c]
      } else if (last[c] > 0) {
        newRow[c] += last[c]
      }
    })
    last = newRow
  })

  console.log('step1: ', split)
  console.log('step2: ', tools.sum(last))
}
