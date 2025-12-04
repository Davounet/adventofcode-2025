const { Client } = require('aocjs')
const tools = require('./tools')
const client = new Client({ session: tools.session })

async function main() {
  const input = await client.getInput(2025, 1)
  const moves = input.split('\n').map(line => {
    const direction = line[0] === 'L' ? -1 : 1
    const steps = Number(line.slice(1))
    return direction * steps
  })
  step1(moves)
  step2(moves)
}
main()

function step1(moves) {
  let position = 50
  let zeros = 0
  for (const move of moves) {
    position = (position + move + 100) % 100
    if (position === 0) zeros++
  }
  console.log('step1: ', zeros)
}
function step2(moves) {
  let last = 50
  let current = 50
  let final = 50
  let zeros = 0

  for (const move of moves) {
    last = current
    current = current + move
    final = (last + move + 100) % 100

    if (Math.sign(last) !== Math.sign(current) && last !== 0) zeros++
    zeros += Math.floor(Math.abs(current) / 100)

    current = final
  }
  console.log('step2: ', zeros)
}
