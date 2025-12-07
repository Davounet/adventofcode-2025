const { Client } = require('aocjs')
const tools = require('./tools')
const client = new Client({ session: tools.session })

async function main() {
  const input = await client.getInput(2025, 6)

  step1(input)
  step2(input)
}
main()

function step1(input) {
  const raw = input
    .trim()
    .split('\n')
    .map(line => {
      return line
        .trim()
        .split(' ')
        .map(item => (item.trim() === '' ? false : isNaN(Number(item)) ? item : Number(item)))
        .filter(item => item !== false)
    })
  const numbers = raw.slice(0, raw.length - 1)
  const operations = raw[raw.length - 1]

  const results = operations.map((op, colIndex) => {
    const column = numbers.map(row => row[colIndex])

    if (op === '+') {
      return tools.sum(column)
    } else if (op === '*') {
      return tools.multiply(column)
    } else {
      return null
    }
  })
  console.log('step1: ', tools.sum(results))
}

function step2(input) {
  const lines = input.trim().split('\n')
  const operations = lines
    .pop()
    .trim()
    .split(' ')
    .filter(c => c.trim() !== '')
  const nbCols = lines[0].length
  const nbProblems = operations.length
  const problems = Array.from({ length: nbProblems }, () => [])

  let currentProblem = nbProblems - 1
  for (let col = nbCols - 1; col >= 0; col--) {
    const number = lines
      .map(line => line[col])
      .join('')
      .trim()

    if (number === '') currentProblem--
    else problems[currentProblem].unshift(Number(number))
  }

  const results = operations.map((op, i) => {
    const numbers = problems[i]

    if (op === '+') {
      return tools.sum(numbers)
    } else if (op === '*') {
      return tools.multiply(numbers)
    } else {
      return null
    }
  })

  console.log('step2: ', tools.sum(results))
}
