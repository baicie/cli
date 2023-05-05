import type { Answers, PromptObject } from 'prompts'
import consola from 'consola'
import prompts from 'prompts'

const step: PromptObject[] = [
  {
    type: 'text',
    name: 'demo',
    message: 'What is your name?',
  },
]

async function main() {
  consola.info('Hello main!')
  let result: Answers<'demo'>
  try {
    result = await prompts(step)
  }
  catch (error) {

  }

  const { demo } = result
  consola.success(`Hello ${demo}!`)
}

main().catch((e) => {
  console.error(e)
})
